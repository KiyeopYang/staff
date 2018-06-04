import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from 'material-ui/Typography';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: '40px 0px',
    width: '100%',
    background: theme.palette.primary.main,
  },
  img: {
    width: 150,
  },
});
class Component extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <img className={classes.img} src="/logo.svg" />
      </div>
    );
  }
}
export default withStyles(styles)(Component);
