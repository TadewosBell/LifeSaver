import React, { useState, useEffect } from 'react';
import { getCalls } from "../Client/LifeSaverClient";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

import WavesIcon from '@material-ui/icons/Waves';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import { CardHeader } from '@material-ui/core';

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
    media: {
        height: 140,
    },
}));

const wolfTheme = createMuiTheme({
    palette: {
        primary: blue
    }
});

const tigerTheme = createMuiTheme({
    palette: {
        primary: green
    }
});
const demonTheme = createMuiTheme({
    palette: {
        primary: yellow
    }
});
const dragonTheme = createMuiTheme({
    palette: {
        primary: orange
    }
});
const godTheme = createMuiTheme({
    palette: {
        primary: red
    }
});
function SearchResult(props) {
    const classes = useStyles();
    const call = props.call;
    const themeMatcher = {
        "wolf": classes.wolfCard,
        "tiger": classes.tigerCard,
        "demon": classes.demonCard,
        "dragon": classes.dragonCard,
        "god": classes.godCard
    }
    const iconMatcher = {
        "flood": <InvertColorsIcon style={{ fontSize: 30 }}/>,
        "tornado": <CloudQueueIcon style={{ fontSize: 30 }}/>,
        "electrical":<FlashOnIcon style={{ fontSize: 30 }}/>,
        "fire": <WhatshotIcon style={{ fontSize: 30 }}/>,
        "earthquake": <WavesIcon style={{ fontSize: 30 }}/>
    }
    const myClass = themeMatcher[call.priority.toLowerCase()]
    const myIcon = iconMatcher[call.category.toLowerCase()];
    return (
        <Card className={myClass}>
            <CardActionArea onClick={() => props.editCall(call)}>
                <CardHeader
                    avatar={myIcon}
                    title={<Typography variant="h5" component="h3">{call.title}</Typography>}
                    subheader={<Typography component="p">ID: {call.id}</Typography>}
                />
                <CardContent style={{paddingTop: 0}}>
                     <Typography component="p" fontStyle="italic">
                        {new Date(call.timeReceived.$date).toLocaleString()}
                    </Typography>
                    <Typography component="p" fontStyle="italic">
                        {call.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}

export function filterCalls(calls) {
    let filteredCalls = [];
    calls.forEach((call) => {
        if (call.title != undefined) {
            if (call._id)
                if (call._id.$oid)
                    call.id = call._id.$oid;
                else
                    call.id = call._id;
            filteredCalls.push(call);
        }
    });

    return filteredCalls;
}

export default function SearchResults(props) {
    const counter = props.counter;

    const [calls, setCalls] = useState(
        []
    );
    const classes = useStyles();
    //console.log(props.editCall);

    React.useEffect(() => {
        let active = true;

        (async () => {
            const response = await getCalls();

            //To negate multiple sessions if they exist due to multiple re-renders
            if (active) {
                setCalls(filterCalls(response));
            }
        })();

        return () => {
            active = false;
        };
    }, [counter]); //"true" makes sure that we never refetch the component.

    //We use a regex for matching, but this could cause problems with special characters.
    const toDisplay = props.query == "" ? [] : calls.filter((call) => call.title.toLowerCase().indexOf(props.query.toLowerCase()) != -1 || String(call.id) == props.query);
    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={4}>
                {toDisplay.map(function (d, idx) {
                    return (<GridListTile key={d.id} cols={1}> <SearchResult call={d} editCall={props.editCall} /> </GridListTile>)
                })}
            </GridList>
        </div>
    );
}