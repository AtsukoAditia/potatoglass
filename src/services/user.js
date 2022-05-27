import axios from './index'
import constant from '@/config/constant'

export default {
  // editProfile (id, userData) {
  //   return axios.put(`/user/${id}`, userData)
  // },
  editProfile (userData) {
    return axios.post(`${constant.urlAPIPHP}/Account/change_uname_email`, userData)
  },
  getUserProfile (id) {
    return axios.get(`/user/${id}`)
  },
  getAllUser () {
    return axios.get(`/user`)
  },
  editAdminFee (sendData) {
    return axios.post(`${constant.urlAPIPHP}/Master/Config/admin_fee`, sendData)
  },
  editPass (sendData) {
    return axios.post(`${constant.urlAPIPHP}/Account/change_password`, sendData)
  },
  updaterek (sendData) {
    return axios.post(`${constant.urlAPIPHP}/Vendor/Profile/updaterek/vendor`, sendData)
  },
  getrek () {
    return axios.get(`${constant.urlAPIPHP}/Vendor/Profile/inforek`)
  }
}
