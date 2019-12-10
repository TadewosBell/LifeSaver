import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';
import AppRouter from './AppRouter'

export const GlobalTimer = interval(30000).pipe(startWith(0));

function App() {
  return (
    <Provider store={store()}>
        <div className="App">
            <CssBaseline />
            <AppRouter />>
        </div>
    </Provider>
  );
}

export default App;
