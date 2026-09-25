import { defineClientConfig, onContentUpdated } from "vuepress/client";

const interactiveSurfaceSelector = [
  ".vp-article-item",
  ".vp-blog-info-wrapper .vp-blogger-info",
  ".vp-blog-main > .vp-category-list",
  ".vp-blog-main > .vp-tag-list",
].join(",");

const bindAmbientInteractions = (): void => {
  document.querySelectorAll<HTMLElement>(interactiveSurfaceSelector).forEach((surface) => {
    if (surface.dataset.ambientBound === "true") return;

    surface.dataset.ambientBound = "true";
    surface.addEventListener("pointermove", (event) => {
      const bounds = surface.getBoundingClientRect();
      surface.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
      surface.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
    });
  });
};

const updateHeroParallax = (): void => {
  const hero = document.querySelector<HTMLElement>(".vp-blog-hero.no-bg");
  if (!hero) return;

  const progress = Math.min(window.scrollY / Math.max(window.innerHeight * 0.75, 1), 1);
  hero.style.setProperty("--hero-parallax-y", `${progress * 46}px`);
  hero.style.setProperty("--hero-parallax-scale", `${1 - progress * 0.035}`);
  hero.style.setProperty("--hero-parallax-opacity", `${1 - progress * 0.38}`);
};

export default defineClientConfig({
  setup() {
    if (typeof window === "undefined") return;

    let frame = 0;
    const scheduleHeroUpdate = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateHeroParallax();
      });
    };

    window.addEventListener("scroll", scheduleHeroUpdate, { passive: true });
    window.addEventListener("resize", scheduleHeroUpdate, { passive: true });

    onContentUpdated((reason) => {
      if (reason === "beforeUnmount") return;

      window.requestAnimationFrame(() => {
        bindAmbientInteractions();
        updateHeroParallax();
      });
    });
  },
});
