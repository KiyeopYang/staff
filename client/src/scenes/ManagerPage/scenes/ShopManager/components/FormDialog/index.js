import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Dialog from '../../../../../../components/Dialog';
import Loader from '../../../../../../components/Loader';

const initState = {
  mode: 'create',
  id: '',
  userId: '',
  password: '',
  name: '',
  isAdmin: false,
};
const styles = theme => ({
  layout: {
    padding: theme.spacing.unit * 3,
  },
  select: {},
  field: {
    marginBottom: theme.spacing.unit,
  },
});
class Component extends React.Component {
  state = initState;
  componentWillReceiveProps(nextProps) {
    if (!nextProps.selected) {
      this.setState(initState);
    } else {
      const prevRow = JSON.stringify(this.props.selected);
      const nextRow = JSON.stringify(nextProps.selected);
      if (prevRow !== nextRow) {
        const {
          id,
          userId,
          name,
          password,
          isAdmin,
        } = nextProps.selected;
        this.setState({
          id,
          mode: 'update',
          userId,
          password,
          name,
          isAdmin,
        });
      }
    }
  }
  handleChange = name => e => this.setState({
    [name]: e.target.value,
  });
  handleSubmit = () => {
    this.props.handleSubmit(this.state);
  };
  isDisabled = () => {
    const { userId, password, name } = this.state;
    if (userId === '' || password.length < 8 || name === '') {
      return true;
    }
    return false;
  };
  render () {
    const {
      userId,
      password,
      name,
      isAdmin,
    } = this.state;
    const { classes, loading, disabled, ...props } = this.props;
    return (
      <Dialog
        onSubmit={this.handleSubmit}
        disabled={disabled || this.isDisabled()}
        {...props}
      >
        {loading ? <Loader/> : null}
        <div className={classes.layout}>
          <TextField
            className={classes.field}
            label="ID"
            fullWidth
            value={userId}
            onChange={this.handleChange('userId')}
          />
          <TextField
            className={classes.field}
            label={"비밀번호"}
            fullWidth
            value={password}
            helperText={"8자 이상"}
            onChange={this.handleChange('password')}
          />
          <TextField
            className={classes.field}
            label={"이름"}
            fullWidth
            value={name}
            onChange={this.handleChange('name')}
          />
          <FormControlLabel
            control={
              <Switch
                checked={isAdmin}
                onChange={e => this.setState({ isAdmin: e.target.checked })}
                value="isAdmin"
                color="primary"
              />
            }
            label="관리자"
          />
        </div>
      </Dialog>
    );
  }
}
export default withStyles(styles)(Component);
