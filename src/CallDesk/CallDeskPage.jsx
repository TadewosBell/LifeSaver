import React from 'react';
import CallForm from './CallForm';
import CallEdit from './CallEdit';
import CallEditForm from './CallEditForm';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function CallDeskPage() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [editing, setEditing] = React.useState(null);
    const [counter, setCounter] = React.useState(0);

    const editCall = (call) => {
        setEditing(call);
        setValue(2);
    }

    const updateDatabase = () => {
        setCounter(counter+1);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Enter Call" {...a11yProps(0)} />
                    <Tab label="Edit Call" {...a11yProps(1)} />
                    {editing != null ? <Tab label={`Edit Call (${editing.title})`} {...a11yProps(2)} /> : []}
                    {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <CallForm onUpdate={updateDatabase}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CallEdit editCall={editCall} counter={counter}/>
            </TabPanel>
            {editing != null ?
                <TabPanel value={value} index={2}>
                    <CallEditForm call={editing} onUpdate={updateDatabase}/>
                </TabPanel>
                : []}
        </div>
    );
}

export default (CallDeskPage);