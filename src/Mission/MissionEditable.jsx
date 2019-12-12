import React from 'react';
import { useDispatch } from 'react-redux'
import { Card, CardHeader, Grid, CardContent, Button } from '@material-ui/core';
import CallPreview from '../Call/CallPreview'
import UserPreview from '../User/UserPreview'

import { removeCallFromMission  } from '../redux/modules/server';
import { sortUsersByRole } from '../common/UserHelpers';

import { sortCallsByPriority } from "../common/CallHelpers";
import {removeUserFromMission} from "../redux/modules/server";

export default function MissionEditable({ data }) {
    const dispatch = useDispatch();

    function removeButton(callId) {
        return <Button size="small" variant="outlined" style={{backgroundColor: '#ffffff'}} onClick={() => dispatch(removeCallFromMission(data._id.$oid, callId))}>REMOVE</Button>;
    }

    function removeUserButton(userId) {
        return <Button size="small" variant="outlined" style={{backgroundColor: '#ffffff'}} onClick={() => dispatch(removeUserFromMission(data._id.$oid, userId))}>REMOVE</Button>;
    }

    function toCallItem(call) {
        return (
            <Grid item xs>
                <CallPreview data={call} additionalActions={removeButton(call._id)}/>
            </Grid>
        );
    }

    function toUserItem(user) {
        return (
            <Grid item xs>
                <UserPreview data={user} additionalActions={removeUserButton(user._id)}/>
            </Grid>
        );
    }

    return (
        <Card>
            <CardHeader title={data.title}/>
            <CardContent style={{maxHeight: '600px', overflow: 'auto'}}>
                <Grid container spacing={1}>{data.calls && sortCallsByPriority([...data.calls]).map(toCallItem)}
                {data.users && sortUsersByRole([...data.users]).map(toUserItem)}
                </Grid>
            </CardContent>
        </Card>
    );
}