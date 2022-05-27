import axios from './index'
import constant from '@/config/constant'

export default {
  listHelpPHP () {
    return axios.get(`${constant.urlAPIPHP}/Vendor/Help/list`)
  },
  //   detailHelpPHP (tid) {
  //     return axios.get(`${constant.urlAPIPHP}/Vendor/Help/detail/${tid}`)
  //   },
  addHelp (sendData) {
    return axios.post(`${constant.urlAPIPHP}/Vendor/Help/add`, sendData)
  },
  statHelp (id) {
    return axios.post(`${constant.urlAPIPHP}/Vendor/Help/status/${id}`)
  }
}
