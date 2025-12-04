## TailwindCSS4+ Animation

|built-in Class|
|---|
|`animate-spin`|
|`animate-ping`|
|`animate-pulse`|
|`animate-bounce`|
|`animate-none`|
|`animate-(<custom-property>)`|
|`animate-[<value>`|

## Customizing with the Apply Directive

1. define your animation by using `@theme`
2. can combined with customised class name

```css
 /* globals.css */
@theme {
  /* customised animation */
  --animate-wiggle: wiggle 0.5s ease-in-out infinite;
  --animate-fadeIn: fadeIn 5s ease-in forwards;
  @keyframes wiggle {
    0% {
      transform: rotate(-10deg)
    }
    50% {
      tranform: rotate(10deg)
    }
    100% {
      tranform: rotate(-10deg)
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
 /* customised class name */
@layer components {
  .spin-slow {
    @apply animate-spin duration-10000
  }
}
```

## Demos

```html
{/* spinner animation */}
{/* 1.blue spinner */}
<div className='h-20 flex items-center justify-center'>
  <div className='animate-spin h-8 w-8 border-4 border-blue-500 border-solid rounded-fulborder-t-transparent'></div>
</div>
<!-- ----------------------------------------------------------------------------- -->
{/* 2.red pulse */}
<div className='h-20 flex items-center justify-center'>
  <span className='relative inline-flex h-4 w-4'>
    <span className='absolute h-full w-full rounded-full bg-red-600 opacity-7animate-ping'></span>
    <span className="relative h-4 w-4 rounded-full bg-red-600"></span>
  </span>
</div>
<!-- ----------------------------------------------------------------------------- -->
{/* 3.submitting effect */}
<div className='h-20 flex items-center justify-center'>
  <button className="animate-pulse bg-blue-500 text-white font-semibold py-2 px-rounded">Submitting</button>
</div>
<!-- ----------------------------------------------------------------------------- -->
{/* 4.bounded arrow */}
<div className='h-20 flex items-center justify-center'>
  <div className="animate-bounce text-3xl">
    <ArrowDownCircle />
  </div>
</div>
<!-- ----------------------------------------------------------------------------- -->
{/* 5.customer */}
<div className='h-50 flex flex-col items-center justify-center'>
  <span className="animate-wiggle text-4xl inline-block">👋</span> Hi, there!
  <div className='animate-fadeIn h-10'>...Modal container...</div>
  <hr />
  <div className='spin-slow h-8 w-8 border-4 border-purple-500 border-solid rounded-fulborder-t-transparent'></div>
</div>
<!-- ----------------------------------------------------------------------------- -->
{/* 6.combine with Arbitrary Values */}
<div className='h-50 flex flex-col items-center justify-center'>
  <div className="animate-[wiggle_1s_ease-in-out_2] text-4xl">👋</div>
  <div className="animate-[spin_3s_linear_3] text-4xl">👋</div>
   bg-indigo-200'>Hover me for a wiggle</button>
</div>
<!-- ----------------------------------------------------------------------------- -->
{/* group-hover */}
<div className='h-40 flex flex-col items-center justify-center'>
    <div className="group p-4 bg-gray-100 inline-block">
      <Image src="/card.png" width={30} height={30} alt='as' className='inline-block group-hover:animate-bounce' />
     <span> Hove the picture to bounce it</span>
   </div>
</div>
 <!-- ----------------------------------------------------------------------------- -->
{/* 7.accessibility */}
{/* For situations where the user has specified that they prefer reduced motion, you caconditionally apply animations and transitions using the motion-safe and motion-reducvariants */}
<div className='h-40 flex flex-col items-center justify-center'>
  <div className="motion-safe:animate-spin delay-200">
      motion-safe
    </div>
    {/* <div className="animate-spin motion-reduce:animate-none">
      motion-reduce
   </div> */}
</div>
<!-- ----------------------------------------------------------------------------- -->
 {/* 8.Interactivity */}
<div className='h-40 flex flex-col items-center justify-center'>
    <button className='cursor-pointer'>Click me</button>
    <button className='cursor-wait'>Please wait</button>
   <button className='cursor-not-allowed'>No access</button>
   <hr />
   <div className='pointer-events-auto'>Clickable</div>
   <div className='pointer-events-none'>Not Clickable</div>
</div>
```

> references
- [TailwindCSS Animation](https://tailwindcss.com/docs/animation)
- [Tailwind CSS Animations From Beginner to Pro](https://www.youtube.com/watch?v=phWZ_f-Qndw)
- https://github.com/cruip/cruip-tutorials/
