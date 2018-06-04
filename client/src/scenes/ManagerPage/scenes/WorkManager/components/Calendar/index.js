import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

let formats = {
  monthHeaderFormat: (date, culture, localizer) =>
    localizer.format(date, 'YYYY-MM', culture),
};
const styles = theme => ({
  layout: {
    paddingTop: theme.spacing.unit * 3,
    height: 700,
  },
});
class Component extends React.Component {
  render () {
    const { classes, events, ...rest } = this.props;
    return (
      <div className={classes.layout}>
        <BigCalendar
          selectable
          formats={formats}
          popup
          events={events}
          views={['month']}
          defaultDate={new Date()}
          {...rest}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Component);
