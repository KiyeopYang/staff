import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import {
  push,
} from 'react-router-redux';
import {
  getWork,
} from './data/getWork/actions';
import {
  startWork,
} from './data/startWork/actions';
import {
  endWork,
} from './data/endWork/actions';
import Loader from '../../components/Loader';
import QrReader from './components/QrReader';
import Menu from './components/Menu';
import Result from './components/Result';
import Timer from './components/Timer';
import Prompt from './components/Prompt';
import Layout from './components/Layout';

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'No Result',
      facingMode: 'environment',
      stopCapture: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getWork.response && !this.props.getWork.response) {
      this.setState({
        stopCapture: true,
      });
    }
  }
  handleScan = (data) => {
    if (data && data.length === 24) {
      this.props.requestGetWork({
        staffId: data,
      });
    }
  };
  handleMenuClick = (name) => {
    switch (name) {
      case 'managerPage':
        this.props.push('/managerPage');
        break;
      case 'logout':
        this.props.handleLogout();
        break;
      case 'default': break;
    }
  };
  handleFacingMode = checked => this.setState({
    facingMode: checked ? 'user' : 'environment',
  });
  handleResultClick = (name, data) => {
    switch (name) {
      case 'recapture': this.setState({
          stopCapture: false,
        });
        break;
      case 'start':
        this.props.requestStartWork(data);
        this.setState({
          stopCapture: false,
        });
        break;
      case 'end':
        this.props.requestEndWork({ id: data.work.id });
        this.setState({
          stopCapture: false,
        });
        break;
      default:
        break;
    }
  };
  render() {
    const {
      result,
      facingMode,
      stopCapture,
    } = this.state;
    const {
      getWork,
      auth,
    } = this.props;
    return (
      <Layout>
        {stopCapture ?
          <Result
            shop={auth.response}
            response={getWork.response}
            handleClick={this.handleResultClick}
          /> :
          <React.Fragment>
            {getWork.loading ? <Loader/> : null}
            <QrReader
              onError={console.error}
              onScan={this.handleScan}
              facingMode={facingMode}
            />
            <Menu
              handleClick={this.handleMenuClick}
              facingMode={facingMode === 'user'}
              handleFacingMode={this.handleFacingMode}
            />
            <Prompt {...getWork}/>
            <Timer
              shopName={auth.response.name}
            />
          </React.Fragment>
        }
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  getWork: state.Camera.data.getWork,
  startWork: state.Camera.data.startWork,
  endWork: state.Camera.data.endWork,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  requestGetWork: getWork.request,
  requestStartWork: startWork.request,
  requestEndWork: endWork.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
