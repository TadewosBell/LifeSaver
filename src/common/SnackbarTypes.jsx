import { connect } from 'react-redux'
import { clearSnackbar } from '../redux/modules/snackbar'
import SuccessSnackbarTemplate from '../templates/SuccessSnackbarTemplate'

export const SUCCESS_SNACKBAR = "success";
export const INFO_SNACKBAR = "info";
export const ERROR_SNACKBAR = "error";

const mapStateToProps = snackbarName => state => {
    return state.snackbar.snackbars && state.snackbar.snackbars[snackbarName] ? {
        open: state.snackbar.snackbars[snackbarName].open,
        message: state.snackbar.snackbars[snackbarName].message
    } : {};
}

const mapDispatchToProps = snackbarName => dispatch => {
    return {
        onClose: () => {
            dispatch(clearSnackbar(snackbarName))
        }
    }
}

const getReduxSnackbar = (type, name) => connect(
    mapStateToProps(name),
    mapDispatchToProps(name)
)(type)

export const SuccessSnackbar = getReduxSnackbar(SuccessSnackbarTemplate, SUCCESS_SNACKBAR);
export const InfoSnackbar = getReduxSnackbar(SuccessSnackbarTemplate, INFO_SNACKBAR);
export const ErrorSnackbar = getReduxSnackbar(SuccessSnackbarTemplate, ERROR_SNACKBAR);