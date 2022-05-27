import axios from './../index'
import constant from '@/config/constant'

export default {
  chattemplate: {
    get () {
      return axios.get(`${constant.urlAPIPHP}/Vendor/ChatTemplate/list`)
    },
    add (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/ChatTemplate/add`, sendData)
    },
    autorepadd_post (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/ChatTemplate/autorepadd`, sendData)
    },
    delete (id) {
      return axios.delete(`${constant.urlAPIPHP}/Vendor/ChatTemplate/delete/${id}`)
    }
  },
  informasi: {
    updateinfo (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Profile/updateinfo/vendor`, sendData)
    },
    open (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Profile/updatejambuka/vendor`, sendData)
    },
    getinfo () {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Profile/infotoko`)
    },
    closeNow () {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Profile/toggle`)
    }
  },
  chat: {
    getchatlist (data) {
      return axios.post(`${constant.urlAPIPHPLocal}/Front/getChatData`, data)
    }
  }
}
