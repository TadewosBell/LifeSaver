import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import CallForm from './CallDesk/CallForm';
import MissionView from './Mission/MissionView';
import CallEvent from './FirstResponder/CallEvent';
import './App.css';
import LandingPage from './Home/LandingPage';
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import UserLogin from './Login/UserLogin';
import Register from './Login/Register';

function App() {
  return (
    <Provider store={store()}>
        <div className="App">
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/Login/Register">
                        <Register/>
                    </Route>
                    <Route path="/Login">
                        <UserLogin/>
                    </Route>
                    <Route path="/CallCenter">
                        <CallForm />
                    </Route>
                    <Route path="/OperationsChief">
                        <MissionView />
                    </Route>
                    <Route path="/FirstResponder">
                        <CallEvent />
                    </Route>
                    <Route path="/">
                        <UserLogin/>
                    </Route>
                </Switch>
            </Router>
        </div>
    </Provider>
  );
}

export default App;
