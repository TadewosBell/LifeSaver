import React, { Component } from '../../node_modules/react';
import CallEvent from '../common/CallEvent';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <h1>Current Call</h1>
                <CallEvent />
            </div>
         );
    }
}
 
export default DashBoard;