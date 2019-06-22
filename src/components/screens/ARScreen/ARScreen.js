import React, {Component} from 'react';
import Camera from "react-html5-camera-photo";

class ARScreen extends Component {
    render() {
        return (
            <Camera
                idealFacingMode={'environment'}
                isImageMirror={false}
                onTakePhoto={(dataUri) => {
                    this.onTakePhoto(dataUri);
                }}
            />
        );
    }
}

export default ARScreen;
