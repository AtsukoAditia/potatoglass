import axios from './index'
import constant from '@/config/constant'

export default {
  listTicket () {
    return axios.get(`ticket/material`)
    // return axios.get(`ticket/material?isadmin=${adm}`)
  },
  listTicketPHP () {
    return axios.get(`${constant.urlAPIPHP}/Vendor/Ticket/list?limit=100&skip=0`)
  },
  detailTicket (tid) {
    return axios.get(`ticket/material/${tid}`)
  },
  detailTicketPHP (tid) {
    return axios.get(`${constant.urlAPIPHP}/Vendor/Ticket/detail/${tid}`)
  },
  newTicket (sendData) {
    return axios.post(`ticket/material`, sendData)
  },
  detailReply (tid) {
    return axios.get(`ticket/reply/${tid}`)
  },
  detailReplyPHP (tid) {
    return axios.get(`${constant.urlAPIPHP}/Vendor/Ticket/reply/${tid}`)
  },
  replyTicket (sendData) {
    return axios.post(`ticket/reply`, sendData)
  },
  approveTicket (tid, sendData) {
    return axios.put(`ticket/material/${tid}`, sendData)
  }
}
