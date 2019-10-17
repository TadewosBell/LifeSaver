import React, { Component } from 'react';
import { getJson, getUserName } from '../Client/LifeSaverClient';
import MissionView from '../Mission/MissionView'

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

        //getUserName('TadewosBell',onSuccess, onFailure);
    }

    render() { 
        const { userName } = this.state;
        return ( 
            <div>
                <MissionView/>
            </div>
         );
    }
}
 
export default DashBoard;