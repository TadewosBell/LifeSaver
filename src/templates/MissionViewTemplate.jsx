import React, { useState, useEffect } from 'react';
import MissionEditable from '../Mission/MissionEditable';
import CallPreview from '../Call/CallPreview';
import { useDispatch } from 'react-redux'
import { getCallsForMission  } from '../redux/modules/server';
import { makeStyles, Button, List, ListItem, ListItemText, ListSubheader, Grid, Typography } from '@material-ui/core';
import UserPreview from '../User/UserPreview'

import { sortCallsByPriority } from "../common/CallHelpers";
import { sortUsersByRole } from '../common/UserHelpers';


const useStyles = makeStyles({
    column: {
        maxHeight: '100vh',
        maxWidth: '100vw'
    },
    list: {
      maxHeight: '600px', //100%
      overflow: 'auto',
    },
    callPreview: {
        width: '100%'
    }
});


export default function MissionViewTemplate({ missions, unassignedCalls, unassignedUsers, addCall, addUser }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (missions && missions.length > 0 && missions[selectedIndex] && missions[selectedIndex]._id && missions[selectedIndex]._id.$oid)
            dispatch(getCallsForMission(missions[selectedIndex]._id.$oid));
    });

    function addUserButton(userEmail) {
        return <Button size="small" variant="contained" color="primary" onClick={() => addUser(missions[selectedIndex]._id.$oid, userEmail)}>ADD</Button>;
    }

    function addButton(callId) {
        return <Button size="small" variant="outlined" style={{backgroundColor: '#ffffff'}} onClick={() => addCall(missions[selectedIndex]._id.$oid, callId)}>ADD</Button>;
    }

    return (
        <Grid container spacing={3} justify="space-evenly" alignItems="stretch">
            <Grid item xs className={classes.column} maxHeight={1}>
                <List className={classes.list} subheader={<ListSubheader>Missions</ListSubheader>}>
                    {missions && missions.map((x, i) =>
                    <ListItem button selected={selectedIndex === i} onClick={() => setSelectedIndex(i)}>
                        <ListItemText primary={x.title} />
                    </ListItem>)}
                </List>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="h5" component="h2" align="center">Mission Editor</Typography>
                {missions && missions.length > 0 && <MissionEditable data={missions[selectedIndex]} />}
            </Grid>
            <Grid item xs className={classes.column}>
                <Typography variant="h5" component="h2" align="center">Unassigned Calls</Typography>
                <List className={classes.list}> 
                {unassignedCalls && sortCallsByPriority(unassignedCalls).map(x =>
                    <ListItem>
                        <CallPreview className={classes.callPreview} data={x} additionalActions={addButton(x._id)} />
                    </ListItem>)}
                </List>
            </Grid>
            <Grid item xs className={classes.column}>
                <Typography variant="h5" component="h2" align="center">Unassigned Users</Typography>
                <List className={classes.list}> 
                {unassignedUsers && unassignedUsers.map(x =>
                    <ListItem>
                        <UserPreview className={classes.callPreview} data={x} additionalActions={addUserButton(x._email)} />
                    </ListItem>)}
                </List>
            </Grid>
        </Grid>
    );
}
