import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(1, 1),
    },
}));

export const PriorityLevel = {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High"
};

function getStyleForLevel(level) {
    switch(level) {
        case PriorityLevel.LOW:
            return {
                backgroundColor: "lightblue",
                color: "black"
            };
        case PriorityLevel.MEDIUM:
                return {
                    backgroundColor: "yellow",
                    color: "black"
                };
        case PriorityLevel.HIGH:
                return {
                    backgroundColor: "red",
                    color: "white"
                };
        default:
            return {};
    }
}

export default function Priority(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root} style={getStyleForLevel(props.level)}>
            <Typography variant="h6">{props.level} Priority</Typography>
        </Paper>
    );
}
