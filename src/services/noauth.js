import axios from './indexno_auth'
import constant from '@/config/constant'

export default {
  marketplace: {
  },
  material: {
    getDetail (id) {
      return axios.get(`${constant.urlAPIPHP}/Material/detail/${id}`)
    }
  }
}
