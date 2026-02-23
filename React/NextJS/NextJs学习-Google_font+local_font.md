[NextJs学习-Google_font+local_font](#top)

## Google_font

- all need edit in 'layout.tsx' file

```ts
import { Inter, Calistoga } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});
//...
<body className={`${inter.variable} ${calistoga.variable} antialiased`}>
//use in component or css file
<p className="font-[sans]>
```

## local_font

```ts
const robert = localFont({
  src: [
    {path: '../public/fonts/robert-medium.woff2'},
    {path: '../public/fonts/robert-regular.woff2'},
  ],
  variable: '--font-robert',
  display: 'swap',
});
const circularWeb = localFont({
  src: '../public/fonts/circularweb-book.woff2',
  variable: '--font-circular-web',
  display: 'swap',
});
//...
<body className={`${robert.className} ${circularWeb.className} antialiased`}>
//use in component or css file
<p className="font-[circular-web]>
```
