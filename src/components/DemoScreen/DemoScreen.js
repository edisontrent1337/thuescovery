import React, {Component} from 'react';
import {compose, withProps} from "recompose";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import Orientation from "../Orientation/Orientation";
import Camera from "react-html5-camera-photo";

const API_KEY = "AIzaSyADE1MIp5__mY7JZddAZfHyyGCURkVdAFY";

const POLLING_RATE = 60;


class DemoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            z: 0,
            orientation: {
                alpha: 0,
                beta: 0,
                gamma: 0,
            },
        }
    }

    componentDidMount() {
        this.handleOrientation();
        window.addEventListener('devicemotion', this.handleAcceleration);
        window.addEventListener('orientationchange', this.handleOrientation);
        this.updateInterval = setInterval(this.updateOrientation, 16)

    }

    componentWillUnmount() {
        window.removeEventListener('devicemotion', this.handleAcceleration);
        window.removeEventListener('orientationchange', this.handleOrientation);
        clearInterval(this.updateInterval);
    }

    handleOrientation = (event) => {
        const {orientation} = window;
        this.setState({landscape: orientation === 90 || orientation === -90})
    };

    handleAcceleration = (event) => {
        const {landscape} = this.state;
        const {useGravity} = this.props;
        const acceleration = useGravity ? event.accelerationIncludingGravity : event.acceleration;
        const rotation = event.rotationRate || null;
        let {x, y, z} = acceleration;

        x = (landscape ? y : x);
        y = (landscape ? x : y);
        z = z * 1;

        const position = {
            x, y, z
        };

        this.setState({
            rotation,
            position
        })
    };


    updateOrientation = () => {

        const rotation = this.state.rotation;
        if (!rotation) {
            return;
        }

        let {alpha, beta, gamma} = this.state.orientation;

        const FRAME_RATE = 62.5;
        alpha += rotation.alpha / FRAME_RATE;
        beta += rotation.beta / FRAME_RATE;
        gamma += rotation.gamma / FRAME_RATE;

        const orientation = {
            alpha, beta, gamma
        };
        this.setState({
            orientation
        });
    };

    render() {
        const {position, rotation, orientation} = this.state;
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
                <div>

                    {position && <div style={{transform: `translate3d(${position.x}px, ${position.y}px, 0)`}}>
                        Hello there
                    </div>}

                    {orientation && <div>{JSON.stringify(orientation)}</div>}

                    {position &&
                    <div style={{
                        height: '20px',
                        width: 8 * position.x + 'px',
                        backgroundColor: 'red'
                    }}>{position.x}</div>}
                    {position && <div
                        style={{
                            height: '20px',
                            width: 8 * position.y + 'px',
                            backgroundColor: 'blue'
                        }}>{position.y}</div>}
                    {position && <div style={{
                        height: '20px',
                        width: 8 * position.z + 'px',
                        backgroundColor: 'green'
                    }}>{position.z}</div>}
                    {rotation && <div
                        style={{
                            height: '20px',
                            width: rotation.alpha + 'px',
                            backgroundColor: 'pink'
                        }}>rotation
                        alpha: {rotation && rotation.alpha}</div>}
                    {rotation && <div style={{
                        height: '20px',
                        width: rotation.beta + 'px',
                        backgroundColor: 'yellow'
                    }}>rotation beta: {rotation && rotation.beta}</div>}
                    {rotation && <div
                        style={{
                            height: '20px',
                            width: rotation.gamma + 'px',
                            backgroundColor: 'cyan'
                        }}>rotation
                        gamma: {rotation && rotation.gamma}</div>}
                </div>
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
        mapElement: <div style={{height: `100%`}}/>,
        useGravity: true
    }),
    withScriptjs,
    withGoogleMap)(DemoScreen);
