const SHOW = 'LifeSaver/snackbar/SHOW';
const CLEAR = 'LifeSaver/snackbar/CLEAR';

export const showSnackbar = (snackbarName, message) => ({ type: SHOW, snackbarName, message });

export const clearSnackbar = (snackbarName) => ({ type: CLEAR, snackbarName });

const snackbar = (state = {}, action) => {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        snackbars: {
          ...state.snackbars,
          [action.snackbarName]: { open: true, message: action.message }
        }
      };
    case CLEAR:
      return {
        ...state,
        snackbars: {
          ...state.snackbars,
          [action.snackbarName]: { open: false }
        }
      };
    default:
      return state;
  }
};

export default snackbar;
