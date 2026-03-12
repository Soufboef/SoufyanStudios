/**
 * ═══════════════════════════════════════════════════════════════
 *  main.js  —  Soufyan Studios  —  Shared Runtime
 *
 *  Requires:  GSAP + ScrollToPlugin (loaded via CDN before this)
 *             data.js  (loaded before this script)
 *
 *  Modules:
 *    1. CSS var injection
 *    2. Aurora blobs  (divs + CSS blur + GSAP transforms only)
 *    3. Star field    (canvas drawn on GSAP ticker)
 *    4. Mouse parallax (GSAP smooth follow)
 *    5. Scroll reveal  (IntersectionObserver + GSAP)
 *    6. scrollToSection() helper
 *    7. Footer year
 * ═══════════════════════════════════════════════════════════════
 */

/* ── 0. Boot ─────────────────────────────────────────────────── */
const CFG = getPageConfig(); // defined in data.js

/* ── 1. Inject per-page CSS variables ──────────────────────── */
(function injectCSSVars() {
  if (!CFG.cssVars) return;
  const root = document.documentElement;
  Object.entries(CFG.cssVars).forEach(([k, v]) => root.style.setProperty(k, v));
})();

/* ── 2. Aurora Blobs ─────────────────────────────────────────
   Strategy:
   - Pure <div> elements with border-radius:50% and CSS blur filter
   - willChange:transform + translateZ(0) → own compositor layer
   - Only GSAP transform (x/y/scale) is animated — no layout props
   - opacity is animated separately at a slower rate (breathe effect)
────────────────────────────────────────────────────────────── */
(function buildAurora() {
  const layer = document.getElementById('aurora-layer');
  if (!layer || !CFG.aurora) return;

  // Apply page-specific gradient to the base layer
  layer.style.background = CFG.aurora.bgGradient;

  const blobWrap = document.getElementById('aurora-blobs');
  if (!blobWrap) return;

  CFG.aurora.blobs.forEach((b, i) => {
    const el = document.createElement('div');

    Object.assign(el.style, {
      position:      'absolute',
      left:          b.x,
      top:           b.y,
      width:         b.w + 'px',
      height:        b.h + 'px',
      background:    b.color,
      borderRadius:  '50%',
      filter:        `blur(${b.blur}px)`,
      willChange:    'transform',      // GPU compositing hint
      transform:     'translateZ(0)',  // promote to own layer immediately
      pointerEvents: 'none',
      flexShrink:    '0',
    });

    blobWrap.appendChild(el);

    // Stagger so blobs don't all peak simultaneously
    const delay = i * (b.dur * 0.14);
    const moveX = b.dx * 38;  // config unit → pixels
    const moveY = b.dy * 28;
    const scaleHi = 1.06 + Math.random() * 0.06;

    // Primary drift — yoyo loop
    gsap.to(el, {
      x:        moveX,
      y:        moveY,
      scale:    scaleHi,
      duration: b.dur,
      delay,
      ease:     'sine.inOut',
      repeat:   -1,
      yoyo:     true,
    });

    // Slow opacity breathe — separate tween, different speed
    gsap.to(el, {
      opacity:  0.55 + Math.random() * 0.45,
      duration: b.dur * 0.55,
      delay:    delay * 0.7,
      ease:     'sine.inOut',
      repeat:   -1,
      yoyo:     true,
    });
  });
})();

/* ── 3. Star Field — Canvas on GSAP ticker ───────────────────
   Using a single <canvas> avoids creating hundreds of DOM nodes.
   Drawing runs inside gsap.ticker so it shares the same rAF loop
   as all other animations — one rAF, not many.
────────────────────────────────────────────────────────────── */
(function buildStars() {
  const container = document.getElementById('star-field');
  if (!container || !CFG.stars) return;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position:      'absolute',
    inset:         '0',
    width:         '100%',
    height:        '100%',
    pointerEvents: 'none',
  });
  container.appendChild(canvas);

  const ctx      = canvas.getContext('2d');
  const isMobile = window.innerWidth < 768;
  const COUNT    = isMobile ? CFG.stars.count.mobile : CFG.stars.count.desktop;
  const PALETTE  = CFG.stars.palette;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Pre-compute star data once
  const stars = Array.from({ length: COUNT }, () => ({
    x:     Math.random(),         // 0–1 (multiplied by canvas size each frame)
    y:     Math.random(),
    r:     Math.random() * 1.3 + 0.25,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    cross: Math.random() > 0.74,  // sparkle cross shape
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.35 + 0.12,
  }));

  // Shared elapsed time
  let elapsed = 0;

  gsap.ticker.add((_, delta) => {
    elapsed += (delta || 16) * 0.001; // ms → seconds

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const alpha = 0.12 + ((Math.sin(elapsed * s.speed + s.phase) + 1) / 2) * 0.88;

      ctx.globalAlpha = alpha;
      ctx.fillStyle   = s.color;
      ctx.strokeStyle = s.color;

      const px = s.x * W;
      const py = s.y * H;

      if (s.cross) {
        const arm = s.r * 3.8;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(px - arm, py); ctx.lineTo(px + arm, py);
        ctx.moveTo(px, py - arm); ctx.lineTo(px, py + arm);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, 6.2832);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  });
})();

/* ── 4. Mouse Parallax ──────────────────────────────────────── */
(function initParallax() {
  const blobWrap = document.getElementById('aurora-blobs');
  if (!blobWrap) return;

  let tX = 0, tY = 0;

  document.addEventListener('mousemove', e => {
    tX = (e.clientX / window.innerWidth  - 0.5) * 20;
    tY = (e.clientY / window.innerHeight - 0.5) * 12;
  }, { passive: true });

  // Smooth lerp via GSAP instead of a separate rAF loop
  gsap.ticker.add(() => {
    gsap.to(blobWrap, {
      x:         tX,
      y:         tY,
      duration:  1.6,
      ease:      'power2.out',
      overwrite: 'auto',
    });
  });
})();

/* ── 5. Scroll Reveal ───────────────────────────────────────── */
(function initReveal() {
  const SELECTORS = '.section, .game-card, .reveal-card, .contact-card';
  const targets   = document.querySelectorAll(SELECTORS);

  // Immediately hide all targets
  gsap.set(targets, { opacity: 0, y: 48 });

  if (!('IntersectionObserver' in window)) {
    // Immediate fallback
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      gsap.to(entry.target, {
        opacity:    1,
        y:          0,
        duration:   0.7,
        ease:       'power2.out',
        clearProps: 'transform',
      });
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -36px 0px' });

  targets.forEach(el => obs.observe(el));
})();

/* ── 6. Smooth scroll (nav buttons call this) ───────────────── */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  // ScrollToPlugin must be registered
  if (gsap.plugins && gsap.plugins.scrollTo) {
    gsap.to(window, {
      duration:  0.85,
      scrollTo:  { y: el, offsetY: 24 },
      ease:      'power3.inOut',
    });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ── 7. Footer year ─────────────────────────────────────────── */
document.querySelectorAll('#currentYear')
  .forEach(el => el.textContent = new Date().getFullYear());