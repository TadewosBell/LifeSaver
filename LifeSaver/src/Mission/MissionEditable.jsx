import React from 'react';
import { Card, CardHeader, Grid, CardContent, Button } from '@material-ui/core';
import CallPreview from '../Call/CallPreview'

export default function MissionEditable(props) {
    const { data } = props;

    function removeCall(missionId, callId) {
        // eventually put in client
    }

    function removeButton(callId) {
        return <Button size="small" variant="contained" color="secondary" onClick={() => removeCall(data.id, callId)}>REMOVE</Button>;
    }

    function toCallItem(call) {
        return (
            <Grid item>
                <CallPreview data={call} additionalActions={removeButton(call.id)}/>
            </Grid>
        );
    }

    return (
        <Card>
            <CardHeader title={data.name}/>
            <CardContent>
                <Grid container spacing={3}>{data.calls && [...data.calls].map(toCallItem)}</Grid>
            </CardContent>
        </Card>
    );
}