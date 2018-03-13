import { all } from 'redux-saga/effects';
import auth from './auth';
import template from './template';
import mainDocument from './document';

export default function* rootSaga() {
  yield all([auth(), template(), mainDocument()]);
}
