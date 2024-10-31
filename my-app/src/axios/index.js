import http from './axios'
export const getData=()=>{
  return http.request({
    url:'/home/getData',
    method:'get'
  })
}
export const getUser=(param)=>{
  return http.request({
    url:'/user/getUser',
    method:'get',
    param:param
  })
}