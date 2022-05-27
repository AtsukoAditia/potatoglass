import axios from 'axios'
import constant from '@/config/constant'

let baseUrl = constant.urlAPI + constant.verAPI

var instance = axios.create({
  baseURL: baseUrl
})

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  })

// Add a response interceptor
instance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + '1'
  return axios(originalRequest)
})

export default instance
