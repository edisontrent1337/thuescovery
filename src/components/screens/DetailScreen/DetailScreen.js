import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class DetailScreen extends Component {
  render() {
    let poi = this.props.location.state.poi;
    return <div>
      <h1>{poi.name}</h1>
      {poi.photo && <img src={poi.photo}></img>}
      <Button onClick={() => this.navigateTo(poi)}>Navigieren</Button>
      <div>
        {poi.description}
      </div>
    </div>;
  }
  
  navigateTo = (poi) => {
    // not the best thing maybe?
    const from = this.props.location.state.origin.latitude + ',' + this.props.location.state.origin.longitude;
    const to = poi.geo.latitude + ',' + poi.geo.longitude;
    window.location.href = "https://www.google.com/maps/dir/?api=1&origin=" + from + "&destination=" + to + "&travelmode=bicycling";
  }
}

export default DetailScreen;
