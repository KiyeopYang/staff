import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    position: 'relative',
    height: '100vh',
    overflowY: 'auto',
  },
  toolbar: {
    minHeight: 64,
  },
});
class Component extends React.Component {
  render () {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.toolbar} />
        {children}
      </div>
    );
  }
}
export default withStyles(styles)(Component);
