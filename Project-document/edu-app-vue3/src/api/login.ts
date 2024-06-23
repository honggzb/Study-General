import request from '../utils/request'

export function loginByJson( data: any ){
	return request({
		url:'/api/u/loginByJson',
		method:'post',
		data
	})
}

//发送注册或登录验证码
export function sendCaptcha( params: any ){
	return request({
		url:'/api/sms/sendRegisterOrLoginCaptcha',
		params
	})
}
//手机验证码登录
export function loginByMobile ( data: any ){
	return request({
		url:'/api/u/loginByMobile',
		method:'post',
		data
	})
}
//获取个人信息
export function getUserInfo( params: any ){
	return request({
		url:'/api/member/getUserInfo',
		params
	})
}

export function logout( ){
  return request({ url:'/api/u/logout' })
}
