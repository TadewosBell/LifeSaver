import React, { Component } from 'react';

class DateTime extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (<div><p><b>Call Time: </b>{this.props.dateTime}</p></div>);
    }
}
 
export default DateTime;