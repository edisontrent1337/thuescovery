import React, {Component} from 'react';
import './GeoTag.css';

class GeoTag extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {orientation, position, poi} = this.props;
        const scale = 15;
        return <div className="tag" style={{
            top: position.y,
            left: position.x,
            transform: `translate3d(${orientation.beta * scale}px, ${orientation.alpha * scale}px,0)`
        }}>
            <div><span className={'mdi mdi-' + this.determineIcon(poi)}>{poi.name}</span></div>

            {poi.photo && <img src={poi.photo}/>}
        </div>;
    }


    determineIcon = (poi) => {
        console.log(poi.additionaleType);
        const iconTypes = {
            'Museum': 'bank',
            'Sakral': 'church',
            'Restaurant': 'food-fork-drink',
            'Theater': 'drama-masks',
            'Botanischer Garten': 'flower-outline',
            'St&auml;ndiges Orchester': 'music-note',
            'Kulturhaus': 'school'
        };

        return iconTypes[poi.additionaleType];

    }
}

export default GeoTag;
