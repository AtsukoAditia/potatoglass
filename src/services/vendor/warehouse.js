import axios from './../index'
import constant from '@/config/constant'

export default {

  getList (skip, limit) {
    return axios.get(`${constant.urlAPIPHP}/get_gudang?skip=${skip}&limit=${limit}`)
    // return axios.get(`${constant.urlAPIPHP}/Vendor/Gudang/list?skip=${skip}&limit=${limit}`)
  },
  addWare (sendData) {
    // return axios.post(`${constant.urlAPIPHP}/add_gudang`, sendData)
    return axios.post(`${constant.urlAPIPHP}/Vendor/Gudang/add`, sendData)
  },
  delWare (id) {
    return axios.delete(`${constant.urlAPIPHP}/delete_gudang/${id}`)
  },
  statusWare (id) {
    return axios.get(`${constant.urlAPIPHP}/Vendor/delivery/toggle/${id}`)
  },
  addDelivWare (sendData) {
    return axios.post(`${constant.urlAPIPHP}/Vendor/delivery/registration`, sendData)
  },
  getDetail (id) {
    return axios.get(`${constant.urlAPIPHP}/Vendor/Gudang/detail/${id}`)
  },
  getListMaterial (id, skip, limit) {
    return axios.get(`${constant.urlAPIPHP}/Vendor/material/list?filter_gudang=${id}&skip=${skip}&limit=${limit}`)
  }
}
