import {
  actions,
  workCreate,
} from './actions';
import {
  workList,
} from '../../../../data/workList/actions';
import request from '../../../../../../modules/request';
import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    '/api/work',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) {
    yield put(workList.request());
    yield put(workCreate.success(params, response));
  }
  else yield put(workCreate.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
