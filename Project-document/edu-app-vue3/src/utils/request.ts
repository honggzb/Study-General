import axios from 'axios';
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus';
//1. 创建axios对象
const service = axios.create();
//2. 请求拦截器
service.interceptors.request.use(config => {
  const userStore = useUserStore();
	let token = userStore.token;
	if( token ){
		config.headers['Authorization'] = token;
	}
  return config;
}, error => {
  Promise.reject(error);
});

//3. 响应拦截器
service.interceptors.response.use(response => {
  //判断code码
  return response.data;
}, error => {
  let message = '';
  let status = error.response.status;
  switch(status) {
    case 401:
      message = 'Token过期'
      break
    case 403:
       message = '无权访问'
      break
    case 404:
      message = '请求地址错误'
      break
    case 500:
      message = '服务器出现问题'
      break
    default:
      message = '网络出现问题'
  }
  ElMessage({
    type: 'error',
    message
  })
  return Promise.reject(error);
});

export default service;
