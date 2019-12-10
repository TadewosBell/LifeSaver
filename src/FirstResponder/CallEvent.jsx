import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Card, CardContent, Typography } from '@material-ui/core'
import Priority from "../common/Priority";
import Service from "../common/Service";
import Location from "../common/Location";
import DateTime from "../common/DateTime";
import CallerContact from "../common/CallerContact";
import { getCallForFirstResponder } from '../Client/LifeSaverClient';

async function getUser(email, setState) {
    try {
        const call = getCallForFirstResponder(email);
        setState(call);
    } catch (error) {
        setState(null);
    }
}

const mapStateToProps = state => ({
    email: state.session.email
});

function CallEvent({ email }) {
    const [state, setState] = useState(null);
    
    useEffect(() => {
        getUser(email, setState);
    }, [email]);
    
    return (
    <div>
        {state ? 
           (<Typography>You have no call assigned</Typography>)
        :
            (<div>
            <Card>
                <Priority level={state.priority}/>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{state.title}<Service type={state.service}/></Typography>
                    <DateTime dateTime={state.dateTime} />
                    <Typography variant="body1">{state.description}</Typography>
                </CardContent>
            </Card>
            <Location address={state.address} details={state.locationDetails} />
            <CallerContact phoneNumber={state.phoneNumber}/></div>)
        }
    </div>
    );
}

export default connect(mapStateToProps)(CallEvent);
