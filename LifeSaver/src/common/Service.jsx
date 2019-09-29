import React, { Component } from '../../node_modules/react';

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <div>
            <p><b>Service Type: </b>{this.props.type}</p>
        </div>);
    }
}
 
export default Service;