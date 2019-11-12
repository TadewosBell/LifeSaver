const LOG_IN = 'LifeSaver/session/LOG_IN';
const LOG_OUT = 'LifeSaver/session/LOG_OUT';

export const loginsession = (email, message) => ({ type: LOG_IN, email, message });

export const logoutsession = (email) => ({ type: LOG_OUT, email });

const session = (state = {}, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        session: {
          ...state.session,
          loggedIn: true
        }
      };
    case LOG_OUT:
    return {
        ...state,
        session: {
        ...state.session,
        loggedIn: true
        }
    };
    default:
      return state;
  }
};

export default session;
