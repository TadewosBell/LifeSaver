import React from '../../node_modules/react';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core'
import MapWidget from './MapWidget';

const useStyles = makeStyles({
    card: {
    }
});

export default function Location(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" color="textSecondary" gutterBottom>Location</Typography>
                <Typography variant="h6" gutterBottom>{props.address}</Typography>
                <Typography variant="body1" gutterBottom>Details: {props.details}</Typography>
                <MapWidget address={props.address}/>
            </CardContent>
        </Card>
    );
}
