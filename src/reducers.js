import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from 'api/modules/auth'
import document from 'api/modules/document'
import builder from 'api/modules/builder'

export default combineReducers({
  routing: routerReducer,
  auth,
  document,
  builder
})
