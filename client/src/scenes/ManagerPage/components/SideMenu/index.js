import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import WorkIcon from '@material-ui/icons/Assessment';
import ShopIcon from '@material-ui/icons/Place';
import StaffIcon from '@material-ui/icons/AccountCircle';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import classNames from 'classnames';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    background: theme.palette.primary.main,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: {
    minHeight: 64,
  },
  listItemContent: {
    color: theme.palette.primary.contrastText,
  },
  listItem: {
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  selected: {
    background: theme.palette.primary.dark,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});
class Component extends React.Component {
  render () {
    const { classes, translate, type, selected, handleClick } = this.props;
    console.log(selected);
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List className={classes.list}>
          <ListItem
            className={classNames(classes.listItem, { [classes.selected]: selected === 'shop' })}
            button
            onClick={() => handleClick('shop')}
          >
            <ListItemIcon>
              <ShopIcon className={classes.listItemContent}/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemContent }} primary="매장"/>
          </ListItem>
          <ListItem
            className={classNames(classes.listItem, { [classes.selected]: selected === 'staff' })}
            button
            onClick={() => handleClick('staff')}
          >
            <ListItemIcon>
              <StaffIcon className={classes.listItemContent}/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemContent }} primary="직원"/>
          </ListItem>
          <ListItem
            className={classNames(classes.listItem, { [classes.selected]: selected === 'work' })}
            button
            onClick={() => handleClick('work')}
          >
            <ListItemIcon>
              <WorkIcon className={classes.listItemContent}/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemContent }} primary="출퇴근"/>
          </ListItem>
          <ListItem
            className={classNames(classes.listItem, { [classes.selected]: selected === 'camera' })}
            button
            onClick={() => handleClick('camera')}
          >
            <ListItemIcon>
              <CameraIcon className={classes.listItemContent}/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemContent }} primary="카메라"/>
          </ListItem>
        </List>
      </Drawer>
    );
  }
}
export default withStyles(styles)(Component);
