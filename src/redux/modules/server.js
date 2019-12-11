import { from } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import {
    getMissions as getMissionsPromise,
    getCalls as getCallsPromise,
    addCallToMission as addCallToMissionPromise,
    removeCallFromMission as removeCallFromMissionPromise,
    getCallsForMission as getCallsForMissionPromise,
    getUsers as getUsersPromise,
    addUserToMission as addUserToMissionPromise,
    removeUserFromMission as removeUserFromMissionPromise,
    getUsersForMission as getUsersForMissionPromise,
    updateCall as updateCallPromise
} from '../../Client/LifeSaverClient';

const GET_MISSIONS = 'LifeSaver/server/GET_MISSIONS';
const UPDATE_MISSIONS = 'LifeSaver/server/UPDATE_MISSIONS';
const GET_UNASSIGNED_CALLS = 'LifeSaver/server/GET_UNASSIGNED_CALLS';
const UPDATE_UNASSIGNED_CALLS = 'LifeSaver/server/UPDATE_UNASSIGNED_CALLS';
const GET_CALLS_FOR_MISSION = 'LifeSaver/server/GET_CALLS_FOR_MISSION';
const UPDATE_CALLS = 'LifeSaver/server/UPDATE_CURRENT_MISSION';
const ADD_CALL_TO_MISSION = 'LifeSaver/server/ADD_CALL_TO_MISSION';
const REMOVE_CALL_FROM_MISSION = 'LifeSaver/server/REMOVE_CALL_FROM_MISSION';
const GET_UNASSIGNED_USERS = 'LifeSaver/server/GET_UNASSIGNED_USERS';
const UPDATE_UNASSIGNED_USERS = 'LifeSaver/server/UPDATE_UNASSIGNED_USERS';
const GET_USERS_FOR_MISSION = 'LifeSaver/server/GET_CALLS_FOR_MISSION';
const UPDATE_USERS = 'LifeSaver/server/UPDATE_USERS';
const ADD_USER_TO_MISSION = 'LifeSaver/server/ADD_USER_TO_MISSION';
const REMOVE_USER_FROM_MISSION = 'LifeSaver/server/REMOVE_USER_FROM_MISSION';
const FAKE_ASSIGN_CALL = 'LifeSaver/server/FAKE_ASSIGN_CALL';
const FAKE_REMOVE_CALL = 'LifeSaver/server/FAKE_REMOVE_CALL';
const FAKE_ASSIGN_USER = 'LifeSaver/server/FAKE_ASSIGN_USER';
const FAKE_REMOVE_USER = 'LifeSaver/server/FAKE_REMOVE_USER';
const UPDATE_CALL = 'LifeSaver/server/UPDATE_CALL';



export const getMissions = () => ({ type: GET_MISSIONS });
export const updateMissions = (missions) => ({ type: UPDATE_MISSIONS, missions });
export const getUnassignedCalls = () => ({ type: GET_UNASSIGNED_CALLS });
export const updateUnassignedCalls = (unassignedCalls) => ({ type: UPDATE_UNASSIGNED_CALLS, unassignedCalls });
export const getCallsForMission = (mission) => ({ type: GET_CALLS_FOR_MISSION, mission });
export const updateCalls = (mission, calls) => ({ type: UPDATE_CALLS, mission, calls });
export const addCallToMission = (mission, call) => ({ type: ADD_CALL_TO_MISSION, mission, call });
export const removeCallFromMission = (mission, call) => ({ type: REMOVE_CALL_FROM_MISSION, mission, call });
export const getUnassignedUsers = () => ({ type: GET_UNASSIGNED_USERS });
export const updateUnassignedUsers = (unassignedUsers) => ({ type: UPDATE_UNASSIGNED_USERS, unassignedUsers });
export const getUsersForMission = (mission) => ({ type: GET_USERS_FOR_MISSION, mission });
export const updateUsers = (mission, users) => ({ type: UPDATE_USERS, mission, users });
export const addUserToMission = (mission, user) => ({ type: ADD_USER_TO_MISSION, mission, user });
export const removeUserFromMission = (mission, user) => ({ type: REMOVE_USER_FROM_MISSION, mission, user });
export const fakeAssignCall = (mission, call) => ({ type: FAKE_ASSIGN_CALL, mission, call });
export const fakeRemoveCall = (mission, call) => ({ type: FAKE_REMOVE_CALL, mission, call });
export const fakeAssignUser = (mission, user) => ({ type: FAKE_ASSIGN_USER, mission, user });
export const fakeRemoveUser = (mission, user) => ({ type: FAKE_REMOVE_USER, mission, user });
export const updateCall = (call) => ({ type: UPDATE_CALL, call });

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
          map(calls => updateCalls(action.mission, calls))
      )
  )
);

