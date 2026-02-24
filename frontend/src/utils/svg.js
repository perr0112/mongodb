import { useEffect } from "react";

export default function useSvgDraw(ref, duration = 1.2) {
  useEffect(() => {
    if (!ref.current) return;

    const paths = ref.current.querySelectorAll("path");

    paths.forEach((path, i) => {
      const length = path.getTotalLength();

      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.animation = `draw ${duration}s ease forwards`;
      path.style.animationDelay = `${i * 0.15}s`;
    });
  }, [ref, duration]);
}
