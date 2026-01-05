'use client'

import Link from 'next/link'

export function ButtonGoBack() {
  return (
    <Link href="/" className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
      Voltar
    </Link>
  )
}
