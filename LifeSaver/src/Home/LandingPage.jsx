import React, { Component } from '../../node_modules/react';
import { withRouter } from '../../node_modules/react-router';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            clicked: false,
         }
    }

    redirect = () => {
        this.props.history.push('/Login');
    }

    clicked = () => {
        let { clicked } = this.state;

        clicked = !clicked;
        this.setState({
            clicked,
        }, () => {
            this.redirect();
        });
        
    }

    

    render() { 
        let { clicked } = this.state;
        return ( 
            <div>
            <h1>Hello! {clicked.toString()}</h1>
            <button onClick={this.clicked} >START</button>
            </div>
         );
    }
}
 
export default withRouter(LandingPage);