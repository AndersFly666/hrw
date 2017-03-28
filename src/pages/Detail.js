import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    const people = this._generatePeoples(10);

    this.state = { people };
    
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const newState = {
      name: chance.first(),
      country: chance.country({ full: true })
    };

    this.setState(newState);
  }


_generatePeoples(num) {
  const peoples = [];

  for (let i = 0; i < num; i++) {
    let people = {
      name: chance.first(),
      country: chance.country({ full: true })
    };

    peoples.push(people);
  }

  return peoples;
}

  render() {
    return (<div>
    { this.state.people.map((person, index) => (
      <p key={ index }>Hello, { person.name } from { person.country }!</p> 
    )) }
    </div>);
  }
}

export default Detail;