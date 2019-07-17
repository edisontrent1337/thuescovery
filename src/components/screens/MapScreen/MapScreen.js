import React, {Component} from 'react';
import {compose, withProps} from "recompose";

import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

import getLocation from '../../../api/GeoLocation';
import ThueCat from '../../../api/ThueCAT';
import {Button, InputField, Tag, ActionFeedback} from "@edisontrent1337/web-react/";

const GOOGLE_API_KEY = "AIzaSyADE1MIp5__mY7JZddAZfHyyGCURkVdAFY";
const THUE_CAT_API_KEY = "z24f1FQAcnRml4tkmXca4lcFKF.koAsc4KCNWGO75nsLAeifNNkwgLF73zrnscb3dfnZdbk3mm.SPAl2DJFIoOz2evCHwflUF4";

class MapScreen extends Component {
    constructor(props) {
        super(props);

        const persistedTrackedLocations = JSON.parse(localStorage.getItem('data'));
        console.log(persistedTrackedLocations);

        this.state = {
            location: {
                lat: 50.55462,
                lng: 11.35008
            },
            pois: [],
            lastPositions: [],
            trackedLocations: persistedTrackedLocations ? persistedTrackedLocations : [],
            currentLocationName: undefined,
            deducedLocationName: undefined
        };
        this.api = new ThueCat(THUE_CAT_API_KEY);
    }

    componentDidMount() {

        setInterval(() => {
            getLocation().then(
                (position) => {

                    const {lastPositions} = this.state;

                    if (lastPositions.length < 5) {
                        lastPositions.push(position);
                        this.setState({
                            lastPositions
                        });
                    }

                    if (lastPositions.length === 5) {
                        let summedLng = 0;
                        let summedLat = 0;

                        lastPositions.forEach(p => {
                            summedLat += p.latitude;
                            summedLng += p.longitude;
                        });

                        summedLat /= 5;
                        summedLng /= 5;
                        this.setState({
                            position: {
                                lat: summedLat,
                                lng: summedLng
                            },
                            lastPositions: []
                        });
                    }

                    if (this.state.position) {
                        this.deduceLocation();
                    }
                });
        }, 500);
    }


    render() {
        let markers = this.state.pois.map((poi) => {
            return <Marker key={poi.id} position={poi.position} label={poi.label} onClick={() => this.navigateTo(poi)}/>
        });

        const trackedPositions = this.state.trackedLocations.map((p, index) => {
            return <div style={{padding: '10px'}}>
                <Tag tag={p.name} color={'blue'}/>
                <div>{p.position.lat}</div>
                <div>{p.position.lng}</div>
            </div>
        });
        return <div>
            <div>
                {this.state.position && this.state.position.lat}
            </div>
            <div>
                {this.state.position && this.state.position.lng}
            </div>
            <GoogleMap defaultZoom={14} center={this.state.position}>
                {markers}
                <Marker position={this.state.position} label={'Here'}/>
            </GoogleMap>
            <InputField onChange={this.onChange}/>
            <Button value={'Add position'} color={'green'} onClick={this.addLocation}/>
            {trackedPositions}
            <div style={{
                position: 'fixed',
                width: '100%',
                padding: '10px',
                top: '0',
                left: 0,
                height: '40px',
                backgroundColor: 'red',
                color: 'white'
            }}>
                {this.state.deducedLocationName}
            </div>
        </div>;
    }

    navigateTo = (poi) => {
        // not the best thing maybe?
        const from = this.state.position.lat + ',' + this.state.position.lng;
        const to = poi.position.lat + ',' + poi.position.lng;
        window.location.href = "https://www.google.com/maps/dir/?api=1&origin=" + from + "&destination=" + to + "&travelmode=bicycling";
    };

    deduceLocation = () => {
        const position = this.state.position;
        const {lat, lng} = position;

        let minimumDistance = Number.MAX_VALUE;
        let minimumLocationName = '';
        this.state.trackedLocations.forEach((p) => {
            let currentDistance = this.distanceInKmBetweenEarthCoordinates(p.position.lat, p.position.lng, lat, lng);
            console.log('Distance: ' + currentDistance);
            if (currentDistance < minimumDistance && currentDistance < 0.003) {
                minimumLocationName = p.name;
                minimumDistance = currentDistance;
            }
        });
        console.log('Deduced location: ' + minimumLocationName);
        this.setState({
            deducedLocationName: minimumLocationName
        });

    };

    onChange = (e) => {
        this.setState({
            currentLocationName: e.target.value
        });
    };

    addLocation = () => {
        const {trackedLocations} = this.state;
        trackedLocations.push({name: this.state.currentLocationName, position: this.state.position})
        this.setState({
            trackedLocations
        }, () => localStorage.setItem('data', JSON.stringify(this.state.trackedLocations)));
    };

    degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
    }

    distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
        const earthRadiusKm = 6371;

        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(lon2 - lon1);

        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    }
}

export default compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`, display: 'none'}}/>,
        containerElement: <div style={{height: `500px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
        useGravity: true
    }),
    withScriptjs,
    withGoogleMap)(MapScreen);
