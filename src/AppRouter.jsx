import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { connect } from 'react-redux';
import UserLogin from './Login/UserLogin';
import Register from './Login/Register';
import CallDeskPage from './CallDesk/CallDeskPage';
import MissionView from './Mission/MissionView';
import CallEvent from './FirstResponder/CallEvent';
import Logout from './Login/Logout';
import { Typography, Grid, AppBar } from '@material-ui/core';
import icon from "./Login/icon.png"

const mapStateToProps = state => ({
    token: state.session ? state.session.token : null
});

function getHomepage(user) {
    if (user.isFirstResponder) {return (<CallEvent/>);}
    else if(user.isVolunteer){return (<CallEvent/>);}
    else if(user.isMissionManagement){return (<div/>);}
    else if(user.isOperationsChief){return (<MissionView/>);}
    else if(user.isCallSpecialist){ return (<CallDeskPage/>);}
    else { return <div/>;}
}

function AppRouter({ token }) {
    return token ? (
    <div>
        <AppBar position="static">
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                    <img src={icon} width="72" height="72" />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h3" align="center">
                        Life Saver
                    </Typography> 
                </Grid>
                <Grid item xs={2}>
                    <Logout/>
                </Grid>
            </Grid>
        </AppBar>
        <Router>
                <Switch>
                    <Route path="/Login/Register">
                        <Register/>
                    </Route>
                    <Route path="/CallCenter">
                        <CallDeskPage />
                    </Route>
                    <Route path="/OperationsChief">
                        <MissionView />
                    </Route>
                    <Route path="/FirstResponder">
                        <CallEvent />
                    </Route>
                    <Route path="/">
                        {getHomepage(token.user)}                      
                    </Route>
                </Switch>
            </Router></div>) : 
            (<Router>
                <Switch>
                    <Route path="/">
                        <UserLogin/>
                    </Route>
                </Switch>
            </Router>);
}

export default connect(mapStateToProps)(AppRouter);