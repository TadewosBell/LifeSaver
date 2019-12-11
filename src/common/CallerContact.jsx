import React from 'react';
import { makeStyles, Typography, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
    }
});

export default function CallerContact(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" gutterBottom>Caller</Typography>
                <Typography variant="body1" gutterBottom><b>Name: </b>{props.name}</Typography>
                <Typography variant="body1" gutterBottom><b>Phone: </b>{props.phoneNumber}</Typography>
            </CardContent>
        </Card>
    );
}
