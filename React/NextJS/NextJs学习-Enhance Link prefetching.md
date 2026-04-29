- a custom component that does link prefetch on hover
- `Link` component from `next/link` accepts an optional prop `prefetch`
  - `true` – the route is prefetched when the link enters the viewport
  - `false` – the route is not prefetched when the link enters the viewport; however, the route will be prefetched on hover
- **prefetch prop** in this component
  - `true` – the full route is prefetched when the link enters the viewport, both for static and dynamic pages
  - `false` – prefetching is completely disabled
  - `null` – new default value – the behavior depends on whether the route is static or dynamic:
    - `static` – the full route will be prefetched when the link enters the viewport
    - `dynamic` – only a partial route down to the nearest segment with a loading.tsx boundary will be prefetched; if there's no such route, nothing is prefetched
- [Mastering Next.js Prefetching: Enhance Navigation with the SuperLink Component](https://typeofweb.com/nextjs-prefetch-onmouseenter)
  
```ts
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ComponentPropsWithRef } from "react";

export const SuperLink = (props: ComponentPropsWithRef<typeof Link>) => {
  const router = useRouter();
  const strHref = typeof props.href === "string" ? props.href : props.href.href;
  // override the prefetch prop and use router to programmatically prefetch instead  
  const conditionalPrefetch = () => {
    if (strHref) {
      void router.prefetch(strHref);
    }
  };
  return (
    <Link
      {...props}
      prefetch={false}
      // prefetching happens on mouseenter
      onMouseEnter={(e) => {
        // Prefetch on Fast Internet Only
        const hasFastInternet =
          !navigator.connection || navigator.connection.effectiveType === "4g";
        if (strHref && hasFastInternet) {
          void router.prefetch(strHref);
        }
        return props.onMouseEnter?.(e);
      }}
      // Accessibility
      onPointerEnter={(e) => {
        conditionalPrefetch();
        return props.onPointerEnter?.(e);
      }}
      onTouchStart={(e) => {
        conditionalPrefetch();
        return props.onTouchStart?.(e);
      }}
      onFocus={(e) => {
        conditionalPrefetch();
        return props.onFocus?.(e);
      }}
    />
  );
};
```
