import React from 'react';
import Camera from "react-html5-camera-photo";
import getLocation from "../../../api/GeoLocation";
import ThueCAT from "../../../api/ThueCAT";
import GeoTag from "../../GeoTag/GeoTag";
import Orientation from "../../../api/Orientation";

class ARScreen extends React.Component {

    constructor(props, context) {
        super(props, context);
        const API_KEY = "z24f1FQAcnRml4tkmXca4lcFKF.koAsc4KCNWGO75nsLAeifNNkwgLF73zrnscb3dfnZdbk3mm.SPAl2DJFIoOz2evCHwflUF4";
        this.api = new ThueCAT(API_KEY);
        this.state = {
            pointsOfInterest: [],
            positions: [],
            orientation: {
                alpha: 0,
                beta: 0,
                gamma: 0,
            },
        };
    }

    componentDidMount() {
        Orientation.startOrientationListener();
        Orientation.setOrientationListener((orientation) => {
            this.setState({orientation: orientation});
        });

    }

    componentWillUnmount() {
        Orientation.stopOrientationListener();
    }


    async componentWillMount() {
        // fetch current location
        let position = await getLocation();

        this.setState({position});
        // search around it
        let response = await this.api.geoSearch(position.latitude, position.longitude, 10000);
        this.generateRandomPositions(response);
        this.setState({pointsOfInterest: response});
    }


    generateRandomPositions = (response) => {
        let positions = [];
        response.forEach(() => {
            positions.push({x: (-0.5 + Math.random()) * 4000, y: Math.random() * 400})
        });
        this.setState({
            positions
        }, () => console.log(response));
    };

    render() {

        const geoTags = this.state.pointsOfInterest.map((poi, key) => {
            return <GeoTag poi={poi} key={key} origin={this.state.position} position={this.state.positions[key]}
                           orientation={this.state.orientation}/>;
        });

        return (
            <div style={{marginLeft: '-15px', position: 'relative'}}>
                {geoTags}
                <Camera
                    idealFacingMode={'environment'}
                    isImageMirror={false}
                    onTakePhoto={(dataUri) => {
                        this.onTakePhoto(dataUri);
                    }}
                />
            </div>
        );
    }
}

export default ARScreen;
