import React from 'react';
import { Card, CardHeader } from '@material-ui/core'

export default function MissionPreview(props) {
    const { data } = props;
    return (
        <Card>
            <CardHeader title={data.title} subheader={data.active ? "Active" : "Inactive"}/>
        </Card>
    );
}
