import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

class Header extends Component {
  render() {
    return <Nav activeKey="/" fill variant="tabs">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/discover">discover</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/map">map</Nav.Link>
      </Nav.Item>
    </Nav>
  }
}

export default Header;
