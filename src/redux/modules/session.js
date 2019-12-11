import { from } from 'rxjs';
import { map, mergeMap, flatMap} from 'rxjs/operators'
import { ofType } from 'redux-observable'
import {signIn} from '../../Client/LifeSaverClient'
import { showSnackbar } from './snackbar';
import {SUCCESS_SNACKBAR } from '../../common/SnackbarTypes'

const LOG_IN = 'LifeSaver/session/LOG_IN';
const LOG_OUT = 'LifeSaver/session/LOG_OUT';
const UPDATE_TOKEN = 'LifeSaver/session/UPDATE_TOKEN';


export const loginsession = (email, password) => ({ type: LOG_IN, email, password });

export const logoutsession = () => ({ type: LOG_OUT });

export const updatetokensession = (token) => ({ type: UPDATE_TOKEN, token });

export const logInEpic = action$ => action$.pipe(
  ofType(LOG_IN),
  mergeMap(action =>
      from(signIn(action.email, action.password)).pipe(
          map(x => updatetokensession({...x, user: JSON.parse(x.user)}))
      )
  )
);

const session = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case LOG_OUT:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};

export default session;
