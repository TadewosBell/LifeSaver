import React from 'react';
import { useDispatch } from 'react-redux'
import { Card, CardHeader, Grid, CardContent, Button } from '@material-ui/core';
import CallPreview from '../Call/CallPreview'
import { removeCallFromMission  } from '../redux/modules/server';

import { sortCallsByPriority } from "../common/CallHelpers";


export default function MissionEditable({ data }) {
    const dispatch = useDispatch();

    function removeButton(callId) {
        return <Button size="small" variant="outlined" style={{backgroundColor: '#ffffff'}} onClick={() => dispatch(removeCallFromMission(data._id.$oid, callId))}>REMOVE</Button>;
    }

    function toCallItem(call) {
        return (
            <Grid item>
                <CallPreview data={call} additionalActions={removeButton(call._id)}/>
            </Grid>
        );
    }

    return (
        <Card>
            <CardHeader title={data.title}/>
            <CardContent style={{maxHeight: '600px', overflow: 'auto'}}>
                <Grid container spacing={3}>{data.calls && sortCallsByPriority([...data.calls]).map(toCallItem)}</Grid>
            </CardContent>
        </Card>
    );
}