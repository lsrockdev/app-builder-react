import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import {
  GET_DOCUMENTS,
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
} from 'api/modules/document';

import request from 'utils/request';

const getDocuments = request({
  type: GET_DOCUMENTS,
  method: 'GET',
  url: 'my/documents',
});

const createDocument = request({
  type: CREATE_DOCUMENT,
  method: 'POST',
  url: 'document',
});

const updateDocument = request({
  type: CREATE_DOCUMENT,
  method: 'PUT',
  url: 'document'
});

const deleteDocument = request({
  type: CREATE_DOCUMENT,
  method: 'DELETE',
  url: 'document'
});

export default function* rootSaga() {
  yield takeLatest(GET_DOCUMENTS, getDocuments);
  yield takeEvery(CREATE_DOCUMENT, createDocument);
  yield takeEvery(UPDATE_DOCUMENT, updateDocument);
}
