import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';
import QrReader from 'react-qr-reader'

const styles = {};
class Component extends React.Component {
  render () {
    const {
      ...rest,
    } = this.props;
    return (
        <QrReader
          {...rest}
          delay={500}
          style={{ width: '100%' }}
        />
    );
  }
}
export default withStyles(styles)(Component);
