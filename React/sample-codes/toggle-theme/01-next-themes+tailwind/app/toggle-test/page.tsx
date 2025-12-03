import ToggleThemePage from '@/components/toggle-theme'
import React from 'react'

const ToggleThemeTestPage = () => {
  return (
    <div className="m-10 rounded-lg px-6 py-8 shadow-lg ring-1 ring-slate-900/5 dark:ring-slate-900 dark:shadow-gray-700">
      <h3 className='text-base font-medium tracking-tight text-slate-800'>Write Upside-Down</h3>
      <p className='mt-2 text-sm text-slate-500 dark:text-blue-100'>Pariatur incididunt culpa laboris ea ut. Deserunt nostrud sit qui non consequat amet. Elit magna exercitation quis do mollit laborum. Laboris ad magna anim sunt nisi mollit irure dolore consectetur laborum. Culpa ad velit sint duis sit Lorem duis incididunt. Tempor nisi id fugiat ullamco mollit. Esse ea exercitation qui cupidatat eu tempor tempor minim exercitation aliquip consectetur.<br /></p>
      <ToggleThemePage />
    </div>
  )
}

export default ToggleThemeTestPage
