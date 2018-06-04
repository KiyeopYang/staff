import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});
class Component extends React.Component {
  render () {
    const { classes, selectedShop, shopList, handleHeaderMenuClick } = this.props;
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="shop-simple">매장</InputLabel>
          <Select
            value={selectedShop.id || ""}
            onChange={e =>
              handleHeaderMenuClick('shopSelect', shopList.find(
                shop => shop.id === e.target.value,
              ))
            }
            inputProps={{
              name: 'shop',
              id: 'shop-simple',
            }}
          >
            <MenuItem value="">
              <em>선택</em>
            </MenuItem>
            {
              shopList.map(shop => (
                <MenuItem key={shop.id} value={shop.id}>{shop.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Button onClick={() => handleHeaderMenuClick('excel')} variant="outlined" size="small" className={classes.button}>
          <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          Excel
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(Component);
