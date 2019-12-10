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

const mapStateToProps = state => ({
    token: state.session ? state.session.token : null
});

function AppRouter({ token }) {
    return token ? (<Router>
                <Switch>
                    <Route path="/Login/Register">
                        <Register/>
                    </Route>
                    <Route path="/Login">
                        <UserLogin/>
                    </Route>
                    <Route path="/CallCenter">
                        <CallDeskPage />
                        <Logout/>
                    </Route>
                    <Route path="/OperationsChief">
                        <MissionView />
                        <Logout/>
                    </Route>
                    <Route path="/FirstResponder">
                        <CallEvent />
                        <Logout/>
                    </Route>
                    <Route path="/">
                        <UserLogin/>
                    </Route>
                </Switch>
            </Router>) : 
            (<Router>
                <Switch>
                    <Route path="/">
                        <UserLogin/>
                    </Route>
                </Switch>
            </Router>);
}

export default connect(mapStateToProps)(AppRouter);