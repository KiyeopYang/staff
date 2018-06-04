import { combineReducers } from 'redux';
import shopCreate from './shopCreate/reducer';
import shopRemove from './shopRemove/reducer';
import shopUpdate from './shopUpdate/reducer';

export default combineReducers({
  shopCreate,
  shopRemove,
  shopUpdate,
});
