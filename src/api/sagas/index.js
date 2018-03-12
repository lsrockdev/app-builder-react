import {all} from 'redux-saga/effects'
import auth from './auth'
import document from './document'
import builder from './builder';

export default function* rootSaga() {
  yield all([auth(), document(), builder()])
}