export const updateCallEpic = action$ => action$.pipe(
    ofType(UPDATE_CALL),
    mergeMap(action =>
        from(updateCallPromise(action.call.id, action.call)).pipe(
            map(() => getCallsForMission(action.call.mission.$oid))
        )
    )
  );

export const addCallToMissionEpic = action$ => action$.pipe(
    ofType(ADD_CALL_TO_MISSION),
    mergeMap(action =>
        from(addCallToMissionPromise(action.mission, action.call)).pipe(
            mergeMap(() => from([getUnassignedCalls(), getCallsForMission(action.mission)])),
            startWith(fakeAssignCall(action.mission, action.call))
        )
    )
);

export const removeCallFromMissionEpic = action$ => action$.pipe(
    ofType(REMOVE_CALL_FROM_MISSION),
    mergeMap(action =>
        from(removeCallFromMissionPromise(action.mission, action.call)).pipe(
            mergeMap(() => from([getUnassignedCalls(), getCallsForMission(action.mission)])),
            startWith(fakeRemoveCall(action.mission, action.call))
        )
    )
);

export const getUnassignedUsersEpic = action$ => action$.pipe(
    ofType(GET_UNASSIGNED_USERS),
    mergeMap(() =>
        from(getUsersPromise()).pipe(
            map(x => x.filter(y => !y.mission)),
            map(updateUnassignedUsers)
        )
    )
);


export const addUserToMissionEpic = action$ => action$.pipe(
    ofType(ADD_USER_TO_MISSION),
    mergeMap(action =>
        from(addUserToMissionPromise(action.mission, action.user)).pipe(
            mergeMap(() => from([getUnassignedUsers(), getUsersForMission(action.mission)])),
            startWith(fakeAssignUser(action.mission, action.user))
        )
    )
);

export const removeUserFromMissionEpic = action$ => action$.pipe(
    ofType(REMOVE_USER_FROM_MISSION),
    mergeMap(action =>
        from(removeUserFromMissionPromise(action.mission, action.user)).pipe(
            mergeMap(() => from([getUnassignedUsers(), getUsersForMission(action.mission)])),
            startWith(fakeRemoveUser(action.mission, action.user))
        )
    )
);

export const getUsersForMissionEpic = action$ => action$.pipe(
    ofType(GET_USERS_FOR_MISSION),
    mergeMap(action =>
        from(getUsersForMissionPromise(action.mission)).pipe(
            map(users => updateUsers(action.mission, users))
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
    case UPDATE_UNASSIGNED_USERS:
        return {
          ...state,
          unassignedUsers: action.unassignedUsers
        };
    case UPDATE_CALLS:
        return {
            ...state,
            missions: state.missions.map(x => x._id.$oid === action.mission ? {...x, calls: action.calls} : {...x})
        };
    case UPDATE_USERS:
        return {
            ...state,
            missions: state.missions.map(x => x._id.$oid === action.mission ? {...x, users: action.users} : {...x})
        };
    case FAKE_ASSIGN_CALL:
        return {
            ...state,
            unassignedCalls: state.unassignedCalls.filter(x => x._id !== action.call)
        }
    case FAKE_REMOVE_CALL:
        return {
            ...state,
            missions: state.missions.map(x => x._id.$oid === action.mission ? {...x, calls: x.calls.filter(x => x._id !== action.call)} : {...x})
        };
    case FAKE_ASSIGN_USER:
        return {
            ...state,
            unassignedUsers: state.unassignedUsers.filter(x => x._id !== action.user)
        }
    case FAKE_REMOVE_USER:
        return {
            ...state,
            missions: state.missions.map(x => x._id.$oid === action.mission ? {...x, users: x.users.filter(x => x._id !== action.user)} : {...x})
        };
    default:
      return state;
  }
};

export default server;
