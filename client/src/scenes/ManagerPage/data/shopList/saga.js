import {
  actions,
  shopList,
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
    '/api/shop/list',
  );
  if (response) yield put(shopList.success(params, response));
  else yield put(shopList.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
