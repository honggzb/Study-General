|||
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
