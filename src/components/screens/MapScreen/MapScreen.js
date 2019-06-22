import React, { Component } from 'react';
import {compose, withProps} from "recompose";

import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

import getLocation from '../../../api/GeoLocation';
import ThueCat from '../../../api/ThueCAT';

const GOOGLE_API_KEY = "AIzaSyADE1MIp5__mY7JZddAZfHyyGCURkVdAFY";
const THUE_CAT_API_KEY = "z24f1FQAcnRml4tkmXca4lcFKF.koAsc4KCNWGO75nsLAeifNNkwgLF73zrnscb3dfnZdbk3mm.SPAl2DJFIoOz2evCHwflUF4";

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 50.55462, 
        lng: 11.35008
      },
      pois: []
    }
    this.api = new ThueCat(THUE_CAT_API_KEY);
  }
  
  componentDidMount() {
    getLocation().then((position) => {
      this.setState({
        position: {
              lat: position.latitude,
              lng: position.longitude
          }
      });
      
      // search around it
      this.api.geoSearch(position.latitude, position.longitude, 10000).then((response)=>{
        let pois = response.map((poi)=>{
          console.log('POI>', poi);
          return {
            id: poi['@id'],
            position: {
              lat: poi.geo.latitude, 
              lng: poi.geo.longitude
            },
            label: poi.name
          }
        });
        this.setState({pois});
      });
    });
  }

  render() {
    let markers = this.state.pois.map((poi) => {
      return <Marker key={poi.id} position={poi.position} label={poi.label}/>
    });
    return <div>
      <GoogleMap defaultZoom={14} center={this.state.position}>
        {markers}
      </GoogleMap>
    </div>;
  }
}

export default compose(
  withProps({
      googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{height: `100%`}}/>,
      containerElement: <div style={{height: `500px`}}/>,
      mapElement: <div style={{height: `100%`}}/>,
      useGravity: true
  }),
  withScriptjs,
  withGoogleMap)(MapScreen);
