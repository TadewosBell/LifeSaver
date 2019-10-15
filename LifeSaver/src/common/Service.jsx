import React from 'react';
import { makeStyles, Chip } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    }
}));

export default function Service(props) {
    const classes = useStyles();

    return (<Chip label={props.type} className={classes.root} />);
}
