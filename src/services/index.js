import axios from 'axios'
import constant from '@/config/constant'
import LocalStorageService from './storage/LocalStorageService'

const localStorageService = LocalStorageService.getService()

let baseUrl = constant.urlAPI + constant.verAPI

var instance = axios.create({
  baseURL: baseUrl
})

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    const token = localStorageService.getAccessToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
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

  if (error.response.status === 401 && originalRequest.url === baseUrl + `/auth/anonymous`) {
    this.$router.push('/auth/sign-in1')
    return Promise.reject(error)
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    const refreshToken = localStorageService.getRefreshToken()
    const res = await axios.get(baseUrl + '/auth/anonymous',
      {
        'refresh_token': refreshToken
      })
    if (res.status === 200) {
      localStorageService.setToken(res.data.header['x-token'])
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken()
      return axios(originalRequest)
    }
  }
  return Promise.reject(error)
})

export default instance
