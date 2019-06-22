import React, {Component} from 'react';
import {compose, withProps} from "recompose";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import Camera from "react-html5-camera-photo";

import Orientation from '../../api/Orientation';
import GeoLocation from '../../api/GeoLocation';
import { Container } from 'react-bootstrap';

const API_KEY = "AIzaSyADE1MIp5__mY7JZddAZfHyyGCURkVdAFY";


class DemoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orientation: {
                alpha: 0,
                beta: 0,
                gamma: 0,
            },
            location: {lat: 50.55462, lng: 11.35008}
        }
    }

    componentDidMount() {
        Orientation.startOrientationListener();
        Orientation.setOrientationListener((orientation) => {
            this.setState({orientation: orientation});
        });
        
        GeoLocation().then((location) => {
            this.setState({
                location: {
                    lat: location.latitude,
                    lng: location.longitude
                }
            })
        });
    }

    componentWillUnmount() {
        Orientation.stopOrientationListener();
    }

    render() {
        const {orientation} = this.state;
        return (
            <Container>
                <GoogleMap defaultZoom={15} center={this.state.location}>
                </GoogleMap>
                <Camera
                    idealFacingMode={'environment'}
                    isImageMirror={false}
                    onTakePhoto={(dataUri) => {
                        this.onTakePhoto(dataUri);
                    }}
                />
                <div onClick={() => this.setState({toggle: !this.state.toggle})}>
                    {orientation &&
                    <div style={{
                        backgroundColor: 'black',
                        color: 'white',
                        transform: `translate3d(${orientation.beta}px, ${orientation.alpha}px,0)`
                    }}>
                        Hello there
                    </div>}

                    {orientation && <div>{JSON.stringify(orientation, null, '  ')}</div>}

                </div>
            </Container>);
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
        mapElement: <div style={{height: `100%`}}/>,
        useGravity: true
    }),
    withScriptjs,
    withGoogleMap)(DemoScreen);
