import { from } from 'rxjs';
import { map, mergeMap, delay, combineAll, flatMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { 
    getMissions as getMissionsPromise,
    getCalls as getCallsPromise ,
    addCallToMission as addCallToMissionPromise,
    removeCallFromMission as removeCallFromMissionPromise,
    getCallsForMission as getCallsForMissionPromise
} from '../../Client/LifeSaverClient';

const GET_MISSIONS = 'LifeSaver/server/GET_MISSIONS';
const UPDATE_MISSIONS = 'LifeSaver/server/UPDATE_MISSIONS';
const GET_UNASSIGNED_CALLS = 'LifeSaver/server/GET_UNASSIGNED_CALLS';
const UPDATE_UNASSIGNED_CALLS = 'LifeSaver/server/UPDATE_UNASSIGNED_CALLS';
const GET_CALLS_FOR_MISSION = 'LifeSaver/server/GET_CALLS_FOR_MISSION';
const UPDATE_CURRENT_MISSION = 'LifeSaver/server/UPDATE_CURRENT_MISSION';
const ADD_CALL_TO_MISSION = 'LifeSaver/server/ADD_CALL_TO_MISSION';
const REMOVE_CALL_FROM_MISSION = 'LifeSaver/server/REMOVE_CALL_FROM_MISSION';


export const getMissions = () => ({ type: GET_MISSIONS });
export const updateMissions = (missions) => ({ type: UPDATE_MISSIONS, missions });
export const getUnassignedCalls = () => ({ type: GET_UNASSIGNED_CALLS });
export const updateUnassignedCalls = (unassignedCalls) => ({ type: UPDATE_UNASSIGNED_CALLS, unassignedCalls });
export const getCallsForMission = (mission) => ({ type: GET_CALLS_FOR_MISSION, mission });
export const updateCurrentMission = (mission, calls) => ({ type: UPDATE_CURRENT_MISSION, mission, calls });
export const addCallToMission = (mission, call) => ({ type: ADD_CALL_TO_MISSION, mission, call });
export const removeCallFromMission = (mission, call) => ({ type: REMOVE_CALL_FROM_MISSION, mission, call });

export const getMissionsEpic = action$ => action$.pipe(
    ofType(GET_MISSIONS),
    mergeMap(() =>
        from(getMissionsPromise()).pipe(
            map(updateMissions)
        )
    )
);

export const getUnassignedCallsEpic = action$ => action$.pipe(
    ofType(GET_UNASSIGNED_CALLS),
    mergeMap(() =>
        from(getCallsPromise()).pipe(
            map(x => x.filter(y => !y.mission)),
            map(updateUnassignedCalls)
        )
    )
);

export const getCallsForMissionEpic = action$ => action$.pipe(
  ofType(GET_CALLS_FOR_MISSION),
  mergeMap(action =>
      from(getCallsForMissionPromise(action.mission)).pipe(
          map(calls => updateCurrentMission(action.mission, calls))
      )
  )
);

export const addCallToMissionEpic = action$ => action$.pipe(
    ofType(ADD_CALL_TO_MISSION),
    mergeMap(action =>
        from(addCallToMissionPromise(action.mission, action.call)).pipe(
            map(getUnassignedCalls)
        )
    )
);

export const removeCallFromMissionEpic = action$ => action$.pipe(
    ofType(REMOVE_CALL_FROM_MISSION),
    mergeMap(action =>
        from(removeCallFromMissionPromise(action.mission, action.call)).pipe(
            delay(100),
            map(getUnassignedCalls)
        )
    )
);

const server = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MISSIONS:
      return {
        ...state,
        missions: action.missions
      };
    case UPDATE_UNASSIGNED_CALLS:
      return {
        ...state,
        unassignedCalls: action.unassignedCalls
      };
    case UPDATE_CURRENT_MISSION:
        return {
            ...state,
            missions: state.missions.map(x => x._id.$oid === action.mission ? {...x, calls: action.calls} : {...x})
        };
    default:
      return state;
  }
};

export default server;
