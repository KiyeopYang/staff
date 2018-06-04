import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  layout: {
    display: 'flex',
  },
  control: {
    flex: 1,
  },
});
class Component extends React.Component {
  state = {
    anchorEl: null,
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = (name) => {
    this.setState({ anchorEl: null });
    if (name) this.props.handleClick(name);
  };
  render () {
    const {
      classes,
      handleFacingMode,
      facingMode,
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <div className={classes.layout}>
          <div className={classes.control}>
            <FormControlLabel
              control={
                <Switch
                  checked={facingMode}
                  onChange={e => handleFacingMode(e.target.checked)}
                  value="facingMode"
                  color="secondary"
                />
              }
              label="카메라 변경"
            />
          </div>
          <IconButton
            onClick={this.handleClick}
          >
            <MenuIcon/>
          </IconButton>
        </div>
        <Menu
          id="qr-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose()}
        >
          <MenuItem onClick={() => this.handleClose('managerPage')}>관리 페이지</MenuItem>
          <MenuItem onClick={() => this.handleClose('logout')}>로그아웃</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Component);
