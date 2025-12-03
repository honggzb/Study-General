|class|Scene|
|---|---|
|container||
|size-xxx||
|divide-y-xxx||
|space-y-xxx||
|line-clamp-xxx|text ecllipse|
|truncate|text ecllipse|
|bg-gradient-to-r from-orange-500 to-black via-white from-20% via-70% to-90%||
|ring-xxx ring-red ring-offset-xxx|button|
|animation-ping||
|sr-only, lg:not-sr-only|will hide in screen, but only for screen reader|
|typography |such as prose|

## some tips

```html
{/* Fluid text */}
      <p className='text-[min(10vw,70px)]'>Something Fluid</p>
      <br /><hr /><br />
{/* Accent */}
      <div className='my-4 flex flex-col'>
        <label htmlFor=""><input type="checkbox" checked className='accent-green-500' />browser default</label>
        <label htmlFor=""><input type="checkbox" checked className='accent-pink-500' />browser default</label>
      </div>
      <br /><hr /><br />
{/* highlight */}
      <div className='selection:bg-green-400 selection:text-white'>
        <p>Consectetur aliqua mollit magna deserunt amet ut ullamco quis non reprehenderit irure eu id culpa. Excepteur laborum proident nulla Lorem qui labore. Reprehenderit proident adipisicing exercitation exercitation minim Lorem veniam laborum aliquip aliquip in do deserunt. Quis dolore laboris labore eu nisi. Aute irure nisi exercitation non eu nulla cupidatat. Excepteur irure sint duis aute reprehenderit.</p>
      </div>
      <br /><hr /><br />
{/* using file */}
      <input type="file" className='block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-gray-500' />
{/* less javascript */}
      <br /><hr /><br />
{/* Caret */}
      <textarea className='w-full caret-green-500 p-2' name="" id=""></textarea>
```

## using variables

1. using `cn`
2. using `clsx`

```
import { cn } from "@/lib/utils";
import clsx from "clsx";
<div className={clsx("text-3xl font-bold", delta > 0 ? "text-green-500" : "text-red-500")}></div>
<div className={cn('group relative flex items-start md:-ml-12', className)}></div>
<div className={cn("text-lg font-medium", volumeChangePercentage24h > 0 ? "text-green-500" : "text-red-500")}>{volumeChangePercentage24h}%</div>

```

-[10 Tailwind Classes I Wish I Knew Earlier](https://www.youtube.com/watch?v=x1RJ5Q09PqM)
