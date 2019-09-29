import React, { Component } from '../../node_modules/react';

class MapWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    getGoogleMapsUrl(address) {
        return `https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    }

    render() { 
        return (
            <div>
                <iframe width="600" height="500" id="gmap_canvas" src={this.getGoogleMapsUrl(this.props.address)} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"/>
            </div>);
    }
}
 
export default MapWidget;