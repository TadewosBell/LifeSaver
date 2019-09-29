import React, { Component } from '../../node_modules/react';
import { getJson, getUserName } from '../Client/LifeSaverClient';
import CallEvent from '../common/CallEvent';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName: "",
         }
    }

    componentDidMount() {
        const onSuccess = (res) => {
            console.log(res);
            const userName = res['userName'];
            this.setState({
                userName,
            })
        }

        const onFailure = (res) => {

        }

        getUserName('TadewosBell',onSuccess, onFailure);
    }

    render() { 
        const { userName } = this.state;
        return ( 
            <div>
                <h1>Hello: {userName}</h1>
                <h1>Current Call</h1>
                <CallEvent />
            </div>
         );
    }
}
 
export default DashBoard;