import React, {Component} from 'react';
import {compose, withProps} from "recompose";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import Orientation from "../Orientation/Orientation";
import Camera from "react-html5-camera-photo";
import ReactAccelerometer from "react-accelerometer";

const API_KEY = "AIzaSyADE1MIp5__mY7JZddAZfHyyGCURkVdAFY";

class DemoScreen extends Component {
    render() {
        return (
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
                <ReactAccelerometer>
                    {(position, rotation) => (
                        <div>
                            {position &&
                            <div style={{height: '20px', width: 8 * position.x + 'px', backgroundColor: 'red'}}>x</div>}
                            {position && <div
                                style={{height: '20px', width: 8 * position.y + 'px', backgroundColor: 'blue'}}>y</div>}
                            {position && <div style={{
                                height: '20px',
                                width: 8 * position.z + 'px',
                                backgroundColor: 'green'
                            }}>z</div>}
                            {rotation && <div
                                style={{height: '20px', width: rotation.alpha + 'px', backgroundColor: 'pink'}}>rotation
                                alpha: {rotation && rotation.alpha}</div>}
                            {rotation && <div style={{
                                height: '20px',
                                width: rotation.beta + 'px',
                                backgroundColor: 'yellow'
                            }}>rotation beta: {rotation && rotation.beta}</div>}
                            {rotation && <div
                                style={{height: '20px', width: rotation.gamma + 'px', backgroundColor: 'cyan'}}>rotation
                                gamma: {rotation && rotation.gamma}</div>}
                        </div>


                    )}
                </ReactAccelerometer>
            </div>);
    }
}

export default compose(
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
    withGoogleMap)(DemoScreen);
