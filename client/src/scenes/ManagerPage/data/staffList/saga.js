import {
  actions,
  staffList,
} from './actions';
import request from '../../../../modules/request';

import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    '/api/staff/list',
  );
  if (response) yield put(staffList.success(params, response));
  else yield put(staffList.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
