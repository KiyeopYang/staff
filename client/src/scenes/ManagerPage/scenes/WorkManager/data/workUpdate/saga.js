import {
  actions,
  workUpdate,
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) {
    yield put(workList.request());
    yield put(workUpdate.success(params, response));
  }
  else yield put(workUpdate.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
