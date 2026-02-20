import gsap from "gsap"
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type AnimateWithGsapProps = {
  target: any;
  animationProps: gsap.TweenVars;
  scrollProps?: ScrollTrigger.Vars;
}

export const animateWithGsap = ({ target, animationProps, scrollProps }: AnimateWithGsapProps) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    }
  })
}

// type AnimateWithGsapTimelineProps = {
//   timeline: gsap.core.Timeline;
//   rotationRef: any;
//   rotationState: number;
//   firstTarget: any;
//   secondTarget: any;
//   animationProps: gsap.TweenVars;
// }

// export const animateWithGsapTimeline = ({ timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps }: AnimateWithGsapTimelineProps) => {
//   timeline.to(rotationRef.current.rotation, {
//     y: rotationState,
//     duration: 1,
//     ease: 'power2.inOut'
//   })
//   timeline.to(
//     firstTarget,
//     {
//       ...animationProps,
//       ease: 'power2.inOut'
//     },
//     '<'
//   )
//   timeline.to(
//     secondTarget,
//     {
//       ...animationProps,
//       ease: 'power2.inOut'
//     },
//     '<'
//   )
// }