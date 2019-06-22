import React, {Component} from 'react';
import {Navbar} from "react-bootstrap";

const logo = require('../../assets/logo.png');

class Header extends Component {
    render() {
        return (
            <Navbar activeKey="/" fill variant="tabs">
                <Navbar.Brand href="/"><img src={logo}/> </Navbar.Brand>
            </Navbar>);
    }
}

export default Header;
