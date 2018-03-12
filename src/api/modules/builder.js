import { createAction } from 'redux-actions';
import {requestSuccess} from 'utils/request';

export const SET_ACTIVE_DOCUMENT = 'SET_ACTIVE_DOCUMENT';
export const GET_DOCUMENT = 'GET_DOCUMENT';
export const ADD_SECTION = 'ADD_SECTION';
export const UPDATE_SECTION = 'UPDATE_SECTION';
export const DELETE_SECTION = 'DELETE_SECTION';
export const MOVE_DOWN_SECTION = 'MOVE_DOWN_SECTION';
export const MOVE_UP_SECTION = 'MOVE_UP_SECTION';

export const addSection = createAction(ADD_SECTION);
export const updateSection = createAction(UPDATE_SECTION);
export const deleteSection = createAction(DELETE_SECTION);
export const moveUpSection = createAction(MOVE_UP_SECTION);
export const moveDownSection = createAction(MOVE_DOWN_SECTION);

export const setActiveDocument = (document) => {
  return {
    type: SET_ACTIVE_DOCUMENT,
    document: document,
  }
};

export const getDocument = (id) => {
  return {
    type: GET_DOCUMENT,
    id: id
  }
};

const initialState = {
  document: {},
  activeDocument: {},
};

const reducer = ((state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_DOCUMENT:
      return {
        ...state,
        document: action.document.document,
      };
    case requestSuccess(GET_DOCUMENT):
      return {
        ...state,
        activeDocument: action.payload
      };
    default:
      return state
  }
});

export default reducer;
