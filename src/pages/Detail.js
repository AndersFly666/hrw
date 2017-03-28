import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: chance.first(),
      country:  chance.country({ full: true })
    }
    
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    let newName = chance.first();
    let newCountry = chance.country({ full: true });

    this.setState({ name: newName });
    this.setState({ country: newCountry})

    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <p>Hello, { this.state.name }.</p>
        <p>You are from { this.state.country }</p>
        <button onClick={ this.handleButtonClick }>
          Meet someone new
        </button>
      </div>
    )
  }
}

export default Detail;