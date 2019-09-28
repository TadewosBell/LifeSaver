import React, { Component } from '../../node_modules/react';
import {
  Route,
  HashRouter,
} from '../../node_modules/react-router-dom';
import LandingPage from './LandingPage';
import { withRouter } from '../../node_modules/react-router';
import DashBoard from '../Dashboard/DashBoard';


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
    );
  }
}

export default (HomePage);
