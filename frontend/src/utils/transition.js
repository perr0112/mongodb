import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/all";

import { $ } from "./dom";

gsap.registerPlugin(DrawSVGPlugin);

const body = document.body;

const runPageLeaveAnimation = (href, navigate, data) => {
  const transitionWrap = $("[data-transition-wrap]");
  const transitionSVGPath = transitionWrap.querySelectorAll("svg path");

  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: "Power1.easeInOut",
    },
  });

  tl.set(transitionSVGPath, {
    strokeWidth: "0%",
    drawSVG: "0% 0%",
  });

  tl.to(transitionSVGPath, {
    duration: 1,
    drawSVG: "0% 85%",
  });

  tl.to(
    transitionSVGPath,
    {
      strokeWidth: "30%",
      duration: 0.75,
      onComplete: () => {
        window.scrollTo(0, 0);
        body.classList.remove("transition-active");
        if (data && data !== null) {
          navigate(href, { state: data })
        } else {
          navigate(href)
        }
      },
    },
    "< 0.25",
  );

  return tl;
};

function runPageEnterAnimation() {
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionSVGPath = transitionWrap.querySelectorAll("svg path");

  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: "Power1.easeInOut",
    },
  });

  body.classList.add("transition-active");

  tl.add("startEnter", 1);

  tl.set(transitionSVGPath, {
    drawSVG: "0% 100%",
  });

  tl.to(
    transitionSVGPath,
    {
      duration: 1.25,
      drawSVG: "100% 100%",
      strokeWidth: "5%",
      ease: "Power1.easeInOut",
    },
    "startEnter",
  );

  tl.add("pageReady");

  return new Promise((resolve) => {
    tl.call(resolve, null, "pageReady");
  });
}

const runPageTransition = (href, navigate, data) => {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: "Power1.easeInOut",
    },
  });

  tl.add(runPageLeaveAnimation(href, navigate, data));
  tl.add(runPageEnterAnimation(), "> 0.5");

  return tl;
};

export { runPageLeaveAnimation, runPageEnterAnimation, runPageTransition };
