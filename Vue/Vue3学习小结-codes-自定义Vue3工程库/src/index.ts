import type { App } from 'vue'

//InterSectionObserver
// MutationObserver: 侦听子集的变化，还有属性的变化 以及增删改查
// ResizeObserver 
// 
function useResize(el: HTMLElement, callback: Function) {
  let resize = new ResizeObserver((entries) => {
    console.log(entries)
    callback(entries[0].contentRect)
  })
  resize.observe(el);
}

const install = (app: App) => {
  app.directive('resize', {
    mounted(el, binding) {
      useResize(el, binding.value)
    },
  })
}

useResize.install = install

export default useResize