import { combineReducers } from 'redux';
import workCreate from './workCreate/reducer';
import workRemove from './workRemove/reducer';
import workUpdate from './workUpdate/reducer';

export default combineReducers({
  workCreate,
  workRemove,
  workUpdate,
});
