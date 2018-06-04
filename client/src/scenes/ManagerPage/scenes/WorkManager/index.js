import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '../../components/Table';
import {
  shopList,
} from '../../data/shopList/actions';
import {
  staffList,
} from '../../data/staffList/actions';
import {
  workList,
} from '../../data/workList/actions';
import {
  workCreate,
} from './data/workCreate/actions';
import {
  workRemove,
} from './data/workRemove/actions';
import {
  workUpdate,
} from './data/workUpdate/actions';
import Loader from '../../../../components/Loader';
import Error from '../../../../components/Error';
import FormDialog from './components/FormDialog';
import Calendar from './components/Calendar';

const initialState = {
  formDialogOn: false,
  selectedRow: null,
};
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      selectedShop: this.props.auth.response.id,
    };
    this.props.requestShopList();
    this.props.requestStaffList();
    this.props.requestWorkList();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.workList.loading) {
      this.setState(initialState);
    }
  }
  handleWorkClick = (input) => {
    this.setState({
      formDialogOn: true,
      selectedRow: this.props.workList.response.find(o => String(o.id) === String(input.id)),
    });
  };
  handleTableMenuClick = (name, data) => {
    switch(name) {
      case 'create': this.setState({
          formDialogOn: true,
          selectedRow: null,
        });
        break;
      case 'remove':
        this.props.requestWorkRemove(data);
      default:
        break;
    }
  };
  handleFormSubmit = (input) => {
    const { mode } = input;
    console.log('input', input)
    if (mode === 'create') {
      this.props.requestWorkCreate(input);
    } else if (mode === 'update') {
      this.props.requestWorkUpdate(input);
    } else if (mode === 'remove') {
      this.props.requestWorkRemove([input.id]);
    }
  };
  render() {
    const { formDialogOn, selectedRow, selectedShop } = this.state;
    const { workList, shopList, staffList } = this.props;
    return (
      <React.Fragment>
        {
          workList.loading || workRemove.loading ?
            <Loader/> :
          workList.response ?
            <React.Fragment>
              <FormControl>
                <InputLabel htmlFor="shop-simple">매장</InputLabel>
                <Select
                  value={selectedShop}
                  onChange={e => this.setState({
                    selectedShop: e.target.value,
                  })}
                  inputProps={{
                    name: 'shop',
                    id: 'shop-simple',
                  }}
                >
                  <MenuItem value="">
                    <em>선택</em>
                  </MenuItem>
                  {
                    shopList.response ?
                      shopList.response.map(shop => (
                        <MenuItem key={shop.id} value={shop.id}>{shop.name}</MenuItem>
                      )) : null
                  }
                </Select>
              </FormControl>
              <Calendar
                events={workList.response.filter(work => work.staff.shopId === selectedShop).map(work => ({
                  id: work.id,
                  title: work.staff.name,
                  start: new Date(work.datetime),
                  end: new Date(work.endDatetime),
                  ...work
                }))}
                onSelectEvent={this.handleWorkClick}
                onSelectSlot={console.log}
              />
            </React.Fragment>: <Error/>
        }
        <FormDialog
          title={"업무"}
          loading={workCreate.loading || workUpdate.loading}
          open={formDialogOn}
          onClose={() => this.setState({
            formDialogOn: false,
          })}
          selected={selectedRow}
          handleSubmit={this.handleFormSubmit}
          staffList={staffList.response ? staffList.response.filter(staff => staff.shopId === selectedShop) : []}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  shopList: state.ManagerPage.data.shopList,
  staffList: state.ManagerPage.data.staffList,
  workList: state.ManagerPage.data.workList,
  workCreate: state.ManagerPage.WorkManager.data.workCreate,
  workRemove: state.ManagerPage.WorkManager.data.workRemove,
  workUpdate: state.ManagerPage.WorkManager.data.workUpdate,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  requestWorkList: workList.request,
  requestWorkCreate: workCreate.request,
  requestWorkRemove: workRemove.request,
  requestWorkUpdate: workUpdate.request,
  requestShopList: shopList.request,
  requestStaffList: staffList.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
