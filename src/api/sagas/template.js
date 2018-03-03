import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_TEMPLATES,
  ADD_FOLDER,
  UPDATE_FOLDER,
  ADD_CONTENT,
  UPDATE_CONTENT,
  DELETE_TEMPLATE,
  OPEN_FOLDER
} from 'api/modules/template';
import request from 'utils/request';

const getTemplates = request({
  type: GET_TEMPLATES,
  method: 'GET',
  url: 'templates',
  payloadOnSuccess: (data, action) => {
    function getChildren(parentId) {
      const nodes = [];
      const items = data.filter(item => item.parentId === parentId);
      let node = items.filter(item => item.prevId === null)[0];
      while (node) {
        nodes.push(node);
        const children = getChildren(node.id);
        if (children.length) {
          node.children = children;
        }
        node = data.filter(item => item.id === node.nextId)[0];
      }
      return nodes;
    }
    return getChildren(null);
  }
});

function* addFolder(action) {
  yield call(
    request({
      type: ADD_FOLDER,
      method: 'POST',
      url: 'folder'
    }),
    action
  );
  yield call(getTemplates, { type: GET_TEMPLATES });

  const { parentId } = action.payload.body;
  if (parentId) {
    yield put({
      type: OPEN_FOLDER,
      payload: { id: parentId, open: true }
    });
  }
}

function* updateFolder(action) {
  yield call(
    request({
      type: UPDATE_FOLDER,
      method: 'PUT',
      url: `folder/${action.payload.id}`
    }),
    action
  );
  yield call(getTemplates, { type: GET_TEMPLATES });
}

function* addContent(action) {
  yield call(
    request({
      type: ADD_CONTENT,
      method: 'POST',
      url: 'template'
    }),
    action
  );
  yield call(getTemplates, { type: GET_TEMPLATES });

  const { parentTemplateId } = action.payload.body;
  if (parentTemplateId) {
    yield put({
      type: OPEN_FOLDER,
      payload: { id: parentTemplateId, open: true }
    });
  }
}

function* updateContent(action) {
  yield call(
    request({
      type: UPDATE_CONTENT,
      method: 'PUT',
      url: 'template'
    }),
    action
  );
  yield call(getTemplates, { type: GET_TEMPLATES });
}

function* deleteTemplate(action) {
  yield call(
    request({
      type: DELETE_TEMPLATE,
      method: 'DELETE',
      url: `template/${action.payload.id}`
    }),
    action
  );
  yield call(getTemplates, { type: GET_TEMPLATES });
}

export default function* rootSaga() {
  yield takeLatest(GET_TEMPLATES, getTemplates);
  yield takeLatest(ADD_FOLDER, addFolder);
  yield takeLatest(UPDATE_FOLDER, updateFolder);
  yield takeLatest(ADD_CONTENT, addContent);
  yield takeLatest(UPDATE_CONTENT, updateContent);
  yield takeLatest(DELETE_TEMPLATE, deleteTemplate);
}
