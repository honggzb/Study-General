import request from './request'

//获取购物车商品
export function getShopCarList(){
	return request({
		url:'/api/shopcar/getShopCarList',
	})
}

//删除购物车
export function deleteShopCar( params, token ){
	return request({
		url:'/api/shopcar/deleteShopCar',
		params,
		headers:{
			token
		}
	})
}

//加入购物车
export function addShopCart(data: any, token: any){
	return request({
		url:'/api/shopcar/addShopCart',
		method:'post',
		data,
		headers: {
			token
		}
	})
}

//删除购物车数据[批量]
export function batchDeleteShopCar(data: any, token: any){
	return request({
		url:'/api/pay/shopcar/deleteShopCar',
		method:'post',
		data,
		headers: {
			token
		}
	})
}

//结算
export function settlement(data: any){
	return request({
		url:'/api/order/settlement',
		method:'post',
		data
	})
}

//支付宝结算
export function alipayOrder(data: any){
	return request({
		url:'/api/pay/alipay/queryOrder',
		method:'post',
		data
	})
}

//支付宝轮询查订单状态
export function queryOrderWithAli(params: any){
	return request({
		url:'/api/pay/alipay/queryOrderWithAli',
		params
	})
}

//微信结算
export function wxOrder(data: any){
	return request({
		url:'/api/pay/wxpay/queryOrder',
		method:'post',
		data
	})
}

//微信轮询查订单状态
export function queryOrderWithWx(params: any){
	return request({
		url:'/api/pay/alipay/queryOrderWithWx',
		params
	})
}
