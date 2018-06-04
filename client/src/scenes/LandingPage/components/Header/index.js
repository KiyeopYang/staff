import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    background: 'white',
    boxShadow: 'none',
  },
  button: {
    color: 'black',
  },
};
class Component extends React.Component {
  render () {
    const { classes, handleClick } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <div className={classes.flex}>
            </div>
            <Button
              className={classes.button}
              onClick={() => handleClick('login')}
            >로그인</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(Component);
