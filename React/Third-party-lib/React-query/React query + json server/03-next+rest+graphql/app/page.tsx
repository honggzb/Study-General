/ * https://github.com/jonat-m/cursor-nextjs-jsonserver-reactquery-demo */
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Demo: Next.js com REST e GraphQL</h1>

      <p className="text-gray-600 mb-2">Um experimento com a ide Cursor e Nextjs</p>
      <p className="text-gray-600 mb-2">
        Integração entra chamadas Api Rest e Graphql com{' '}
        <a href="https://github.com/TanStack/query" className="text-blue-600 hover:text-blue-800">
          react-query
        </a>{' '}
        e{' '}
        <a
          href="https://github.com/typicode/json-server"
          className="text-blue-600 hover:text-blue-800"
        >
          json-server
        </a>
      </p>
      <p className="text-gray-600 mb-12">
        Demonstração de gerenciamento de estado do servidor em aplicações React
      </p>
      <ul className="space-y-2 pb-12">
        <li className="flex items-start">
          <span className="mr-2">📡</span>
          <span>
            APIs mockadas com{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">JSON Server</code> (REST +
            GraphQL)
          </span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">⚡</span>
          <span>
            Cache inteligente e mutations com{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">@tanstack/react-query</code>
          </span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">🎨</span>
          <span>
            Estilização rápida com{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Tailwind CSS</code>
          </span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">🛠️</span>
          <span>
            Configuração otimizada com{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">PNPM</code>,{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ESLint</code>,{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Prettier</code> e{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Cursor IDE</code>
          </span>
        </li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/posts-rest"
          className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Posts REST</h2>
          <p className="text-gray-600">Implementação usando REST API tradicional</p>
        </Link>

        <Link
          href="/posts-graphql"
          className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Posts GraphQL</h2>
          <p className="text-gray-600">Implementação usando GraphQL API</p>
        </Link>
      </div>
    </main>
  )
}
