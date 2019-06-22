import React, {Component} from 'react';
import Camera from "react-html5-camera-photo";

class ARView extends Component {
    render() {
        return <div>
            <Camera
                idealFacingMode={'environment'}
                isImageMirror={false}
                onTakePhoto={(dataUri) => {
                    this.onTakePhoto(dataUri);
                }}
            /></div>;
    }
}

export default ARView;
