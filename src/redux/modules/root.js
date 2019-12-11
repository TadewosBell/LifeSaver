import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import snackbar from './snackbar';
import server, {
  getMissionsEpic,
  getUnassignedCallsEpic,
  getCallsForMissionEpic,
  addCallToMissionEpic,
  removeCallFromMissionEpic
} from './server'

import session, {logInEpic} from './session';


export const rootEpic = combineEpics(
  getMissionsEpic,
  getUnassignedCallsEpic,
  getCallsForMissionEpic,
  addCallToMissionEpic,
  removeCallFromMissionEpic, 
  logInEpic
);

export const rootReducer = combineReducers({
  snackbar,
  server, 
  session
});