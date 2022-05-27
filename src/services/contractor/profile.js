import axios from './../index'
import constant from '@/config/constant'

export default {
  getDashboard () {
    return axios.get(`${constant.urlAPIPHP}/Profile/Dashboard`)
  }
}
