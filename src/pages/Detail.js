import React from 'react';
import ajax from 'superagent';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      commits: [],
      forks: [],
      pulls: [],
      viewMode: 'commits'
    };

    this.setViewMode = this.setViewMode.bind(this);
  }

  componentWillMount() {
    // get commits
    this.fetchFeed('commits');

    // get forks
    this.fetchFeed('forks');

    // get pulls
    this.fetchFeed('pulls');
  }

  fetchFeed(type) {
    ajax.get(`https://api.github.com/repos/facebook/react/${type}`)
      .end((err, res) => {
        if(!err && res) {
          this.setState({ [type]: res.body });
        } else {
          console.error(`There was an error when fetching ${type}: `, err);
        }
      });
  }

  setViewMode(event) {
    this.setState({ viewMode: event.currentTarget.dataset.mode });
  }

  renderCommits() {
    return this.state.commits.map((commit, index) => {
      const author = commit.author ? commit.author.login : 'Anon';
      return (<p key={ index }>
        <strong>{ author }</strong>:
        <a href={ commit.html_url }>{ commit.commit.message }</a>
      </p>)
    })
  }

  renderForks() {
    return this.state.forks.map((fork, index) => {
      const owner = fork.owner ? fork.owner.login : 'Anon';
      const creationDate = new Date(fork.created_at);

      return (<p key={ index }>
        <strong>{ owner }</strong>: forked to 
        <a href={ fork.html_url }> { fork.html_url }</a> at { creationDate.toLocaleString() }.
      </p>)
    });
  }

  renderPulls() {
    return this.state.pulls.map((pull, index) => {
      const author = pull.user ? pull.user.login : 'Anonymous';

      return (<p key={ index }>
        <strong>{ author }</strong>:
        <a href={ pull.html_url }>{ pull.body }</a>
      </p>)
    });
  }

  renderProperItems(viewMode) {
    const self = this;
    const map = {
      'commits': self.renderCommits(),
      'forks': self.renderForks(),
      'pulls': self.renderPulls()
    };

    return map[viewMode];
  }

  render() {
    let content = this.renderProperItems(this.state.viewMode)

    return (<div>
      <button onClick={ this.setViewMode } data-mode="commits">
        Show commits
      </button>
      <button onClick={ this.setViewMode } data-mode="forks">
        Show forks
      </button>
      <button onClick={ this.setViewMode } data-mode="pulls">
        Show pull requests
      </button>
      <h2>{ this.state.viewMode.toUpperCase() }</h2>
      { content }
    </div>)
  }
}

export default Detail;