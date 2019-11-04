import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router';
import { showSnackbar } from '../redux/modules/snackbar'
import { SuccessSnackbar, SUCCESS_SNACKBAR } from '../common/SnackbarTypes';

const LandingPage = (props) => {
    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false);

    const onClick = () => {
        setClicked(!clicked);     
    }

    return ( 
        <div>
            <h1>Hello! {clicked.toString()}</h1>
            <button onClick={onClick}>Click</button>
            <button onClick={() => dispatch(showSnackbar(SUCCESS_SNACKBAR, "Successfully displayed this message."))}>test</button>
            <SuccessSnackbar />
        </div>
    );
}
 
export default withRouter(LandingPage);