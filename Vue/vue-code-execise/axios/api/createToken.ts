import request from '../utils/request'

//创建临时token
export function createToken( ){
  return request({ url:'/api/token/createToken' })
}
