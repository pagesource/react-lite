import { all, takeLatest, call, put } from 'redux-saga/effects';
import API_URLS from '../../constants/api/services';
import API from '../../utils/fetch';
import { GET_APPLICATION_LABELS } from '../constants';
import { setApplicationLabels } from '../actions';

export function* getApplicationLabels() {
  try {
    const data = yield call(API.fetch, API_URLS.labels);
    yield put(setApplicationLabels(data));
  } catch (err) {
    yield put(setApplicationLabels({}));
  }
}

export default function* globalSaga() {
  yield all([takeLatest(GET_APPLICATION_LABELS, getApplicationLabels)]);
}
