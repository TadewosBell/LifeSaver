import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { CssBaseline } from '@material-ui/core';
import CallDeskPage from './CallDesk/CallDeskPage';
import MissionView from './Mission/MissionView';
import CallEvent from './FirstResponder/CallEvent';
import './App.css';
import LandingPage from './Home/LandingPage';
import { Provider } from "react-redux";
import store from "./redux/configureStore";

function App() {
  return (
    <Provider store={store()}>
        <div className="App">
            <CssBaseline />
            <Router>
                <Switch>
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
                        <LandingPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    </Provider>
  );
}

export default App;
