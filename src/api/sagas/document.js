import { takeLatest } from 'redux-saga/effects'
import { GET_DOCUMENTS } from 'api/modules/document'
import request from 'utils/request'

const getDocuments = request({
  type: GET_DOCUMENTS,
  method: 'GET',
  url: 'my/documents',
})

export default function* rootSaga() {
  yield takeLatest(GET_DOCUMENTS, getDocuments)
}
