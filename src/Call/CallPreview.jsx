import React from 'react'
import { Card, CardHeader, Typography, CardActions } from '@material-ui/core'

export default function CallPreview(props) {
    const { data, additionalActions } = props;
    return (
        <Card style={{width:'100%'}}>
            <Typography style={{ padding: 10 }}>{data.priority}</Typography>
            <CardHeader title={data.title} subheader={new Date(data.timeReceived.$date).toLocaleString()}/>
            <CardActions>{additionalActions}</CardActions>
        </Card>
    );
}