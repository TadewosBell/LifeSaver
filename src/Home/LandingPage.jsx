import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router';
import { showSnackbar } from '../redux/modules/snackbar';
import { SuccessSnackbar, SUCCESS_SNACKBAR } from '../common/SnackbarTypes';
import UserLogin from '../Login/UserLogin';
import { Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'


//const mapStateToProps = state => {
//    return {loggedIn: state.session.loggedIn }
//};

const LandingPage = ({loggedIn}) => {
    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false);
    const [loggyMcIn, setLoggyMcIn] = useState(sessionStorage.getItem("loggedIn"));
    //const isLoggedIn = sessionStorage.getItem("loggedIn");

    const onClick = () => {
        setClicked(!clicked);     
    }

    return ( 
        <div>
            <h1>Hello! {clicked.toString()}</h1>
            <button onClick={onClick}>Click</button>
            <button onClick={() => dispatch(showSnackbar(SUCCESS_SNACKBAR, "Successfully displayed this message."))}>test</button>
            <UserLogin />
            <Route exact path="/">
                {sessionStorage.getItem("loggedIn") ? <Redirect to="/CallCenter" /> : <UserLogin />}
            </Route>
            <SuccessSnackbar />
        </div>
    );
}

//export default withRouter(connect(mapStateToProps)(LandingPage));
export default withRouter(LandingPage);