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

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

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
    card: {
        //maxWidth: 500,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText

    },
    media: {
        height: 140,
    },
}));

const wolfTheme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500],
        },
    }
});

const tigerTheme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
    }
});
const demonTheme = createMuiTheme({
    palette: {
        primary: {
            main: yellow[500],
        },
    }
});
const dragonTheme = createMuiTheme({
    palette: {
        primary: {
            main: orange[500],
        },
    }
});
const godTheme = createMuiTheme({
    palette: {
        primary: {
            main: red[500],
        },
    }
});
function SearchResult(props) {
    const classes = useStyles();
    const call = props.call;
    const themeMatcher = {
        "wolf" : wolfTheme,
        "tiger" : tigerTheme,
        "demon" : demonTheme,
        "dragon" : dragonTheme,
        "god" : godTheme
    }
    const myTheme = themeMatcher[call.priority.toLowerCase()]

    return (
        <MuiThemeProvider theme={myTheme}>
        <Card className={classes.card}>
            <CardActionArea onClick={() => props.editCall(call)}>
                <CardContent>
                    <Typography variant="h5" component="h3">
                        {call.title}
                    </Typography>
                    <Typography component="p">
                        ID: {(call._id.$oid ? call._id.$oid : call._id) ? (call._id.$oid ? call._id.$oid : call._id) : "NONE"}
                    </Typography>
                    <Typography component="p">
                        {call.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </MuiThemeProvider>
    );
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
                setCalls(response);
            }
        })();

        return () => {
            active = false;
        };
    }, [counter]); //"true" makes sure that we never refetch the component.

    //We use a regex for matching, but this could cause problems with special characters.
    const toDisplay = props.query == "" ? [] : calls.filter((call) => call.title.toLowerCase().indexOf(props.query.toLowerCase()) != -1);
    return (
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={4}>
                    {toDisplay.map(function (d, idx) {
                        return (<GridListTile key={d._id.$oid ? d._id.$oid : d._id} cols={1}> <SearchResult call={d} editCall={props.editCall} /> </GridListTile>)
                    })}
                </GridList>
            </div>
    );
}