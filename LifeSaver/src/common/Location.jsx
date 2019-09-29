import React, { Component } from '../../node_modules/react';
import MapWidget from './MapWidget';

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <dir>
        <h2>Location:</h2>
        <p>{this.props.address}</p>
        <p>{this.props.details}</p>
        <MapWidget address={this.props.address}/>
        </dir>);
    }
}
 
export default Location;