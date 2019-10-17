import React, { Component } from 'react';
import {
  Route,
  HashRouter,
} from 'react-router-dom';
import LandingPage from './LandingPage';
import { withRouter } from 'react-router';
import DashBoard from '../Dashboard/DashBoard';
import CssBaseline from '@material-ui/core/CssBaseline';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loggedIn: true,
    };
  }

  logIn = (loggedIn) => {

    console.log(loggedIn);

    this.setState({
        loggedIn,
    });


  }
  render() {
      const { loggedIn } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <HashRouter>
          <div className="content">
            <Route exact path="/"
            component={() => <LandingPage redirect={this.redirect} history={this.props.history} />} />
            {
                loggedIn
                && <Route path="/DashBoard/" component={DashBoard} />
            }
          </div>
        </HashRouter>
    </React.Fragment>
    );
  }
}

export default (HomePage);
