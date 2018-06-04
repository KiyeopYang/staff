import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';
import dayjs from 'dayjs';

const styles = {};
class Component extends React.Component {
  state = {
    time: new Date(),
    timerInterval: null,
  };
  componentDidMount() {
    this.setState({
      timerInterval: setInterval(() => this.setState({
        time: new Date(),
      }), 1000),
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.timerInterval);
  }
  render () {
    const { classes } = this.props;

    return (
      <Text align="center">
        {
          dayjs(this.state.time)
          .format('YYYY-MM-DD HH:mm:ss')
        }
      </Text>
    );
  }
}
export default withStyles(styles)(Component);
