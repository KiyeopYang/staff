import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';

const styles = {
  title: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  texts: {
    textAlign: 'center',
    margin: 'auto',
  },
};
class Component extends React.Component {
  render () {
    const { classes, response, shop, handleClick } = this.props;
    const { work, staff } = response;
    return (
      <div>
        {
          staff ?
            <React.Fragment>
              <Text className={classes.title} variant="display4" align="center" gutterBottom>{work ? '퇴근':'출근'}</Text>
              <div className={classes.texts}>
                <Text variant="subheading" gutterBottom>
                  이름: {staff.name}
                </Text>
                <Text variant="subheading" gutterBottom>
                  근무 매장: {shop.name}
                </Text>
                <Text variant="subheading" gutterBottom>
                  출근 시각: {
                    dayjs(work ? new Date(work.datetime) : undefined)
                      .format('YYYY-MM-DD HH:mm:ss')
                  }
                </Text>
                {
                  work ?
                    <Text variant="subheading" gutterBottom>
                      퇴근 시각: {
                      dayjs()
                        .format('YYYY-MM-DD HH:mm:ss')
                    }
                    </Text> : null
                }
              </div>
              <Button
                size="large"
                variant="raised"
                fullWidth
                color='primary'
                onClick={() => handleClick(work ? 'end':'start', { ...response, shop })}
              >확인</Button>
            </React.Fragment> :
            <Text>
              인식 불가
            </Text>
        }
        <Button size="large" fullWidth onClick={() => handleClick('recapture')}>재촬영</Button>
      </div>
    );
  }
}
export default withStyles(styles)(Component);
