[NextJs学习-SEO](#top)

- [Create Sitemap](#create-sitemap)
- [Create an RSS Feed with Route Handlers](#create-an-rss-feed-with-route-handlers)
- [Site metadata](#site-metadata)
  - [add metadata to app\\layout.tsx](#add-metadata-to-applayouttsx)
  - [metadata for each component](#metadata-for-each-component)

## Create Sitemap

1. create a new file called 'sitemap.ts' in app directory
2. `npm run dev`
3. now can open up http://localhost:3000/sitemap.xml to see the sitemap

## Create an RSS Feed with Route Handlers

1. create a new file called 'app/feed.xml/route.ts'
2. now can open up http://localhost:3000/feed.xml to test the feed
3. `npm install rss`, `npm install @types/rss -D`
4. modify the 'feed.xml/route.ts'

```ts
import RSS from 'rss';
export async function GET() {
  //create a new RSS feed instance
  const feed = new RSS({
    title: 'Your Website',
    description: 'A cool website that everyone should check out!',
    site_url: 'https://yourwebsite.com',
    feed_url: `https://yourwebsite.com/feed.xml`,
    copyright: `${new Date().getFullYear()} Your Website`,
    language: 'en',
    pubDate: new Date(),
  });
  // add the dynamic posts for our Sitemap
  // posts.map((post) => {
  //   feed.item({
  //     title: post.title,
  //     guid: `https://yourwebsite.com/${post.slug}`,
  //     url: `https://yourwebsite.com/${post.slug}`,
  //     date: post.date,
  //     description: post.excerpt,
  //     author: post.author.name,
  //     categories: post.categories || [],
  //   });
  // });
  //use the xml method and set indent to true for formatting purposes
  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
```

[⬆ back to top](#top)

## Site metadata

### add metadata to app\layout.tsx

```ts
// app\layout.tsx
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Your Website',
  description: 'A cool website that everyone should check out!',
  keywords: '图像处理, 格式转换, 图片裁剪, 图片压缩, AI Logo设计, SVG生成器',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.yourwebsite.com/',
    siteName: 'your website name',
    images: [
      {
        url: 'https://www.yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'yourwebsite.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@your_twitter_handle',
    creator: '@your_twitter_handle',
  },
  icons: [
    { rel: 'icon', url: '/image-tools-icon.svg' },
    { rel: 'apple-touch-icon', url: '/image-tools-icon.svg' },
  ],
}
    // ...
return (
    <html lang="en">
      <head>
        <link rel="icon" href="/image-tools-icon.svg" />
          <link rel="canonical" href="https://www.yourwebsite.com/" />
          <link rel="alternate" href="https://www.yourwebsite.com/feed.xml" type="application/atom+xml" />
          {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FRKGZTH854" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FRKGZTH854');
          `}
        </Script>
        {/* 结构化数据 */}
        <Script id="structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "yourwebsite.com",
              "url": "https://www.yourwebsite.com/",
              "description": "一个强大的在线图像处理工具, 提供格式转换、裁剪、调整大小、压缩、滤镜、SVG生成器和AI Logo设计等功能。支持JPG、PNG、WEBP、GIF和PDF格式之间的相互转换, 文件大小限制为10MB。",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "CNY"
              }
            }
          `}
        </Script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7522094408813551" crossOrigin="anonymous" />
        </head>
      <body>
        {children}
      </body>
    </html>
  )
```

### metadata for each component

- add 'layout.tsx' for each component
- put metadata in 'layout.tsx'

```
├── 📂ai-image-generator/
│    ├── 📄layout.tsx
│    └── 📄page.tsx
```

```ts
// layout.tsx
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: '免费 AI 文生图工具 - 通过文字描述生成独特图像 | 图像魔方',
  description: '使用图像魔方的AI文生图工具，只需输入文字描述即可生成独特的AI图像。激发创意灵感，适用于各种创作场景。',
}
export default function AIImageGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
```

> References
- [Next.js Metadata Files API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [Next.js sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [How to Add a Sitemap & RSS Feed in Next.js App Router](https://spacejelly.dev/posts/how-to-add-a-sitemap-rss-feed-in-next-js-app-router)
- [Google搜索中心](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=zh-cn)
