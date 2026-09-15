/* Once a section arrives, it stays still. No scroll-linked image movement. */
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const groups = [
    '.entry-heading', '.entry-card', '.originals .section-top',
    '.collection-bar', '.story-card', '.studio-invitation', '.cut-intro, .remix-preview',
    '.closing', '.product-heading', '.tour-layout', '.newsdesk-features', '#newsdesk-preview',
  ];
  const pending = new Map();
  const animations = new Set();

  function reveal(element, immediate = false) {
    if (!pending.has(element)) return;
    const delay = pending.get(element);
    pending.delete(element);
    observer.unobserve(element);
    element.classList.remove('reveal-pending');
    if (immediate || reducedMotion.matches) return;

    const distance = matchMedia('(max-width: 760px)').matches ? 12 : 18;
    const animation = element.animate(
      [{ opacity: 0, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: 'translateY(0)' }],
      { duration: 600, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' },
    );
    animations.add(animation);
    animation.onfinish = animation.oncancel = () => animations.delete(animation);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) reveal(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });

  groups.forEach(selector => {
    document.querySelectorAll(selector).forEach((element, index) => {
      // Reloading halfway through the page never hides what is already on screen.
      if (element.getBoundingClientRect().top < innerHeight) return;
      pending.set(element, Math.min(index, 3) * 60);
      element.classList.add('reveal-pending');
      observer.observe(element);
    });
  });

  document.addEventListener('focusin', event => {
    for (const element of pending.keys()) {
      if (element.contains(event.target)) reveal(element, true);
    }
    // Keyboard navigation must never land inside a transparent entrance delay.
    for (const animation of animations) {
      if (animation.effect.target.contains(event.target)) animation.cancel();
    }
  });
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    for (const element of pending.keys()) reveal(element, true);
    for (const animation of animations) animation.cancel();
    observer.disconnect();
  });
})();
