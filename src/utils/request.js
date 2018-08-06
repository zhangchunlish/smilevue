import axios from 'axios'

//create an axios instance
const service = aixos.create({
  timeout: 5000
})
//request interceptor
service.interceptors.request.use(config => {
  return config;
}, error => {
  console.log(error)
  Promise.reject(error)
})

//response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log(error)
    Promise.reject(error)
  }
)
export default service
