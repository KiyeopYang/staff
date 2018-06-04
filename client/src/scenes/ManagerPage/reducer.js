import { combineReducers } from 'redux';
import data from './data/reducer';
import ShopManager from './scenes/ShopManager/reducer';
import StaffManager from './scenes/StaffManager/reducer';
import WorkManager from './scenes/WorkManager/reducer';

export default combineReducers({
  data,
  ShopManager,
  StaffManager,
  WorkManager,
});
