import {
  actions,
  workList,
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
    '/api/work/list',
  );
  if (response) yield put(workList.success(params, response));
  else yield put(workList.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
