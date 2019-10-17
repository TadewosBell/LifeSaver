import React, {useState, useEffect} from 'react';
import MissionEditable from './MissionEditable';
import CallPreview from '../Call/CallPreview';
import { makeStyles, Button, List, ListItem, ListItemText, ListSubheader, Grid, Typography } from '@material-ui/core';
import { getMissions } from '../Client/LifeSaverClient';

const useStyles = makeStyles({
    column: {
        maxHeight: '100vh',
        maxWidth: '100vw'
    },
    list: {
      maxHeight: '100%',
      overflow: 'auto',
    },
    callPreview: {
        width: '100%'
    }
});


export default function MissionView(props) {
    const classes = useStyles();

    const [missions, setMissions] = useState([]);
    const [unassignedCalls, setUnassignedCalls] = useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    useEffect(() => {
        async function loadData() {
            const missionsPromise = getMissions();
            setMissions(await missionsPromise);
        }
        const calls = [
            {id: -1, name: 'Flooding', priority:'High'}, 
            {id: -2, name: 'Power Outage', priority:'Medium'}, 
            {id: -3, name: 'Bridge Collapse', priority:'High'}
        ];
        loadData();
        setUnassignedCalls([...Array(100).keys()].map(x => ({ id: x, name: `Power line down ${x}`, priority: `HIGH` })));
    }, []);

    function addCall(callId) {
        missions[selectedIndex].calls.push(unassignedCalls.find(x => x.id === callId));
        setMissions(missions);
        setUnassignedCalls(unassignedCalls.filter(x => x.id !== callId));
    }

    function addButton(callId) {
        return <Button size="small" variant="contained" color="primary" onClick={() => addCall(callId)}>ADD</Button>;
    }

    return (
        <Grid container spacing={3} justify="space-evenly" alignItems="stretch">
            <Grid item xs className={classes.column} maxHeight={1}>
                <List className={classes.list} subheader={<ListSubheader>Missions</ListSubheader>}>
                    {missions.map((x, i) =>
                    <ListItem button selected={selectedIndex === i} onClick={() => setSelectedIndex(i)}>
                        <ListItemText primary={x.title} secondary={x.active ? "ACTIVE" : "INACTIVE"} />
                    </ListItem>)}
                </List>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5" component="h2" align="center">Mission Editor</Typography>
                {missions.length > 0 && <MissionEditable data={missions[selectedIndex]} />}
            </Grid>
            <Grid item xs className={classes.column}>
                <Typography variant="h5" component="h2" align="center">Unassigned Calls</Typography>
                <List className={classes.list}> 
                {unassignedCalls.map(x =>
                    <ListItem>
                        <CallPreview className={classes.callPreview} data={x} additionalActions={addButton(x.id)} />
                    </ListItem>)}
                </List>
            </Grid>
        </Grid>
    );
}
