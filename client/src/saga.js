import {
  all,
} from 'redux-saga/effects';
import saga from './data/saga';
import Camera from './scenes/Camera/saga';
import LandingPage from './scenes/LandingPage/saga';
import ManagerPage from './scenes/ManagerPage/saga';

export default function* rootSaga() {
  yield all([
    ...saga,
    ...Camera,
    ...LandingPage,
    ...ManagerPage,
  ]);
}
