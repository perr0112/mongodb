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

  const lengths = [...paths].map((p) => p.getTotalLength());
  const maxLen = Math.max(...lengths);

  paths.forEach((path, i) => {
    const currentLength = path.getTotalLength();

    let duration;

    if (currentLength > 1500) {
      duration = 12;
    } else {
      const rawRatio = currentLength / maxLen;
      const finalRatio = gsap.utils.clamp(0.05, 1.2, rawRatio);

      const d = gsap.utils.clamp(0.5, 2.2, 0.6 + Math.sqrt(finalRatio) * 1.6);

      duration = d * 1.2;
    }

    tl.to(
      path,
      {
        strokeDashoffset: 0,
        duration,
      },
      i * 0.12,
    ).to(
      path,
      {
        fill: "var(--color-secondary)",
        // duration: gsap.utils.clamp(0.2, 0.6, 0.25 * duration),
        duration: currentLength > 1500 ? 2.4 : 1.2 / 2,
      },
      // ">",
      `${duration === 12 ? "-=8.5" : ">"}`,
    );
  });

  if (title) {
    const split = SplitText.create(title, { type: "chars" });

    tl.from(
      split.chars,
      {
        // y: '100%',
        y: 4,
        autoAlpha: 0,
        stagger: 0.025,
        // duration: 0.6,
        duration: 1.2,
      },
      // "+=1.2",
      // "-=6.2",
      "-=7.2",
    );
  }

  tl.to(
    loaderPage,
    {
      autoAlpha: 0,
      duration: 1.2,
      pointerEvents: "none",
      onComplete,
    },
    // "+=1.2",
    "-=4",
    // ">",
  );

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
