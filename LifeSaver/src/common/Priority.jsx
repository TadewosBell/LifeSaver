import React, { Component } from 'react';

class Urgency extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        
    }

    getBackgroundColor(level) {
        switch (level) {
            case "High":
                return { backgroundColor: "red" };
            case "Medium":
                return { backgroundColor: "yellow" };
            case "Low":
                return { backgroundColor: "lightblue" };
            default:
                return {};
        }
    }

    render() { 
        let style = this.getBackgroundColor(this.props.level);
        style.maxWidth = "500px"
        return (
        <dir>
            <body style={style}>
            <h2>{this.props.level} Priority</h2>
            </body>
        </dir>);
    }
}
 
export default Urgency;