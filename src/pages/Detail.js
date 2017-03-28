import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: chance.first(),
      country:  chance.country({ full: true })
    }
  }

  render() {
    return (
      <div>
        <p>Hello, { this.state.name }.</p>
        <p>You are from { this.state.country }</p> 
      </div>
    )
  }
}

export default Detail;