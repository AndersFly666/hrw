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

    this.renderCommits = this.renderCommits.bind(this);
    this.renderForks = this.renderForks.bind(this);
    this.renderPulls = this.renderPulls.bind(this);
    this.setViewModeCommits = this.setViewModeCommits.bind(this);
    this.setViewModeForks = this.setViewModeForks.bind(this);
    this.setViewModePulls = this.setViewModePulls.bind(this);
    this.renderProperItems = this.renderProperItems.bind(this);
  }

  componentWillMount() {
    // get commits
    ajax.get('https://api.github.com/repos/facebook/react/commits')
      .end((err, res) => {
        if(!err && res) {
          this.setState({ commits: res.body });
          console.dir(this.state.commits);
        } else {
          console.error('There was an error when fetching commits: ', err);
        }
      });

    // get forks
    ajax.get('https://api.github.com/repos/facebook/react/forks')
      .end((err, res) => {
        if(!err && res) {
          this.setState({ forks: res.body });
        } else {
          console.error('There was an error when fetching forks: ', err);
        }
      });

    // get pull requests
    ajax.get('https://api.github.com/repos/facebook/react/pulls')
      .end((err, res) => {
        if(!err && res) {
          this.setState({ pulls: res.body });
        } else {
          console.error('There was an error when fething pull requests: ', err);
        }
      });
  }

  renderCommits() {
    return (<div>
      { this.state.commits.map((commit, index) => {
        const author = commit.author ? commit.author.login : 'Anonymous';
        const url = commit.html_url ? commit.html_url : '#';
        const message = commit.commit.message ? commit.commit.message : 'No message';

        return (<p key={ index }>
          <strong>{ author }</strong>:
          <a href={ url }>{ message }</a>
        </p>)
      }) }
    </div>)
  }

  renderForks() {
    return (<div>
      { this.state.forks.map((fork, index) => {
        const forkName = fork.full_name ? fork.full_name : 'Unknown'; 
        const url = fork.html_url ? fork.html_url : '#';
        const description = fork.description ? fork.description : 'No description';

        return (<p key={ index }>
          <strong>{ forkName }</strong>:
          <a href={ url }>{ description }</a>
        </p>)
      }) }
    </div>)
  }

  renderPulls() {
    return (<div>
      { this.state.pulls.map((pull, index) => {
        const author = pull.user ? pull.user.login : 'Anonymous';
        const url = pull.html_url ? pull.html_url : '#';
        const title = pull.title ? pull.title : 'No title';

        return (<p key={ index }>
          <strong>{ author }</strong>:
          <a href={ url }>{ title }</a>
        </p>)
      }) }
    </div>)
  }

  setViewModeCommits() {
    this.setState({ viewMode: 'commits' });
  }
  
  setViewModeForks() {
    this.setState({ viewMode: 'forks' });
  }

  setViewModePulls() {
    this.setState({ viewMode: 'pulls' });
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
    let viewMode = this.state.viewMode;

    return (<div>
    <button onClick={ this.setViewModeCommits }>
      Show commits
    </button>
    <button onClick={ this.setViewModeForks }>
      Show forks
    </button>
    <button onClick={ this.setViewModePulls }>
      Show pull requests
    </button>
    { this.renderProperItems(viewMode) }
    </div>)
  }
}

export default Detail;