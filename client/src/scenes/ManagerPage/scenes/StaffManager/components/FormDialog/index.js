import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '../../../../../../components/Dialog';
import Loader from '../../../../../../components/Loader';

const initState = {
  mode: 'create',
  id: '',
  name: '',
  phone: '',
  shopId: '',
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
          name,
          phone,
          shopId,
        } = nextProps.selected;
        this.setState({
          id,
          mode: 'update',
          name,
          phone,
          shopId,
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
    const { name, shopId } = this.state;
    if (name === '' || shopId === '') {
      return true;
    }
    return false;
  };
  render () {
    const {
      name,
      phone,
      shopId,
    } = this.state;
    const { classes, loading, shopList, disabled, ...props } = this.props;
    return (
      <Dialog
        title={"생성"}
        onSubmit={this.handleSubmit}
        disabled={disabled || this.isDisabled()}
        {...props}
      >
        {loading ? <Loader/> : null}
        <div className={classes.layout}>
          <TextField
            className={classes.field}
            label={"이름"}
            fullWidth
            value={name}
            onChange={this.handleChange('name')}
          />
          <TextField
            className={classes.field}
            label={"전화번호"}
            fullWidth
            value={phone}
            onChange={this.handleChange('phone')}
          />
          <FormControl
            fullWidth
            className={classNames(classes.field, classes.select)}
          >
            <InputLabel htmlFor="shopId">근무 매장</InputLabel>
            <Select
              value={shopId}
              onChange={this.handleChange('shopId')}
              inputProps={{
                name: 'shopId',
                id: 'shopId',
              }}
            >
              <MenuItem value="">
                선택
              </MenuItem>
              {
                shopList.map(o => (
                  <MenuItem
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
      </Dialog>
    );
  }
}
Component.propTypes = {
  shopList: PropTypes.array,
};
export default withStyles(styles)(Component);
