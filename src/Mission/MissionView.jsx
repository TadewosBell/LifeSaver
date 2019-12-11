import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import MissionViewTemplate from '../templates/MissionViewTemplate';
import { addCallToMission, getMissions, getUnassignedCalls, getUnassignedUsers } from '../redux/modules/server'
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { GlobalTimer } from '../App'

const mapStateToProps = state => {
    return {
        missions: state.server.missions,
        unassignedCalls: state.server.unassignedCalls,
        unassignedUsers: state.server.unassignedUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCall: (mission, call) => {
            dispatch(addCallToMission(mission, call))
        }
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(MissionViewTemplate);

const MissionView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const updater = GlobalTimer.subscribe(() => {
            dispatch(getMissions());
            dispatch(getUnassignedCalls());
            dispatch(getUnassignedUsers());
        });

        return updater.unsubscribe;
    });

    return (<Connected />);
}

export default MissionView;
