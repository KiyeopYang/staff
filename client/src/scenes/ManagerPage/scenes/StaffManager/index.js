import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import QRCode from 'qrcode.react';
import Table from '../../components/Table';
import {
  staffList,
} from '../../data/staffList/actions';
import {
  staffCreate,
} from './data/staffCreate/actions';
import {
  staffRemove,
} from './data/staffRemove/actions';
import {
  staffUpdate,
} from './data/staffUpdate/actions';
import {
  shopList,
} from '../../data/shopList/actions';
import Loader from '../../../../components/Loader';
import Error from '../../../../components/Error';
import FormDialog from './components/FormDialog';
import QR from './components/QR';

const initialState = {
  formDialogOn: false,
  selectedRow: null,
};
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.requestStaffList();
    this.props.requestShopList();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.staffList.loading) {
      this.setState(initialState);
    }
  }
  handleTableRowClick = (input) => {
    this.setState({
      formDialogOn: true,
      selectedRow: this.props.staffList.response.find(o => o.id === input),
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
        this.props.requestStaffRemove(data);
      default:
        break;
    }
  };
  handleFormSubmit = (input) => {
    const { mode } = input;
    if (mode === 'create') {
      this.props.requestStaffCreate(input);
    } else if (mode === 'update') {
      this.props.requestStaffUpdate(input);
    }
  };
  render() {
    const { formDialogOn, selectedRow } = this.state;
    const { staffList, shopList, auth } = this.props;
    return (
      <React.Fragment>
        {
          staffList.loading || staffRemove.loading ?
            <Loader/> :
          staffList.response ?
            <Table
              disabled={!auth.response.isAdmin}
              title="직원"
              data={staffList.response.map((staff) => {
                return {
                  ...staff,
                  shopName: staff.shop ? staff.shop.name : '',
                  qr: <QR value={staff.id}/>
                };
              })}
              handleRowClick={this.handleTableRowClick}
              handleMenuClick={this.handleTableMenuClick}
              columnData={[
                { id: 'name', numeric: false, disablePadding: false, label: "이름"},
                { id: 'phone', numeric: false, disablePadding: false, label: "전화번호"},
                { id: 'shopName', numeric: false, disablePadding: false, label: "매장 이름"},
                { id: 'qr', numeric: false, disablePadding: false, label: 'QR' },
              ]}
            /> :
            <Error/>
        }
        <FormDialog
          disabled={!auth.response.isAdmin}
          title={selectedRow ? "수정" : "생성"}
          loading={staffCreate.loading || staffUpdate.loading}
          open={formDialogOn}
          onClose={() => this.setState({
            formDialogOn: false,
          })}
          selected={selectedRow}
          handleSubmit={this.handleFormSubmit}
          shopList={shopList.response || []}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  staffList: state.ManagerPage.data.staffList,
  staffCreate: state.ManagerPage.StaffManager.data.staffCreate,
  staffRemove: state.ManagerPage.StaffManager.data.staffRemove,
  staffUpdate: state.ManagerPage.StaffManager.data.staffUpdate,
  shopList: state.ManagerPage.data.shopList,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  requestStaffList: staffList.request,
  requestStaffCreate: staffCreate.request,
  requestStaffRemove: staffRemove.request,
  requestStaffUpdate: staffUpdate.request,
  requestShopList: shopList.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
