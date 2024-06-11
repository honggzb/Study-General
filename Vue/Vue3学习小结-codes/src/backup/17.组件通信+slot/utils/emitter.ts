import mitt from 'mitt'
// 创建emitter
const emitter = mitt()

//绑定事件
// emitter.on('test', ()=>{
//  console.log('test 被调用了')
// }) 

// 触发事件
// emitter.emit('xxx', data)

// 解绑事件
// emitter.off('xxx')

// 清空事件
// emitter.all.clear()

export default emitter
