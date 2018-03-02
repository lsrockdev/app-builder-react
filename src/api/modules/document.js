import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'utils/request'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DOCUMENTS = 'GET_DOCUMENTS'

// ------------------------------------
// Actions
// ------------------------------------

export const getDocuments = createAction(GET_DOCUMENTS)

const initialState = {
  documents: [],
  status: 'INIT',
  error: null,
}

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
  },
  initialState
)
