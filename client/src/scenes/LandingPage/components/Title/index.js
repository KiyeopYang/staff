import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';

const styles = theme => ({
  textWrapper: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 10,

  },
  headline: {
    fontSize: 40,
    marginBottom: theme.spacing.unit * 8,
  },
  subheading: {
    fontSize: 20,
  },
  imgWrapper: {
    padding: 24,
  },
  img: {
    width: '100%',
    height: 'auto',
  },
});
class Component extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.textWrapper}>
          <Text className={classes.headline}>
            <strong>출퇴근 관리 시스템</strong>
          </Text>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Component);
