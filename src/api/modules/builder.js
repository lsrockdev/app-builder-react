export const SET_ACTIVE_DOCUMENT = 'SET_ACTIVE_DOCUMENT';
export const ADD_SECTION = 'ADD_SECTION';


export const setActiveDocument = (document) => {
  return {
    type: SET_ACTIVE_DOCUMENT,
    document: document
  }
};

export const createSection = (data) => {
  return {
    type: ADD_SECTION,
    document: data.document,
    title: data.title
  }
};

const initialState = {
  document: {},
};

const reducer = ((state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_DOCUMENT:
      return {
        ...state,
        document: action.document.document,
      };
    case ADD_SECTION:
      return {
        ...state,
      };
    default:
      return state
  }
});

export default reducer;
