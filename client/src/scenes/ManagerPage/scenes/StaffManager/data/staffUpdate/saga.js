import {
  actions,
  staffUpdate,
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) {
    yield put(staffList.request());
    yield put(staffUpdate.success(params, response));
  }
  else yield put(staffUpdate.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
