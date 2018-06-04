/* global RedEditorSDK */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import {
  push,
} from 'react-router-redux';
import MessageBar from './components/MessageBar';
import { auth } from './data/auth/actions';
import ManagerPage from './scenes/ManagerPage';
import LandingPage from './scenes/LandingPage';
import Camera from './scenes/Camera';
import Loader from './components/Loader';
import {removeTokenFromCookie} from './modules/authHelper';

// 차후 메세지 큐는 메세지 컴포넌트에 통합
class App extends Component {
  constructor(props) {
    super(props);
    this.props.requestAuth();
  }
  handleLogout = () => {
    removeTokenFromCookie();
    this.props.requestAuth();
    this.props.push('/');
  };
  render() {
    const {
      auth,
    } = this.props;
    let rendered;
    if (auth.loading) {
      rendered = <Loader/>;
    } else if (!auth.response) {
      rendered = <LandingPage handleLogout={this.handleLogout}/>;
    } else {
      rendered = (
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Camera handleLogout={this.handleLogout}/>}
          />
          <Route
            path="/managerPage"
            render={() => <ManagerPage handleLogout={this.handleLogout}/>}
          />

        </Switch>
      );
    }
    return (
      <React.Fragment>
        {rendered}
        <MessageBar/>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.data.auth,
});
export default withRouter(connect(mapStateToProps, {
  push,
  requestAuth: auth.request,
})(App));
