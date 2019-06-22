import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import LandingScreen from "../LandingScreen/LandingScreen";
import {BrowserRouter} from "react-router-dom";

class ConnectedApplicationScreen extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LandingScreen}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default ConnectedApplicationScreen;
