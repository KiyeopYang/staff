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
  shopCreate,
} from './data/shopCreate/actions';
import {
  shopRemove,
} from './data/shopRemove/actions';
import {
  shopUpdate,
} from './data/shopUpdate/actions';
import Loader from '../../../../components/Loader';
import Error from '../../../../components/Error';
import FormDialog from './components/FormDialog';

const initialState = {
  formDialogOn: false,
  selectedRow: null,
};
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.requestShopList();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.shopList.loading) {
      this.setState(initialState);
    }
  }
  handleTableRowClick = (input) => {
    this.setState({
      formDialogOn: true,
      selectedRow: this.props.shopList.response.find(o => o.id === input),
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
        this.props.requestShopRemove(data);
      default:
        break;
    }
  };
  handleFormSubmit = (input) => {
    const { mode } = input;
    if (mode === 'create') {
      this.props.requestShopCreate(input);
    } else if (mode === 'update') {
      this.props.requestShopUpdate(input);
    }
  };
  render() {
    const { formDialogOn, selectedRow } = this.state;
    const { shopList } = this.props;
    return (
      <React.Fragment>
        {
          shopList.loading || shopRemove.loading ?
            <Loader/> :
          shopList.response ?
            <Table
              title="매장"
              data={shopList.response}
              handleRowClick={this.handleTableRowClick}
              handleMenuClick={this.handleTableMenuClick}
              columnData={[
                { id: 'userId', numeric: false, disablePadding: false, label: 'ID' },
                { id: 'name', numeric: false, disablePadding: false, label: "이름"},
              ]}
            /> :
            <Error/>
        }
        <FormDialog
          title={selectedRow ? "수정":"삭제"}
          loading={shopCreate.loading || shopUpdate.loading}
          open={formDialogOn}
          onClose={() => this.setState({
            formDialogOn: false,
          })}
          selected={selectedRow}
          handleSubmit={this.handleFormSubmit}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  shopList: state.ManagerPage.data.shopList,
  shopCreate: state.ManagerPage.ShopManager.data.shopCreate,
  shopRemove: state.ManagerPage.ShopManager.data.shopRemove,
  shopUpdate: state.ManagerPage.ShopManager.data.shopUpdate,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  requestShopList: shopList.request,
  requestShopCreate: shopCreate.request,
  requestShopRemove: shopRemove.request,
  requestShopUpdate: shopUpdate.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
