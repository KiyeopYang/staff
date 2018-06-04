import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
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
import Layout from './components/Layout';
import HeaderMenu from './components/HeaderMenu';
import makeExcel from './modules/makeExcel';

const initialState = {
  formDialogOn: false,
  selectedRow: null,
  selectedDate: null,
};
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      selectedShop: this.props.auth.response,
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
  handleDateClick = ({ start }) => {
    this.setState({
      formDialogOn: true,
      selectedRow: null,
      selectedDate: new Date(start),
    });
  };
  handleHeaderMenuClick = (name, data) => {
    switch(name) {
      case 'shopSelect': this.setState({
          selectedShop: data,
        });
        break;
      case 'excel':
        makeExcel(this.props.workList.response);
      default:
        break;
    }
  };
  handleFormSubmit = (input) => {
    const { mode } = input;
    const { selectedShop } = this.state;
    if (mode === 'create') {
      this.props.requestWorkCreate({
        ...input,
        shop: selectedShop,
      });
    } else if (mode === 'update') {
      this.props.requestWorkUpdate({
        ...input,
        shop: selectedShop,
      });
    } else if (mode === 'remove') {
      this.props.requestWorkRemove([input.id]);
    }
  };
  render() {
    const { formDialogOn, selectedRow, selectedShop, selectedDate } = this.state;
    const { workList, shopList, staffList, auth } = this.props;
    return (
      <React.Fragment>
        {
          workList.loading || workRemove.loading ?
            <Loader/> :
          workList.response ?
            <Layout>
              <HeaderMenu
                selectedShop={selectedShop}
                shopList={shopList.response || []}
                handleHeaderMenuClick={this.handleHeaderMenuClick}
              />
              {
                selectedShop ?
                  <Calendar
                    events={workList.response.filter(work => work.shop.id === selectedShop.id).map(work => ({
                      id: work.id,
                      title: work.staff.name,
                      start: new Date(work.datetime),
                      end: new Date(work.endDatetime),
                      ...work
                    }))}
                    onSelectEvent={this.handleWorkClick}
                    onSelectSlot={this.handleDateClick}
                  /> : null
              }
            </Layout>:<Error/>
        }
        <FormDialog
          disabled={!auth.response.isAdmin}
          title={"업무"}
          loading={workCreate.loading || workUpdate.loading}
          open={formDialogOn}
          onClose={() => this.setState({
            formDialogOn: false,
          })}
          selected={selectedRow}
          selectedDate={selectedDate}
          handleSubmit={this.handleFormSubmit}
          staffList={staffList.response ? staffList.response : []} //여기부터
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
