import React from '../../node_modules/react';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core'
import MapWidget from './MapWidget';

const useStyles = makeStyles({
    card: {
    }
});

export default function Location({address, details, coordinates}) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" color="textSecondary" gutterBottom>Location</Typography>
                <Typography variant="h6" gutterBottom>{address}</Typography>
                <Typography variant="body1" gutterBottom>Details: {details}</Typography>
                <MapWidget address={address}/>
            </CardContent>
        </Card>
    );
}
