import { combineReducers } from 'redux';
import shopList from './shopList/reducer';
import staffList from './staffList/reducer';
import workList from './workList/reducer';

export default combineReducers({
  shopList,
  staffList,
  workList,
});
