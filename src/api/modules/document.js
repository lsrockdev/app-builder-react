import { createAction, handleActions } from 'redux-actions';
import { requestSuccess, requestFail } from 'utils/request';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DOCUMENTS = 'GET_DOCUMENTS';
export const GET_DOCUMENT = 'GET_DOCUMENT';
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const SEARCH_DOCUMENT = 'SEARCH_DOCUMENT';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const IMPORT_FIELDS = 'IMPORT_FIELDS';
export const REQUEST_DOCUMENT = 'REQUEST_DOCUMENT';
export const SELECT_DOCUMENT = 'SELECT_DOCUMENT';

// ------------------------------------
// Actions
// ------------------------------------

export const getDocuments   = createAction(GET_DOCUMENTS);
export const getDocument    = createAction(GET_DOCUMENT);
export const createDocument = createAction(CREATE_DOCUMENT);
export const updateDocument = createAction(UPDATE_DOCUMENT);
export const deleteDocument = createAction(DELETE_DOCUMENT);
export const searchDocument = createAction(SEARCH_DOCUMENT);
export const updateSettings = createAction(UPDATE_SETTINGS);
export const importFields   = createAction(IMPORT_FIELDS);
export const requestDocument = createAction(REQUEST_DOCUMENT);
export const selectDocument = createAction(SELECT_DOCUMENT);

const initialState = {
  document: {},
  documents: [],
  status: 'INIT',
  error: null,
  documentId: ''
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(
  {
    [requestSuccess(GET_DOCUMENTS)]: (state, { payload }) => ({
      ...state,
      documents: payload,
      status: requestSuccess(GET_DOCUMENTS),
    }),

    [requestFail(GET_DOCUMENTS)]: (state, { payload }) => ({
      ...state,
      status: requestFail(GET_DOCUMENTS),
      error: payload,
    }),

    [requestSuccess(GET_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      document: payload,
      status: requestSuccess(GET_DOCUMENT),
    }),

    [requestFail(GET_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(GET_DOCUMENT),
      error: payload,
    }),

    [requestSuccess(SEARCH_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      documents: payload,
      status: requestSuccess(SEARCH_DOCUMENT),
    }),

    [requestFail(SEARCH_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(SEARCH_DOCUMENT),
      error: payload,
    }),

    [requestSuccess(CREATE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(CREATE_DOCUMENT),
    }),

    [requestFail(CREATE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(CREATE_DOCUMENT),
      error: payload,
    }),

    [requestSuccess(UPDATE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(UPDATE_DOCUMENT),
    }),

    [requestFail(UPDATE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(UPDATE_DOCUMENT),
      error: payload,
    }),

    [requestSuccess(DELETE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DELETE_DOCUMENT),
    }),

    [requestFail(DELETE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(DELETE_DOCUMENT),
      error: payload,
    }),

    [requestSuccess(UPDATE_SETTINGS)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(UPDATE_SETTINGS),
    }),

    [requestFail(UPDATE_SETTINGS)]: (state, { payload }) => ({
      ...state,
      status: requestFail(UPDATE_SETTINGS),
      error: payload,
    }),

    [requestSuccess(IMPORT_FIELDS)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(IMPORT_FIELDS),
    }),

    [requestFail(IMPORT_FIELDS)]: (state, { payload }) => ({
      ...state,
      status: requestFail(IMPORT_FIELDS),
      error: payload,
    }),

    [requestSuccess(REQUEST_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(REQUEST_DOCUMENT),
      documentToken: payload
    }),

    [requestFail(REQUEST_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(REQUEST_DOCUMENT),
      error: payload,
    }),

    [SELECT_DOCUMENT]: (state, { payload }) => ({ ...state, documentId: payload.id })
  },
  initialState
);
