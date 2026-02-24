// import gsap from "gsap";
// import { DrawSVGPlugin, SplitText } from "gsap/all";

// import { $ } from "./dom";

// gsap.registerPlugin(DrawSVGPlugin);
// gsap.registerPlugin(SplitText);

// const body = document.body

// const loader = () => {
//   const loaderPage = $(".loader-container");
//   if (!loaderPage) return;

//   const paths = loaderPage.querySelectorAll("svg path");
//   const title = loaderPage.querySelector("h1");

//   const tl = gsap.timeline({
//     defaults: { ease: "expo.out" }
//   });

//   body.classList.add("transition-active");

//   // init dash
//   paths.forEach(path => {
//     const length = path.getTotalLength();

//     gsap.set(path, {
//       strokeDasharray: length,
//       strokeDashoffset: length,
//     });
//   });

//   // draw
//   tl.to(paths, {
//     strokeDashoffset: 0,
//     duration: 1.4,
//     stagger: 0.12,
//   });

//   // texte
//   if (title) {
//     const split = SplitText.create(title, { type: "chars" });

//     tl.from(split.chars, {
//       y: 8,
//       autoAlpha: 0,
//       stagger: 0.03,
//       duration: 0.6,
//     }, "-=0.8");
//   }
// };

// export {
//     loader,
// }

import gsap from "gsap";
import { SplitText } from "gsap/all";
import { $ } from "./dom";

gsap.registerPlugin(SplitText);

const loader = (onComplete) => {
  const loaderPage = $(".loader-container");
  if (!loaderPage) return;

  const paths = loaderPage.querySelectorAll("svg path");
  const title = loaderPage.querySelector("h1");

  const tl = gsap.timeline({
    // defaults: { ease: "expo.out" },
    defaults: { ease: "power4.out" },
    // onComplete,
  });

  paths.forEach((path) => {
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fill: "transparent",
      opacity: 1,
    });
  });

  tl.to({}, { duration: 0.4 });

  tl.to(paths, {
    strokeDashoffset: 0,
    duration: 1.2,
    stagger: 0.12,
  });

  tl.to(
    paths,
    {
      fill: "var(--color-secondary)",
      duration: 0.6,
      stagger: 0.05,
    },
    // "-=0.4",
    "-=1",
  );

  if (title) {
    const split = SplitText.create(title, { type: "chars" });

    tl.from(
      split.chars,
      {
        // y: '100%',
        y: 4,
        autoAlpha: 0,
        stagger: 0.025,
        duration: 0.6,
      },
      //   "-=2.8",
      ">",
    );
  }

  tl.to(
    loaderPage,
    {
      autoAlpha: 0,
      duration: 1.2,
      pointerEvents: "none",
      //   }, "+=0.2");
      onComplete,
    },
    "+=1.2",
  );

  //   tl.fromTo(
  //     ".app-content",
  //     {
  //       autoAlpha: 0,
  //       pointerEvents: "none",
  //     },
  //     {
  //       autoAlpha: 1,
  //       pointerEvents: "all",
  //       duration: 1.2,
  //     },
  //     // "-=0.8",
  //     ">",
  //   );
  tl.to(
    ".app-content",
    {
      autoAlpha: 1,
      pointerEvents: "all",
      duration: 1.2,
    },
    // "-=0.8",
    ">",
  );
};

export { loader };
