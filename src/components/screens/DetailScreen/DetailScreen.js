import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

class DetailScreen extends Component {
  render() {
    let poi = this.props.location.state.poi;
    return <div>
      <h1>{poi.name}</h1>
      <Row>
        <Col>
          {poi.photo && <img src={poi.photo} width="100%"></img>}
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ margin: 16 }}>
            <Button onClick={() => this.navigateTo(poi)} size="lg" block>Als Ziel festlegen</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {poi.description}
        </Col>
      </Row>
    </div>;
  }

  navigateTo = (poi) => {
    // not the best thing maybe?
    const from = this.props.location.state.origin.latitude + ',' + this.props.location.state.origin.longitude;
    const to = poi.geo.latitude + ',' + poi.geo.longitude;
    window.location.href = "https://www.google.com/maps/dir/?api=1&origin=" + from + "&destination=" + to + "&travelmode=bicycling";
  }
}

export default DetailScreen;
