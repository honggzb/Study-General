
/** 把10000以上改成w  */
export const priceMixin = {
	methods: {
		changePrice(value: any) {
			const newValue = ['', '', '']
			let fr = 1000
			let num = 3
			let text1 = ''
			let fm = 1
			while (value / fr >= 1) {
				fr *= 10
				num += 1
				// console.log('数字', value / fr, 'num:', num)
			}
			if (num <= 8) { // 万
				text1 = parseInt(num - 4) / 3 > 1 ? '千万' : 'W'
				// tslint:disable-next-line:no-shadowed-variable
				fm = text1 === 'W' ? 10000 : 10000000
				if (value % fm === 0) {
					newValue[0] = parseInt(value / fm) + ''
				} else {
					newValue[0] = parseFloat(value / fm).toFixed(2) + ''
				}
				newValue[1] = text1
			}
			if (value < 1000) {
				newValue[0] = value + ''
				newValue[1] = ''
			}
			return newValue.join('');
		}
	}
}
