import React, { Component } from 'react';

class CallerContact extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (<div>
            <h2>Caller Contact Details:</h2>
            <p><b>Phone: </b>{this.props.phoneNumber}</p>
            </div>);
    }
}
 
export default CallerContact;