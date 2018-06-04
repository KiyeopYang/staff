import {
  actions,
  getWork,
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
    `/api/work/${params.staffId}`,
  );
  if (response) yield put(getWork.success(params, response));
  else yield put(getWork.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
