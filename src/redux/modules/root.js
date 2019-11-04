import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import snackbar from './snackbar';

export const rootEpic = combineEpics();

export const rootReducer = combineReducers({
  snackbar
});