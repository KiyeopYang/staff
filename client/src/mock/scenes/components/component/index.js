import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';

const styles = {};
class Component extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <div>Component</div>
    );
  }
}
export default withStyles(styles)(Component);
