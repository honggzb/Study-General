'use client'
import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const Setting = () => {
  const pathName = usePathname()
  console.log('pathname from client component', pathName)
  const searchParams = useSearchParams()
  console.log('searchParams from client component', searchParams.get('search'))
  return (
    <div>Setting</div>
  )
}

export default Setting