import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  center: {
    width: 400,
  },
  // [theme.breakpoints.up('md')]: {
  //   position: 'relative',
  // },
};
class Component extends React.Component {
  render () {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.center}>
          {children}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Component);
