import React, { Component } from 'react';

import ThueCAT from '../../api/ThueCAT';
import getLocation from '../../api/GeoLocation';

class Orientation extends Component {
  constructor(props) {
    super(props);

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.deviceOrientationListener);
    } else {
      alert("Sorry, your browser doesn't support Device Orientation");
    }

    this.state = {
      orientation: null,
      apiResponse: null,
      position: 'unknown'
    };
    
    this.api = new ThueCAT("z24f1FQAcnRml4tkmXca4lcFKF.koAsc4KCNWGO75nsLAeifNNkwgLF73zrnscb3dfnZdbk3mm.SPAl2DJFIoOz2evCHwflUF4");
  }
  
  async componentWillMount() {
    // fetch current location
    let position = await getLocation();

    this.setState({position: 'Got position: ' + JSON.stringify(position.coords)});
    // search around it
    let response = await this.api.geoSearch(position.latitude, position.longitude, 10000);
    this.setState({apiResponse : response});
  }

  render() {
    return (
      <div>
        <div>
          Orientation: {JSON.stringify(this.state.orientation)}
        </div>
        <div>
          {JSON.stringify(this.state.apiResponse)};
        </div>
      </div>
    );
  }

  // test device orientation
  deviceOrientationListener = (event) => {
    this.setState({ orientation: event });
  };
}

export default Orientation;
