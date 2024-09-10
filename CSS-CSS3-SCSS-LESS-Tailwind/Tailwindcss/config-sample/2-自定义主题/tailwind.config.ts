function withOpacityValue(var) {
  return ({ opacityValue }) => {
    if(opacityValue === undefined) {
      return `rgb(var(${var}))`
    }
    return `rgb(var(${var})) / ${opacityValue}`;
  }
  
}

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        bg: withOpacityValue('--color-bg-base'),
        card: withOpacityValue('--color-bg-card'),
        btn: withOpacityValue('--color-bg-btn'),
        'btn-hover': withOpacityValue('--color-bg-btn-hover')
      }
    },
  },
  plugins: [],
}
