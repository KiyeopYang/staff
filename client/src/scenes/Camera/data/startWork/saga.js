import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import {
  actions,
  startWork,
} from './actions';
import request from '../../../../modules/request';
import {
  showMessage,
} from '../../../../data/messageBar/actions';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    `/api/work`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  );
  if (response) {
    yield put(showMessage({ message: '출근 완료' }));
    yield put(startWork.success(params, response));
  }
  else yield put(startWork.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
