import {
  actions,
  staffCreate,
} from './actions';
import {
  staffList,
} from '../../../../data/staffList/actions';
import request from '../../../../../../modules/request';
import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    '/api/staff',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) {
    yield put(staffList.request());
    yield put(staffCreate.success(params, response));
  }
  else yield put(staffCreate.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
