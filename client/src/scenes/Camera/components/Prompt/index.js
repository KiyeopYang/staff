import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';

const styles = theme => ({
  layout: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  red: {
    color: 'red',
  },
  black: {
    color: 'black',
  },
});
class Component extends React.Component {
  render () {
    const { classes, error, loading } = this.props;
    return (
      <div className={classes.layout}>
        <Text
          variant="subheading"
          align="center"
          className={error ? classes.red:classes.black}
        >
          {
            error ?
              '다시 인식시켜주십시요.' :
            loading ?
              '인식 중' :
              'QR 코드를 인식시켜주십시요.'
          }
        </Text>
      </div>
    );
  }
}
export default withStyles(styles)(Component);
