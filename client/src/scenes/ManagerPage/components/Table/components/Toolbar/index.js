import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Add';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Text from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  },
});
const Component = props => {
  const { disabled, numSelected, classes, title, handleMenuClick } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Text color="inherit" variant="subheading">
            {numSelected}개 선택
          </Text>
        ) : (
          <Text variant="title">{title}</Text>
        )}
      </div>
      <div className={classes.spacer} />
      {
        disabled ? null :
          <div className={classes.actions}>
            {numSelected > 0 ?
              <IconButton
                disabled={numSelected < 1}
                aria-label="Delete"
                onClick={() => handleMenuClick('remove')}
              >
                <DeleteIcon />
              </IconButton>
              :
              <IconButton
                disabled={numSelected > 0}
                aria-label="Create"
                onClick={() => handleMenuClick('create')}
              >
                <CreateIcon />
              </IconButton>
            }
          </div>
      }
    </Toolbar>
  );
};
export default withStyles(styles)(Component);
