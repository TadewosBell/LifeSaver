import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'
import Priority from "../common/Priority";
import Service from "../common/Service";
import Location from "../common/Location";
import DateTime from "../common/DateTime";
import CallerContact from "../common/CallerContact";
import { getCalls } from '../Client/LifeSaverClient';

async function getUser(setState) {
    const calls = await getCalls();
    setState(calls[0]);
}

export default function CallEvent(props) {
    const [state, setState] = useState({});
    
    useEffect(() => {
        getUser(setState);
    }, []);
    
    return (
    <div>
        <Card>
            <Priority level={state.priority}/>
            <CardContent>
                <Typography variant="h4" gutterBottom>{state.title}<Service type={state.service}/></Typography>
                <DateTime dateTime={state.dateTime} />
                <Typography variant="body1">{state.description}</Typography>
            </CardContent>
        </Card>
        <Location address={state.address} details={state.locationDetails} />
        <CallerContact phoneNumber={state.phoneNumber}/>
    </div>
    );
}
