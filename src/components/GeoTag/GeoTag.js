import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './GeoTag.css';

class GeoTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: Math.floor(Math.random() * 400)
        }
    }

    render() {
        const {orientation, position, poi} = this.props;
        const scale = 15;
        return <div className="tag" style={{
            top: position.y,
            left: position.x,
            zIndex: 10000,
            transform: `translate3d(${orientation.beta * scale}px, ${orientation.alpha * scale}px,0)`,
            backgroundColor: this.determineIcon(poi).color
        }}>
            <Link style={{textDecoration: 'none', color: 'white'}} to={{pathname: '/detail', state: {poi}}}>
                <div style={{display: 'table', width: '100%'}}>
                    <div className={'mdi mdi-' + this.determineIcon(poi).icon} style={{display: 'table-cell', width: '80%'}}> {poi.name}
                    </div>
                    <div style={{display: 'table-cell', width: '20%', textAlign: 'right'}}>
                        <span style={{display: 'inline-block'}} className={'mdi mdi-coin'}> {this.state.value}</span>
                    </div>
                </div>
                {poi.photo && <img src={poi.photo}/>}
            </Link>
        </div>;
    }


    determineIcon = (poi) => {
        const iconTypes = {
            'Museum': {icon: 'bank', color: '#EF5350'},
            'Sakral': {icon: 'church', color: '#7E57C2'},
            'Restaurant': {icon: 'food-fork-drink', color: '#42A5F5'},
            'Theater': {icon: 'drama-masks', color: '#9CCC65'},
            'Botanischer Garten': {icon: 'flower-outline', color: '#FF7043'},
            'St&auml;ndiges Orchester': {icon: 'music-note', color: '#66BB6A'},
            'Kulturhaus': {icon: 'school', color: '#'}
        };

        return iconTypes[poi.additionaleType];

    }
}

export default GeoTag;
