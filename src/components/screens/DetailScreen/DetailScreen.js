import React, { Component } from 'react';

class DetailScreen extends Component {
  render() {
    let poi = this.props.location.state.poi;
    return <div>
      <h1>{poi.name}</h1>
      {poi.photo && <img src={poi.photo}></img>}
      <div>
        {poi.description}
      </div>
    </div>;
  }
}

export default DetailScreen;
