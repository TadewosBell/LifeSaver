import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import snackbar from './snackbar';
import server, {
  getMissionsEpic,
  getUnassignedCallsEpic,
  getCallsForMissionEpic,
  addCallToMissionEpic,
  removeCallFromMissionEpic,
  getUnassignedUsersEpic,
  getUsersForMissionEpic,
  addUserToMissionEpic,
  removeUserFromMissionEpic,
  updateCallEpic,
} from './server'

import session, {logInEpic} from './session';


export const rootEpic = combineEpics(
  getMissionsEpic,
  getUnassignedCallsEpic,
  getCallsForMissionEpic,
  addCallToMissionEpic,
  removeCallFromMissionEpic, 
  logInEpic,
  getUnassignedUsersEpic,
  getUsersForMissionEpic,
  addUserToMissionEpic,
  removeUserFromMissionEpic,
  updateCallEpic,
);

export const rootReducer = combineReducers({
  snackbar,
  server, 
  session
});