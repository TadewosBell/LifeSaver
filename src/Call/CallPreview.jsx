import React from 'react'
import { Card, CardHeader, Typography, CardActions, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

import WavesIcon from '@material-ui/icons/Waves';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

import { toPriorityName } from "../common/CallHelpers";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 1000,
        // height: 450,
    },
    wolfCard: {
        //maxWidth: 500,
        backgroundColor: blue[600],
        color: theme.palette.primary.contrastText
    },
    tigerCard: {
        //maxWidth: 500,
        backgroundColor: green[600],
        color: theme.palette.primary.contrastText
    },
    demonCard: {
        //maxWidth: 500,
        backgroundColor: yellow[600],
        color: theme.palette.primary.contrastText
    },
    dragonCard: {
        //maxWidth: 500,
        backgroundColor: orange[600],
        color: theme.palette.primary.contrastText
    },
    godCard: {
        //maxWidth: 500,
        backgroundColor: red[600],
        color: theme.palette.primary.contrastText
    },
    disabledCard: {
        //maxWidth: 500,
        backgroundColor: grey[600],
        color: theme.palette.primary.contrastText
    },
    media: {
        height: 140,
    },
}));

export default function CallPreview(props) {
    const { data, additionalActions } = props;

    const classes = useStyles();
    const themeMatcher = {
        "wolf": classes.wolfCard,
        "tiger": classes.tigerCard,
        "demon": classes.demonCard,
        "dragon": classes.dragonCard,
        "god": classes.godCard
    }
    const iconMatcher = {
        "flood": <InvertColorsIcon style={{ fontSize: 30 }} />,
        "tornado": <CloudQueueIcon style={{ fontSize: 30 }} />,
        "electrical": <FlashOnIcon style={{ fontSize: 30 }} />,
        "fire": <WhatshotIcon style={{ fontSize: 30 }} />,
        "earthquake": <WavesIcon style={{ fontSize: 30 }} />
    }
    let myClass = themeMatcher[data.priority.toLowerCase()]
    if (data.resolved) myClass = classes.disabledCard;
    const myIcon = iconMatcher[data.category.toLowerCase()];

    return (
        <Card style={{ width: '100%' }} className={myClass} align="left">
            <CardHeader
                avatar={myIcon}
                title={<Typography variant="h5" component="h3">{data.title}</Typography>}
                subheader={
                    <Box >
                        <Typography component="p" >ID: {data._id}</Typography>
                        <Typography component="p" style={{ fontSize: 12 }}>{new Date(data.timeReceived.$date).toLocaleString()}</Typography>
                    </Box>
                }
            />
            <CardContent style={{ paddingTop: 0 }}>
                <Typography component="p" >
                    {data.description}
                </Typography>
                <Box style={{ paddingTop: 16 }}>
                    <Typography component="p" style={{ fontSize: 12 }}>
                        Status: {!data.resolved ? "Open" : "Resolved"}
                    </Typography>
                    <Typography component="p" style={{ fontSize: 12 }}>
                        Priority: {toPriorityName(data.priority)}
                    </Typography>
                    <Typography component="p" style={{ fontSize: 12 }}>
                        Category: {data.category}
                    </Typography>
                    <Typography component="p" style={{ fontSize: 12 }}>
                        Location: {data.location.address}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>{additionalActions}</CardActions>
        </Card>
    );
}