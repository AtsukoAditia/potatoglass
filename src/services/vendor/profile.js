import axios from './../index'
import constant from '@/config/constant'

export default {

  profile: {
    profileDetail (id) {
      return axios.get(`master-vendor/${id}`)
    },
    profileDetailPHP (id) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Profile/detail/${id}`)
    },
    getVerifBar () {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Profile/verify`)
    },
    getDashboard () {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Dashboard`)
    }
  },
  getBahanPHP () {
    return axios.get(`${constant.urlAPIPHP}/Account/master_bahan`)
  },
  getMaterialC (id) {
    return axios.get(`${constant.urlAPIPHP}/Report/material_count?vendor_id=${id}`)
  },
  getTicketC (id) {
    return axios.get(`${constant.urlAPIPHP}/Report/ticket_count?vendor_id=${id}`)
  },
  getOrderC (id) {
    return axios.get(`${constant.urlAPIPHP}/Report/order_count?vendor_id=${id}&status=1`)
  },
  getMaterialProfile (skip, limit, id) {
    return axios.get(`${constant.urlAPIPHP}/Profile/materiallist?skip=${skip}&limit=${limit}&vid=${id}`)
  },
  getRekapSaldo () {
    return axios.get(`${constant.urlAPIPHP}/Vendor/deposit/rekap`)
  },
  receiveSaldo () {
    return axios.get(`${constant.urlAPIPHP}/Vendor/deposit/disbursment`)
  }
}
