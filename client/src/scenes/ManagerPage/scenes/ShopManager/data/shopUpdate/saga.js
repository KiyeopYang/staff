import {
  actions,
  shopUpdate,
} from './actions';
import {
  shopList,
} from '../../../../data/shopList/actions';
import request from '../../../../../../modules/request';
import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    '/api/shop',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) {
    yield put(shopList.request());
    yield put(shopUpdate.success(params, response));
  }
  else yield put(shopUpdate.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
