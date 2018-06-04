import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Text from '@material-ui/core/Typography';

const styles = theme => ({
  title: {
    background: theme.palette.primary.main,
    padding: theme.spacing.unit * 2,
  },
  titleText: {
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
});
class Component extends React.Component {
  render() {
    const {
      classes,
      open,
      onClose,
      onSubmit,
      onRemove,
      children,
      fullScreen,
      title,
      translate,
      disabled,
    } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        aria-labelledby="dialog"
        aria-describedby="dialog_description"
        open={open}
        onClose={onClose}
      >
        <DialogTitle
          className={classes.title}
        >
          <Text className={classes.titleText}>
            {title}
          </Text>
        </DialogTitle>
        { children }
        <DialogActions>
          {
            onSubmit ?
              <Button
                disabled={disabled}
                color="primary"
                onClick={onSubmit}
                size="large"
              >
                확인
              </Button> : null
          }
          {
            onRemove ?
              <Button
                disabled={disabled}
                color="primary"
                onClick={onRemove}
                size="large"
              >
                삭제
              </Button> : null
          }
          <Button
            color="primary"
            onClick={onClose}
            size="large"
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default withMobileDialog()(withStyles(styles)(Component));
