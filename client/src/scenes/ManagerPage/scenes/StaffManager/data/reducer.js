import { combineReducers } from 'redux';
import staffCreate from './staffCreate/reducer';
import staffRemove from './staffRemove/reducer';
import staffUpdate from './staffUpdate/reducer';

export default combineReducers({
  staffCreate,
  staffRemove,
  staffUpdate,
});
