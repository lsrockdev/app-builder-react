import { takeLatest, takeEvery, call } from 'redux-saga/effects';
import {
  GET_DOCUMENTS,
  GET_DOCUMENT,
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  SEARCH_DOCUMENT,
  UPDATE_SETTINGS,
  IMPORT_FIELDS,
  EXPORT_FIELDS,
  EXPORT_DOCUMENT,
} from 'api/modules/document';

import request from 'utils/request';
// import { exportDocument } from '../modules/document';

const getDocuments = request({
  type: GET_DOCUMENTS,
  method: 'GET',
  url: 'my/documents',
});

const getDocument = function* (action) {
  const apiRequest = request({
    type: GET_DOCUMENT,
    method: 'GET',
    url: 'document/' + action.payload.id,
  });
  yield call(apiRequest, action.payload);
}

const createDocument = request({
  type: CREATE_DOCUMENT,
  method: 'POST',
  url: 'document',
});

const updateDocument = request({
  type: UPDATE_DOCUMENT,
  method: 'PUT',
  url: 'document'
});

const deleteDocument = function* (action) {
  const apiRequest = request({
    type: DELETE_DOCUMENT,
    method: 'DELETE',
    url: 'document/' + action.payload.id,
    success: action.payload.success
  });
  yield call(apiRequest, action.payload)
};

const searchDocument = function* (action) {
  const apiRequest = request({
    type: SEARCH_DOCUMENT,
    method: 'GET',
    url: 'my/documents/' + action.payload.searchValue,
  });
  yield call(apiRequest, action.payload)
};

const updateSettings = function* (action) {
  const apiRequest = request({
    type: UPDATE_SETTINGS,
    method: 'PUT',
    url: 'document/' + action.payload.id + '/settings',
  });
  yield call(apiRequest, action);
};

const importFields = function* (action) {
  const data = new FormData();
  const apiRequest = request({
    type: IMPORT_FIELDS,
    method: 'POST',
    url: 'autofill/import/' + action.payload.id,
  });

  data.append('file', action.payload.file);
  
  yield call(apiRequest, { ...action, payload: { ...action.payload, body: data }});
};

const exportFields = function* (action) {
  const token = JSON.parse(localStorage.getItem('token'))
  const apiRequest = request({
    type: EXPORT_FIELDS,
    method: 'GET',
    url: `autofill/export?token=${token}`,
  });
  yield call(apiRequest, action.payload);
};

const exportDocument = function* (action) {
  const token = JSON.parse(localStorage.getItem('token'))
  const apiRequest = request({
    type: EXPORT_DOCUMENT,
    method: 'GET',
    url: `export/document/${action.payload.format}?token=${token}`,
  });
  yield call(apiRequest, action.payload);
};

export default function* rootSaga() {
  yield takeLatest(GET_DOCUMENTS, getDocuments);
  yield takeLatest(GET_DOCUMENT, getDocument);
  yield takeLatest(SEARCH_DOCUMENT, searchDocument);
  yield takeEvery(CREATE_DOCUMENT, createDocument);
  yield takeEvery(UPDATE_DOCUMENT, updateDocument);
  yield takeEvery(DELETE_DOCUMENT, deleteDocument);
  yield takeEvery(UPDATE_SETTINGS, updateSettings);
  yield takeEvery(IMPORT_FIELDS, importFields);
  yield takeEvery(EXPORT_FIELDS, exportFields);
  yield takeEvery(EXPORT_DOCUMENT, exportDocument);
}
