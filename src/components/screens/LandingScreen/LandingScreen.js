import React, {Component} from 'react';
import {Link} from "react-router-dom";

const discovery = require('../../../assets/discovery.png');
const challenge = require('../../../assets/challenge.png');


class LandingScreen extends Component {
    render() {
        return (
            <div>
                <Link style={{textDecoration: 'none', color: 'white'}} to={{pathname: '/discover'}}>
                    <img src={discovery} width={'100%'}/>
                </Link>
                <img src={challenge} width={'100%'}/>
            </div>
        );
    }
}

export default LandingScreen;
