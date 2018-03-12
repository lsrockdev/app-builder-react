import { takeLatest } from 'redux-saga/effects'
import { LOGIN, LOGOUT, SIGNUP } from 'api/modules/auth'
import request from 'utils/request'

const doLogin = request({
  type: LOGIN,
  method: 'POST',
  url: 'login',
  success: (res, action) => {
    localStorage.setItem('token', JSON.stringify(res.data))
  },
})

const doLogout = request({
  type: LOGOUT,
  method: 'POST',
  url: 'logout',
  success: (res, action) => {
    localStorage.removeItem('token')
  },
  fail: (res, action) => {
    localStorage.removeItem('token')
  },
})

const doSignup = request({
  type: SIGNUP,
  method: 'POST',
  url: 'signup',
  success: (res, action) => {
    localStorage.setItem('token', JSON.stringify(res.data))
  },
})

export default function* rootSaga() {
  yield takeLatest(LOGIN, doLogin)
  yield takeLatest(LOGOUT, doLogout)
  yield takeLatest(SIGNUP, doSignup)
}
