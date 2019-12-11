import React, { useState, useEffect } from 'react';
import MissionEditable from '../Mission/MissionEditable';
import CallPreview from '../Call/CallPreview';
import { useDispatch } from 'react-redux'
import { getCallsForMission } from '../redux/modules/server';
import { makeStyles, Button, List, ListItem, ListItemText, ListSubheader, Grid, Typography } from '@material-ui/core';
import UserPreview from '../User/UserPreview'

import { sortCallsByPriority } from "../common/CallHelpers";
import { sortUsersByRole } from '../common/UserHelpers';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';



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


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CallEdit(props) {
    const { unassignedCalls, missions, addCall, selectedIndex } = props;

    function addButton(callId) {
        return <Button size="small" variant="outlined" style={{ backgroundColor: '#ffffff' }} onClick={() => addCall(missions[selectedIndex]._id.$oid, callId)}>ADD</Button>;
    }

    const classes = useStyles();
    return (
        <Grid item xs className={classes.column}>
            <Typography variant="h5" component="h2" align="center">Unassigned Calls</Typography>
            <List className={classes.list}>
                {unassignedCalls && sortCallsByPriority(unassignedCalls).map(x =>
                    <ListItem>
                        <CallPreview className={classes.callPreview} data={x} additionalActions={addButton(x._id)} />
                    </ListItem>)}
            </List>
        </Grid>)
}

function UserEdit(props) {
    const { unassignedUsers,  missions, addUser, selectedIndex  } = props;

    function addUserButton(userEmail) {
        return <Button size="small" variant="contained" color="primary" onClick={() => addUser(missions[selectedIndex]._id.$oid, userEmail)}>ADD</Button>;
    }
    const classes = useStyles();
    return (
        <Grid item xs className={classes.column}>
            <Typography variant="h5" component="h2" align="center">Unassigned Users</Typography>
            <List className={classes.list}>
                {unassignedUsers && unassignedUsers.map(x =>
                    <ListItem>
                        <UserPreview className={classes.callPreview} data={x} additionalActions={addUserButton(x._email)} />
                    </ListItem>)}
            </List>
        </Grid>
    )
}

function TabbedEdit(props) {
    const { missions, unassignedCalls, unassignedUsers, addCall, addUser, selectedIndex } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Calls" {...a11yProps(0)} />
                    <Tab label="Users" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <CallEdit missions={missions} unassignedCalls={unassignedCalls} addCall={addCall} selectedIndex={selectedIndex}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserEdit missions={missions} unassignedUsers={unassignedUsers} addCall={addUser} selectedIndex={selectedIndex}/>
            </TabPanel>
        </div>
    );
}

export default function MissionViewTemplate({ missions, unassignedCalls, unassignedUsers, addCall, addUser }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (missions && missions.length > 0 && missions[selectedIndex] && missions[selectedIndex]._id && missions[selectedIndex]._id.$oid)
            dispatch(getCallsForMission(missions[selectedIndex]._id.$oid));
    });





    return (
        <Grid container spacing={3} justify="space-evenly" alignItems="stretch">
            <Grid item xs={3} className={classes.column} maxHeight={1}>
                <List className={classes.list} subheader={<ListSubheader>Missions</ListSubheader>}>
                    {missions && missions.map((x, i) =>
                        <ListItem button selected={selectedIndex === i} onClick={() => setSelectedIndex(i)}>
                            <ListItemText primary={x.title} />
                        </ListItem>)}
                </List>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5" component="h2" align="center">Mission Editor</Typography>
                {missions && missions.length > 0 && <MissionEditable data={missions[selectedIndex]} />}
            </Grid>
            <Grid item xs={3} className={classes.column}>
                <TabbedEdit missions={missions} unassignedCalls={unassignedCalls} unassignedUsers={unassignedUsers} addCall={addCall} addUser={addUser} selectedIndex={selectedIndex}/>
            </Grid>           
        </Grid>
    );
}
