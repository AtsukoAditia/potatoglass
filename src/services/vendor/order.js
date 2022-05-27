import axios from './../index'
import constant from '@/config/constant'

export default {

  order: {
    getList (skip, limit, statid, date) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Transaction/list?skip=${skip}&limit=${limit}`)
      // return axios.get(`${constant.urlAPIPHP}/Vendor/Transaction/list?filter_vendor_name=Testing&filter_start=2022-01-19&filter_end&skip=&limit=&filter_status=1`)
      // return axios.get(`transaction?skip=${skip}&limit=${limit}&status_item_vendor=${statid}&filter_from_delivery_time=${date}`)
    },
    getListJoin (skip, limit) {
      return axios.get(`transaction/join?skip=${skip}&limit=${limit}`)
    },
    getDetailJoin (id) {
      return axios.get(`transaction/join/${id}`)
    },
    getDetail (skip, limit, orderid) {
      return axios.get(`transaction?skip=${skip}&limit=${limit}&filter_order_id=${orderid}`)
    },
    getDetailPHP (orderid) {
      return axios.get(`order/${orderid}`)
    },
    accept (unid) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/transaction/accept/${unid}`)
    },
    reject (unid) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/transaction/reject/${unid}`)
    },
    delivery (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/transaction/delivery`, sendData)
    },
    delivered (unid) {
      return axios.get(`order/received/${unid}`)
    },

    logOrder (sendData) {
      return axios({
        method: 'post',
        url: `${constant.urlAPIPHP}/save_log`,
        data: sendData,
        headers: { }
      })
    }
  }
}
