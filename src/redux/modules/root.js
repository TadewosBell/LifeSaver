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

export const rootEpic = combineEpics(
  getMissionsEpic,
  getUnassignedCallsEpic,
  getCallsForMissionEpic,
  addCallToMissionEpic,
  removeCallFromMissionEpic
);

export const rootReducer = combineReducers({
  snackbar,
  server
});