import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import qrcode from 'qrcode';

const styles = {};
class Component extends React.Component {
  componentDidMount() {
    qrcode.toCanvas(this.refs.canvas, this.props.value);
  }
  render () {
    return (
      <canvas
        ref="canvas"
        width={400}
        height={400}
      />
    );
  }
}
export default withStyles(styles)(Component);
