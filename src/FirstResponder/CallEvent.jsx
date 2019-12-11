import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Card, CardContent, Typography } from '@material-ui/core'
import Priority from "../common/Priority";
import Service from "../common/Service";
import Location from "../common/Location";
import DateTime from "../common/DateTime";
import CallerContact from "../common/CallerContact";
import { getCallForFirstResponder } from '../Client/LifeSaverClient';
import { GlobalTimer } from '../App'
import { toPriorityName } from '../common/CallHelpers'

async function getCall(email, setState) {
    try {
        const call = await getCallForFirstResponder(email);
        setState(call);
    } catch (error) {
        setState(null);
    }
}

const mapStateToProps = state => ({
    email: state.session.token.user._id
});

function CallEvent({ email }) {
    const [state, setState] = useState(undefined);
    
    useEffect(() => {
        getCall(email, setState);

        const updater = GlobalTimer.subscribe(() => {
            getCall(email, setState);
        });

        return updater.unsubscribe;
    }, [email]);
    
    return (
    <div>
        {state ? (<div>
            <Card>
                <Priority level={toPriorityName(state.priority)}/>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{state.title}<Service type={state.category}/></Typography>
                    <Typography>{new Date(state.timeReceived.$date).toLocaleString()}</Typography>
                    <Typography variant="body1">{state.description}</Typography>
                </CardContent>
            </Card>
            <Location address={state.location.address} coordinates={state.location.coordinates} details={state.location.details} />
            <CallerContact name={state.callerName} phoneNumber={state.callerPhoneNumber}/></div>)
        : state === null ?
            (<Typography variant='h3'><br/>Could not find a call assigned to you.<br/><br/>Please contact your supervisor if you are expecting one.</Typography>)
        :  (<Typography variant='h3'><br/>Loading . . .</Typography>)
        }
    </div>
    );
}

export default connect(mapStateToProps)(CallEvent);
