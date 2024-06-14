import { onMounted } from "vue"

type Options = {
  el: string
}

type Return = {
  Baseurl: string | null
}

export default function (option: Options): Promise<Return> {
  return new Promise((resolve) =>{
    onMounted(() => {
      const file:HTMLImageElement = document.querySelector(option.el) as HTMLImageElement
      file.onload = ():void => {
        resolve({ Baseurl: toBase64(file) })
      }
    })
    const toBase64 = (el: HTMLElement): string => {
      const canvas: HTMLCanvasElement = document.createElement('canvas')
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      canvas.width = el.clientWidth
      canvas.height = el.clientHeight
      ctx.drawImage(el, 0, 0, canvas.width, canvas.height)
      console.log(el.clientWidth)
      return canvas.toDataURL('image/png')
    }
  })
}