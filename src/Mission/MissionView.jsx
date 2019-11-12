import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import MissionViewTemplate from '../templates/MissionViewTemplate';
import { addCallToMission, getMissions, getUnassignedCalls } from '../redux/modules/server'
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

const mapStateToProps = state => {
    return {
        missions: state.server.missions,
        unassignedCalls: state.server.unassignedCalls
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
        const updater = interval(100000).pipe(
            startWith(0)
        ).subscribe(() => {
            dispatch(getMissions());
            dispatch(getUnassignedCalls());
        });

        return updater.unsubscribe;
    });

    return (<Connected />);
}

export default MissionView;
