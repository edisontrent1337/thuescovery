import React, { Component } from 'react';

class Orientation extends Component {
  constructor(props) {
    super(props);

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.deviceOrientationListener);
    } else {
      alert("Sorry, your browser doesn't support Device Orientation");
    }
    
    this.state = {
      orientation: null
    };
  }
  
  render() {
    return <div>Orientation: {JSON.stringify(this.state.orientation)}</div>;
  }
  
      // test device orientation
  deviceOrientationListener = (event) => {
    this.setState({orientation: event});
  };
}

export default Orientation;
