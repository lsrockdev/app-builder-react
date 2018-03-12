import {takeLatest, takeEvery, call} from 'redux-saga/effects';

import {
  ADD_SECTION,
  UPDATE_SECTION,
  DELETE_SECTION,
  MOVE_UP_SECTION,
  MOVE_DOWN_SECTION,
  GET_DOCUMENT
} from "../modules/builder";

import request from 'utils/request';

const getDocument = function* (action) {
  const apiRequest = request({
    type: GET_DOCUMENT,
    method: 'GET',
    url: '/document/' + action.id,
  });
  yield call(apiRequest, action.id)
};

const addSection = request({
  type: ADD_SECTION,
  method: 'POST',
  url: 'selection',
});

const updateSection = request({
  type: UPDATE_SECTION,
  method: 'PUT',
  url: 'selection',
});

const deleteSection = function* (action) {
  const apiRequest = request({
    type: DELETE_SECTION,
    method: 'DELETE',
    url: '/selection/' + action.payload.documentId + '/' + action.payload.sectionId,
  });
  yield call(apiRequest, action.payload)
};

const moveUpSection = function* (action) {
  const apiRequest = request({
    type: MOVE_UP_SECTION,
    method: 'POST',
    url: '/move/selection/' + action.payload.documentId + '/' + action.payload.sectionId + '/up',
  });
  yield call(apiRequest, action.payload)
};

const moveDownSection = function* (action) {
  const apiRequest = request({
    type: MOVE_DOWN_SECTION,
    method: 'POST',
    url: '/move/selection/' + action.payload.documentId + '/' + action.payload.sectionId + '/down',
  });
  yield call(apiRequest, action.payload)
};

export default function* rootSaga() {
  yield takeLatest(GET_DOCUMENT, getDocument);
  yield takeEvery(ADD_SECTION, addSection);
  yield takeEvery(UPDATE_SECTION, updateSection);
  yield takeEvery(DELETE_SECTION, deleteSection);
  yield takeEvery(MOVE_UP_SECTION, moveUpSection);
  yield takeEvery(MOVE_DOWN_SECTION, moveDownSection);
}
