import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import LandingScreen from "../LandingScreen/LandingScreen";
import {BrowserRouter} from "react-router-dom";
import ARScreen from "../ARScreen/ARScreen";
import Header from "../../Header/Header";
import MapScreen from '../MapScreen/MapScreen';
import { Container } from 'react-bootstrap';
import DetailScreen from '../DetailScreen/DetailScreen';

class ConnectedApplicationScreen extends Component {
    render() {
        return (
            <Container>
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={LandingScreen}/>
                        <Route path="/discover" exact component={ARScreen}/>
                        <Route path="/map" exact component={MapScreen}/>
                        <Route path="/detail" exact component={DetailScreen}/>
                    </Switch>
                </BrowserRouter>
            </Container>
        );
    }
}

export default ConnectedApplicationScreen;
