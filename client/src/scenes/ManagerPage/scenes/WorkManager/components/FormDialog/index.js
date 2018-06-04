import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import dayjs from 'dayjs';
import Dialog from '../../../../../../components/Dialog';
import Loader from '../../../../../../components/Loader';

function parseDatetime(date) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm')
}
const initState = {
  mode: 'create',
  id: '',
  staff: null,
  datetime: new Date(),
  endDatetime: new Date(),
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
      const { selectedDate } = nextProps;
      this.setState({
        mode: 'create',
        id: '',
        staff: null,
        datetime: selectedDate,
        endDatetime: selectedDate,
      });
    } else {
      const prevRow = JSON.stringify(this.props.selected);
      const nextRow = JSON.stringify(nextProps.selected);
      if (prevRow !== nextRow) {
        const {
          id,
          staff,
          datetime,
          endDatetime,
        } = nextProps.selected;
        this.setState({
          id,
          mode: 'update',
          staff,
          datetime,
          endDatetime,
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
  handleRemove = () => {
    this.props.handleSubmit({...this.state, mode: 'remove'});
  };
  isDisabled = () => {
    console.log(this.state.staff);
    if (!this.state.staff || this.state.staff.id === '') {
      return true;
    }
    return false;
  };
  render () {
    const {
      staff,
      datetime,
      endDatetime,
      mode,
    } = this.state;
    const { classes, loading, staffList, disabled, ...props } = this.props;
    return (
      <Dialog
        title={"title"}
        onSubmit={this.handleSubmit}
        onRemove={mode !== 'create' ? this.handleRemove:null}
        disabled={disabled || this.isDisabled()}
        {...props}
      >
        {loading ? <Loader/> : null}
        <div className={classes.layout}>
          <FormControl fullWidth>
            <InputLabel htmlFor="staff-simple">직원</InputLabel>
            <Select
              value={staff ? staff.id : ""}
              onChange={e => this.setState({
                staff: staffList.find(staff => staff.id === e.target.value),
              })}
              inputProps={{
                name: 'staff',
                id: 'staff-simple',
              }}
            >
              <MenuItem value="">
                <em>선택</em>
              </MenuItem>
              {
                staffList.map(staff => (
                  <MenuItem key={staff.id} value={staff.id}>{staff.name} - {staff.shop.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="datetime-local1"
            label="출근"
            type="datetime-local"
            defaultValue={parseDatetime(datetime)}
            onChange={this.handleChange('datetime')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="datetime-local2"
            label="퇴근"
            type="datetime-local"
            defaultValue={parseDatetime(endDatetime)}
            onChange={this.handleChange('endDatetime')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </Dialog>
    );
  }
}
export default withStyles(styles)(Component);
