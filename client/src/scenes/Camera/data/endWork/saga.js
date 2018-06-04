import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import {
  actions,
  endWork,
} from './actions';
import request from '../../../../modules/request';
import {
  showMessage,
} from '../../../../data/messageBar/actions';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    `/api/work/end`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  );
  if (response) {
    yield put(showMessage({ message: '퇴근 완료' }));
    yield put(endWork.success(params, response));
  }
  else yield put(endWork.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
