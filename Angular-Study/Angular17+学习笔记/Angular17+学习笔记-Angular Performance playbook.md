[Angular17+学习笔记-Angular Performance playbook](#top)

- [Tools](#tools)
- [Analyzing](#analyzing)
- [Architecting for Performance](#architecting-for-performance)
  - [reducing DOM nodes with virtualization](#reducing-dom-nodes-with-virtualization)
  - [reduce DOM size/complexity with host binding](#reduce-dom-sizecomplexity-with-host-binding)
  - [using template for block for better performance](#using-template-for-block-for-better-performance)
  - [implement Pure pipe to prevent unneeded rerendering](#implement-pure-pipe-to-prevent-unneeded-rerendering)
  - [improving perceived performance](#improving-perceived-performance)
- [Optimizing Images for Faster Page Loads](#optimizing-images-for-faster-page-loads)
  - [NgOptimizedImage directive (Angular 14+)](#ngoptimizedimage-directive-angular-14)
  - [CDN](#cdn)
  - [Optimizing Dynamic Images - Responsive images](#optimizing-dynamic-images---responsive-images)
- [Dependency Injection](#dependency-injection)
- [Partial Hydration and Defer Block](#partial-hydration-and-defer-block)
- [Server-side Rendering](#server-side-rendering)
  - [Direct DOM Manipulation](#direct-dom-manipulation)
  - [Hydration](#hydration)
  - [SSG - Static Site Generation](#ssg---static-site-generation)
  - [Enable server-side rendering](#enable-server-side-rendering)
- [Optimizing Change Detection for Runtime Performance](#optimizing-change-detection-for-runtime-performance)
  - [Zone pollution](#zone-pollution)
  - [OnPush strategy](#onpush-strategy)
- [Signals and Fine-grained Reactivity](#signals-and-fine-grained-reactivity)


## Tools

- Lighthouse extension for performance overview
- Angular DevTools profiler for change detection
- Chrome DevTools performance Panel for code-level analysis

[⬆ back to top](#top)

## Analyzing

- <mark>Code Bundles</mark>
  - `ng serve`
- <mark>esBuild Bundle</mark>
  - `ng build --configuration development`   --> generate 'stats.json' file
  - input 'stats.json' file in 'https://esbuild.github.io/analyze/'
  - use-defined bundles size, open 'angular.json'
- <mark>lighthouse in Chrome DevTools</mark>
- <mark>profiler in Angular DevTools</mark>: analyzing **change detection**
  - https://www.youtube.com/@Angular/search?query=runtime

```js
"configurations": {
            "production": {W
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
//...
```

## Architecting for Performance

- standalone architecture is tree-shakeable
- angulr provides a schematic to convert module-based components to standalone

- Angular DOM rendering management
  1. at compile time  -> template instructions created
  2. Dirty checking, did bound properites change
  3. New DOM checked node-by-node against actual DOM
  4. updated nodes are patched into the DOM and the view repaints
- Performance consideration
  1. reduce the overall number of DOM nodes
  2. make DOM comparison faster
  3. reduce the number of change detection cycles

### reducing DOM nodes with virtualization

1. add `ScrollingModule` to '\virtual-scroll\src\app\table-view\table-view.component.ts'
2. change `<tr *cdkVirtualFor="let product of products()">` to '\virtual-scroll\src\app\table-view\table-view.component.html'
3. wrapped whole template with `<cdk-virtual-scroll-viewport [itemSize]="50" class="scroll-viewport">` in '\virtual-scroll\src\app\table-view\table-view.component.html'
4. add `scroll-viewport` class in '\virtual-scroll\src\app\table-view\table-view.component.scss'
- [cdkScrollable and ScrollDispatcher in angular material](https://material.angular.io/cdk/scrolling/overview)


### reduce DOM size/complexity with host binding

1. 'host-element\src\app\shared-ui\add-to-cart-button\add-to-cart-button.component'
   1. add `host: { 'class': 'add-to-cart'}` to 'add-to-cart-button.component.ts'
   2. add to `:host` to each class `:host.add-to-cart` in 'add-to-cart-button.component.scss'
2. 'host-element\src\app\table-view\table-view.component'
   1. create new component 'host-element\src\app\table-view\table-row'
   2. change to ''
- [Binding to the host element](https://angular.dev/guide/components/host-elements#binding-to-the-host-element)

```ts
// table-view.component.ts
@Component({
  selector: 'tr[table-row]',        //defining host element
  standalone: true,
  imports: [CurrencyPipe,UpperCasePipe,AddToCartButtonComponent,NgOptimizedImage],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,    //using onpush
})
export class TableRowComponent {
  readonly product = input.required<Product>();     //define input product
}
// table-view.component.html
<tr
  table-row             //1)using table-row
  *cdkVirtualFor="let product of products()"
  [product]="product"   //2)using product
>
```

[⬆ back to top](#top)

### using template for block for better performance

### implement Pure pipe to prevent unneeded rerendering

1. create a pipe: 'pure-pipe\src\app\shared-ui\price\sale-message.pipe.ts'
2. use it in 'pure-pipe\src\app\shared-ui\price\price.component.html'
   - `<p class="sale-message">{{ price | saleMessage: salePrice }}</p>`
   - old --> `<p class="sale-message">{{ onSaleMessage() }}</p>`


### improving perceived performance


[⬆ back to top](#top)

## Optimizing Images for Faster Page Loads

- https://web.dev/learn/performance/image-performance

### NgOptimizedImage directive (Angular 14+)
  - `<img ngSrc="cat.jpg" width="400" height="200" priority>`
  - [Getting started with NgOptimizedImage](https://angular.dev/guide/image-optimization)
- [image CDN URLs to apply image optimizations](https://web.dev/image-cdns/#how-image-cdns-use-urls-to-indicate-optimization-options)
  - assets server

### CDN

- CDNs do not replace asset storage
- Cache assets to edge locations
- some services can resize, reformat or retouch images
- Angular CDN Preconfigured CDN Loaders
    - Cloudflare Image resizing
    - Cloudinary
    - ImageKit
    - Imgix
    - Netlify
- Setting up a CDN for Angular
- Angular Image Loaders
  - Generic loader
  - Preconfigured loader
  - Custom loader
- connect a CDN with Angular Preconfigured Image loader
  1. add `provideImgixLoader('https://your-cdn-here.imgix.net/'),` to 'src\app\app.config.ts'
    - `import { provideImgixLoader } from '@angular/common';`
  2. add `preconnect` to 'index.html'
    - `<link rel="preconnect" href="https://your-cdn-here.imgix.net">`

### Optimizing Dynamic Images - Responsive images

- [HTMLImageElement: sizes property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes)

```html
<!--   1. sizes="100vm" placeholder  -->
   <!-- \app\shared-ui\hero-section\hero-section.component.html -->
<img [ngSrc]="imageUrl" alt="" width="1500" height="650" priority placeholder
  sizes="100vw"/>
<!--   2. sizes="..."  -->
<!-- \app\product-view\detail-view\detail-view.component.html -->
<img
  [ngSrc]="selectedProduct().image"
  [alt]="selectedProduct().title"
  height="500"
  width="500"
  sizes="(max-width: 484px) 50vw, (max-width: 860px) calc(100vw - 300px), calc(100vw - 100vw + 500px)"
  placeholder
/>
```

[⬆ back to top](#top)

## Dependency Injection

- [Dev Tools-inspect your injectors](https://angular.dev/tools/devtools#inspect-your-injectors)
  - Injector Tree is available with version 17
- light-weight injection tokens for third-party provider
  - The lightweight injection token design pattern: supports proper **tree-shaking**
  - [Optimizing client application size with lightweight injection tokens](https://angular.dev/guide/di/lightweight-injection-tokens)
  - create a injection token: '\src\app\tokens\logger-token.ts'
  - using injection token: 'src\app\cart\cart.component.ts'

```ts
// \src\app\tokens\logger-token.ts
import { InjectionToken } from "@angular/core";
export abstract class AppLoggerToken {
  abstract log(event: string): void;
  abstract error(error: string): void;
}
export const LOGGER_TOKEN = new InjectionToken<AppLoggerToken>('Logger Service');
// src\app\cart\cart.component.ts
readonly logger = inject(LOGGER_TOKEN, {
    optional: true
  });
// app.config.ts
{ provide: LOGGER_TOKEN, useClass: LoggerService }
```

[⬆ back to top](#top)

## Partial Hydration and Defer Block

- Partial Hydration adds js to portions of the static HTML to make it interactive
- Lazy-loading with Deferrable views(version 17+)
  - defer views unlock the first step towars partial hydration
  - the defer block tells esbuild to split the code inside the block into a lazy-loaded bundle
- lazy-lozding before defer blocks
  - dynamic component loader allows dynamically lazy-loading components, but required a lot of boilerplate
- **defer block** was in preview in v17 and stable release in v18
  - defer block does not require an import
  - deferred content must be standalone
- **Defer Placeholder Block**
  - `@placeholder(minumum 500ms) {}`
  - code rendered during SSR or SSG
  - shown before defer block is triggered
  - recommended
- **Defer Loading Block**
  - `@loading(after 100ms; minimum 1s) {}`
- **Defer error Block**
- **Default trigger**:
  - `@defer(on idle)`
  - triggers when the browser is idel
  - wraps the requestIdelCallback API to queue requests
  - Requests are not guaranteed to run in the next cycle

```js
@defer {
  <detail-view />
} @placeholder {        // optional
  <div>placeholder</div>
} @loading {            // optional
  <div>loading</div>
} @error {             // optional
  <div>Error!</div>
}
```

[⬆ back to top](#top)

## Server-side Rendering

- [Server-side rendering](https://angular.dev/guide/ssr#configure-server-side-rendering)
- advantages: (v16, introduced in v18)
  - Improved performance
  - Improved Core Web Vitals
  - Better SEO

### Direct DOM Manipulation

- Accessing the document
- Querying specific DOM elements
- Using appendChild
- Using innerHTML or outerHTML
- Detaching and moving DOM node
- Recommend
  - use Angular API(v18) browser-only Hooks
  - `afterNextRender` : runs one time, which is useful for initializing third-party libraries or browser-specific APIs
  - `afterRender` : runs afer every change detection cycle completes, which is useful to synchronize application state with the DOM
  - `ngSkipHyration` directive
    - used for components that cannot be refactored
    - use as a temporary solution
    - components that skip hyfration use destructive hydration, which causes a page flicker

### Hydration

- Hydration is the process that restores the server-side rendered application on the client
-

### SSG - Static Site Generation

- Angular pre-rendering is also called SSG
- SSG renders HTML files at build time
- Pre-rendered HTML files can be cached
- Reduces time to FirestByte(TTFB) web vital
- Good for websites that serve the same content to all users
- Not good for dynamic views


### Enable server-side rendering

- create a new project with SSR  --> `ng new --ssr`
- add SSR to an existing project  --> `ng add @angular/ssr`

```
|-- 📄server.ts                       # application server - initialization
└── 📂src/
    |-- 📂app/
    |   |-- 📄app.config.server.ts    # server application configuration
    |   └── 📄app.config.ts           # add provideClientHydration()
    └── 📄main.server.ts              # main server application bootstrapping
```

[⬆ back to top](#top)

## Optimizing Change Detection for Runtime Performance

- Angular change detection is zone-based
- zoneless change detection was released in v18
- Angular monkey patches zone.js to trigger change detection
- Zone does not know if events change application state
- Angular lifecycle Hooks:  ![Angular-lifecycle-Hooks](Angular-lifecycle-Hooks.png)
- Component change detection flow: ![Component change detection flow](Component-change-detection-flow.png)
- https://angularindepth.com/

### Zone pollution

- https://angular.dev/best-practices/zone-pollution
- "Profiler" of angular Dev Tools
- "jlp-button.directive.ts"
- "table-view.component.html" --> remove `innerHTML`

### OnPush strategy

- when a parent node is detached from change detection, so are all of its child components
- not all events trigger change detection
- Async events inside the component class must be manually managed
- input properties only track object reference, mutations will not trigger change detection
- "add-to-cart-button.component.ts"  --> parents
- "contact.components.ts"  --> input + async event manually managed

[⬆ back to top](#top)

## Signals and Fine-grained Reactivity

- Signals
  - new reactive primitive API
  - getter, setter, consumer tracking
  - Pluralsight
    - RxJS and Angular Signals Fundamentals
    - Angular state management playbook
- Local change detection(v17+)
  - works for components that use signals in tempates
  - updated values mark the component as dirty
  - component ancestors are marked for traversal using markAncestorForTraversal


[⬆ back to top](#top)
