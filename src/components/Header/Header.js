import React, {Component} from 'react';
import {Navbar} from "react-bootstrap";

const logo = require('../../assets/logo.png');

class Header extends Component {
    render() {
        return (
            <Navbar activeKey="/" fill variant="tabs" style={{zIndex: 100000, backgroundColor: 'white', marginLeft: '-15px', marginRight: '-15px'}}>
                <Navbar.Brand href="/"><img src={logo}/> </Navbar.Brand>
            </Navbar>);
    }
}

export default Header;
