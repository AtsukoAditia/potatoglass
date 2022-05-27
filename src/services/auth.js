import axios from './index'
import constant from '@/config/constant'

export default {
  login (userData) {
    return axios.post(`/login`, userData)
  },
  loginPHP (userData) {
    return axios.post(`${constant.urlAPIPHP}/Account/login`, userData)
  },
  register (userData) {
    return axios.post(`/register`, userData)
  },
  checkAccount (username, email) {
    var addons = ''
    if (username !== '') {
      addons += `?username=${username}`
    }
    if (email !== '') {
      addons += `?email=${email}`
    }
    return axios.get(`${constant.urlAPIPHP}/Account/check_account${addons}`)
  },
  registerVendor (userData) {
    // return axios.post(`${constant.urlAPIPHP}/account/register/vendor`, userData)
    return axios({
      method: 'post',
      url: `${constant.urlAPIPHP}/Account/register/vendor`,
      data: userData,
      headers: {}
    })
  },
  refreshToken () {
    return axios.get(`auth/anonymous`)
  },
  getBahanPHP () {
    return axios.get(`${constant.urlAPIPHP}/Account/master_bahan`)
  },
  getKodePosPHP (kp) {
    return axios.get(`${constant.urlAPIPHP}/Address/kodepos?kodepos=${kp}`)
  },
  resendVerifEmail (id) {
    return axios.get(`${constant.urlAPIPHP}/Account/send_verify_email/${id}`)
  },
  sendTokenFCM (sendFCM) {
    return axios.post(`/register/fcm`, sendFCM)
  },
  sendOTP (sendData) {
    return axios({
      method: 'post',
      url: `https://boma.go.be.teras.camp/v1/forgot/password`,
      data: sendData,
      headers: {}
    })
  },
  verifyOTP (sendData) {
    return axios({
      method: 'post',
      url: `https://boma.go.be.teras.camp/v1/verify/otp`,
      data: sendData,
      headers: {}
    })
  },
  changePass (sendData) {
    return axios.post(`/change/new/password`, sendData)
  }
}
