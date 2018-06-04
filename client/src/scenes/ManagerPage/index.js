import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { auth } from '../../data/auth/actions';
import Layout from './components/Layout';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Content from './components/Content';
import Loader from '../../components/Loader';
import ShopManager from './scenes/ShopManager';
import StaffManager from './scenes/StaffManager';
import WorkManager from './scenes/WorkManager';

class Scene extends React.Component {
  constructor(props) {
    super(props);
  }
  handleHeaderClick = (name) => {
    switch(name) {
      case 'logout':
        this.props.handleLogout();
        break;
      default:
        break;
    }
  };
  handleSideMenuClick = (name) => {
    const { path } = this.props.match;
    switch (name) {
      case 'camera':
        this.props.push('/');
        break;
      default :
        this.props.push(`${path}/${name}`);
        break;
    }
  };
  render() {
    const { auth, push } = this.props;
    return (
      <Layout>
        <Switch>
          <Route
            exact
            path="/managerPage"
            render={() => <Redirect to='/managerPage/shop'/>}
          />
          <React.Fragment>
            <Header
              shop={auth.response}
              handleClick={this.handleHeaderClick}
            />
            <Route
              path="/managerPage/:menu"
              render={({ match }) => (
                <SideMenu
                  type={auth.response.type}
                  selected={match.params.menu}
                  handleClick={this.handleSideMenuClick}
                />
              )}
            />
            <Content>
              <Route
                path="/managerPage/shop"
                component={ShopManager}
              />
              <Route
                path="/managerPage/staff"
                component={StaffManager}
              />
              <Route
                path="/managerPage/work"
                component={WorkManager}
              />
            </Content>
          </React.Fragment>
        </Switch>
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
