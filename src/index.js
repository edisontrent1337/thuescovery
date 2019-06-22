import React from "react";
import ReactDOM from "react-dom";
import {compose, withProps} from "recompose";
import Camera from 'react-html5-camera-photo';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

import Orientation from "./components/Orientation/Orientation";

function onTakePhoto(){

}

let API_KEY = "AIzaSyADE1MIp5__mY7JZddAZfHyyGCURkVdAFY";
const MyMapComponent = compose(
    withProps({
        /**
         * Note: create and replace your own key in the Google console.
         * https://console.developers.google.com/apis/dashboard
         * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
         */
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <div>
        <GoogleMap defaultZoom={8} defaultCenter={{lat: -34.397, lng: 150.644}}>
            <Marker position={{lat: -34.397, lng: 150.644}}/>
            <Marker position={{lat: -34.392, lng: 150.644}}/>
        </GoogleMap>
        <Orientation/>
        <Camera
            idealFacingMode={'environment'}
            isImageMirror={false}
            onTakePhoto={(dataUri) => {
                this.onTakePhoto(dataUri);
            }}
        />
    </div>
));




ReactDOM.render(<MyMapComponent isMarkerShown/>, document.getElementById("root"));
