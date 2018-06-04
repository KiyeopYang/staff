import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Text from '@material-ui/core/Typography';
import IconShop from '@material-ui/icons/AccountCircle';
import IconHelp from '@material-ui/icons/HelpOutline';
import IconFranchisee from '@material-ui/icons/Home';
import classNames from 'classnames';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Loader from '../../../../components/Loader';

const styles = theme => ({
  root: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 2,
    width: '100%',
    minWidth: 1000,
  },
  leftOfToolbar: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    minHeight: 64,
    borderBottom: '1px solid #efefed',
    background: 'white',
  },
  verticalLine: {
    height: 40,
    borderLeft: '1px solid #efefed',
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  editorTitle: {
    marginLeft: theme.spacing.unit * 3,
    fontSize: 28,
    display: 'inline-block',
  },
  shopText: {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  shop: {
    height: '100%',
    marginRight: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButton: {
    fontSize: 18,
    borderRadius: 0,
    width: 180,
    height: '100%',
  },
  rightOfToolbar: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    marginLeft: theme.spacing.unit * 3,
  },
  icon: {
    marginRight: theme.spacing.unit,
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
      loading,
      handleClick,
      shop,
      editorMode,
      disabled,
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        { loading ? <Loader/> : null }
        <div className={classes.toolbar}>
          <div className={classes.leftOfToolbar}>
            <Text className={classes.editorTitle}>
              <strong>출퇴근 관리 시스템</strong>
            </Text>
          </div>
          <div className={classes.rightOfToolbar}>
            <div className={classes.shop}>
              <Text
                className={classes.shopText}
                aria-owns={anchorEl ? 'shop-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <IconShop className={classes.icon}/>{shop.userId}
              </Text>
            </div>
          </div>
        </div>
        <Menu
          id="shop-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose()}
        >
          <MenuItem onClick={() => this.handleClose('logout')}>로그아웃</MenuItem>
        </Menu>
      </div>
    );
  }
}
export default withStyles(styles)(Component);
