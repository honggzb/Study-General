import request from '../utils/request'

export function getSliders( data ){
	return request({
		url:'/api/slider/getSliders',
		method:"post",
		data
	})
}
