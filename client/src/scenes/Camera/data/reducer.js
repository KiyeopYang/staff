import { combineReducers } from 'redux';
import getWork from './getWork/reducer';
import startWork from './startWork/reducer';
import endWork from './endWork/reducer';

export default combineReducers({
  getWork,
  startWork,
  endWork,
});
