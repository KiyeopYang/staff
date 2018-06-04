import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from './data/reducer';
import Camera from './scenes/Camera/reducer';
import LandingPage from './scenes/LandingPage/reducer';
import ManagerPage from './scenes/ManagerPage/reducer';

export default combineReducers({
  routing: routerReducer,
  data,
  Camera,
  LandingPage,
  ManagerPage,
});
