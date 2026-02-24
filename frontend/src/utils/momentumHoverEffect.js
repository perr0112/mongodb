import gsap from "gsap";
import InertiaPlugin from "gsap/InertiaPlugin";

gsap.registerPlugin(InertiaPlugin);

function initMomentumHoverEffect() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  const xyMultiplier = 30;
  const rotationMultiplier = 20;
  const inertiaResistance = 200;

  const clampXY = gsap.utils.clamp(-1080, 1080);
  const clampRot = gsap.utils.clamp(-60, 60);

  document.querySelectorAll("[data-momentum-hover-init]").forEach((root) => {
    let prevX = 0,
      prevY = 0;
    let velX = 0,
      velY = 0;
    let rafId = null;

    root.addEventListener("mousemove", (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        velX = e.clientX - prevX;
        velY = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        rafId = null;
      });
    });

    root.querySelectorAll("[data-momentum-hover-element]").forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        const target = el.querySelector("[data-momentum-hover-target]");
        if (!target) return;

        const { left, top, width, height } = target.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        const rawTorque = offsetX * velY - offsetY * velX;

        const leverDist = Math.hypot(offsetX, offsetY) || 1;
        const angularForce = rawTorque / leverDist;

        const velocityX = clampXY(velX * xyMultiplier / 4);
        const velocityY = clampXY(velY * xyMultiplier / 4);
        const rotationVelocity = clampRot(angularForce * rotationMultiplier);

        gsap.to(target, {
          inertia: {
            x: { velocity: velocityX, end: 0 },
            y: { velocity: velocityY, end: 0 },
            rotation: { velocity: rotationVelocity, end: 0 },
            resistance: inertiaResistance,
          },
        });
      });
    });
  });
}

export { initMomentumHoverEffect };
