import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';
import DomainIcon from '@material-ui/icons/Domain';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

import { Card, CardHeader, Typography, CardActions, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

import Tooltip from '@material-ui/core/Tooltip';


function getIcons(call){
    return (
        <div>
            {call.isCallSpecialist? <PhoneIcon/> :<div/>}
            {call.isOperationsChief? <SupervisorAccountIcon/> :<div/>}
            {call.isMissionManagement? <DomainIcon/> :<div/>}
            {call.isFirstResponder? <PersonIcon/> :<div/>}
            {call.isVolunteer? <AccessibilityNewIcon/> :<div/>}
        </div>
    )
}

function getRoleString(call){
    let myString = ""
    let length = 0;
    if (call.isCallSpecialist){
        myString += "Call Specialist"
    }
    if (call.isOperationsChief){
        if (length > 0)
            myString+= ", "
        myString += "Operations Chief"
    }
    if (call.isMissionManagement){
        if (length > 0)
          myString+= ", "
        myString += "Mission Management"
    }
    if (call.isFirstResponder){
        if (length > 0)
           myString+= ", "
        myString += "First Responder"
    }
    if (call.isVolunteer){
        if (length > 0)
           myString+= ", "
        myString += "Volunteer"
    }

    return myString
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 140,
    },
}));

export default function UserPreview(props) {
    const { data, additionalActions } = props;

    console.log(data)
    const classes = useStyles();
    return (
        <Card style={{ width: '100%' }} align="left">
            <CardHeader
                avatar={getIcons(data)}
            />
            <CardContent style={{ paddingTop: 0 }}>
                <Typography variant="h5" component="h3">{data.firstName + " " + data.lastName}</Typography>
                <Box style={{ paddingTop: 16 }}>
                    <Typography component="p" style={{ fontSize: 12 }}>
                        Roles: {getRoleString(data)}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>{additionalActions}</CardActions>
        </Card>
    );
}