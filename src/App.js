import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { CssBaseline } from '@material-ui/core';
import CallForm from './CallDesk/CallForm';
import MissionView from './Mission/MissionView';
import CallEvent from './FirstResponder/CallEvent';
import './App.css';
import LandingPage from './Home/LandingPage';

function App() {
  return (
    <div className="App">
        <CssBaseline />
        <Router>
            <Switch>
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
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
