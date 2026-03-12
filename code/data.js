/**
 * ═══════════════════════════════════════════════════════════════
 *  data.js  —  Soufyan Studios  —  Central Site Configuration
 *  All per-page colours, aurora blob definitions, and star palettes
 *  live here. Shared functions in main.js read from this object.
 * ═══════════════════════════════════════════════════════════════
 */

const SITE_DATA = {

  /* ─── Home / index ──────────────────────────────────────────── */
  index: {
    pageId: 'index',
    /** Aurora blob layers — div-based, CSS blur, GSAP animated */
    aurora: {
      bgGradient: 'radial-gradient(ellipse 130% 70% at 50% 0%, #072240 0%, #040d1a 65%)',
      blobs: [
        // Large anchor blobs (slow, very blurry)
        { x: '8%',  y: '15%', w: 700, h: 420, color: 'rgba(0,255,128,0.16)',  blur: 90, dur: 22, dx: 6,  dy: 5  },
        { x: '60%', y: '5%',  w: 580, h: 350, color: 'rgba(0,180,255,0.13)',  blur: 80, dur: 18, dx: -7, dy: 9  },
        { x: '30%', y: '55%', w: 800, h: 300, color: 'rgba(0,240,150,0.11)',  blur: 90, dur: 26, dx: 5,  dy: -5 },
        { x: '75%', y: '60%', w: 500, h: 380, color: 'rgba(0,140,255,0.10)',  blur: 70, dur: 20, dx: -8, dy: 4  },
        // Smaller accent blobs (faster, sharper glow)
        { x: '20%', y: '70%', w: 340, h: 220, color: 'rgba(0,255,160,0.13)',  blur: 50, dur: 14, dx: 7,  dy: -8 },
        { x: '55%', y: '38%', w: 300, h: 200, color: 'rgba(20,200,255,0.10)', blur: 45, dur: 16, dx: -5, dy: 6  },
      ],
    },
    stars: {
      count:   { desktop: 160, mobile: 80 },
      palette: ['#00ff88','#00e5a0','#33ff99','#80ffcc','#b3ffe0','#e0fff5','#ffffff'],
    },
    /** CSS custom property overrides injected at runtime (optional) */
    cssVars: {
      '--accent':      '#00ff88',
      '--accent-glow': 'rgba(0,255,136,0.35)',
      '--accent-2':    '#00aaff',
    },
  },

  /* ─── Closeted ─────────────────────────────────────────────────── */
  closeted: {
    pageId: 'closeted',
    aurora: {
      bgGradient: 'radial-gradient(ellipse 130% 70% at 50% 0%, #120000 0%, #420000 65%)',
      blobs: [
        // Orange warmth — top-left, fills the sky
        { x: '5%',  y: '5%',  w: 680, h: 400, color: 'rgba(255, 30, 30, 0.18)',  blur: 90, dur: 20, dx: 7,  dy: 5  },
        { x: '50%', y: '0%',  w: 560, h: 320, color: 'rgba(255, 20, 20, 0.13)',  blur: 80, dur: 24, dx: -6, dy: 7  },
        // Purple/violet mid-layer
        { x: '65%', y: '20%', w: 620, h: 380, color: 'rgba(255, 50, 50, 0.15)',  blur: 85, dur: 18, dx: -8, dy: 4  },
        { x: '15%', y: '50%', w: 700, h: 280, color: 'rgba(220, 20, 20, 0.12)',  blur: 80, dur: 28, dx: 5,  dy: -6 },
        // Pink accent sparks
        { x: '40%', y: '60%', w: 320, h: 200, color: 'rgba(255, 100, 100, 0.13)', blur: 50, dur: 13, dx: -6, dy: 8  },
        { x: '80%', y: '55%', w: 280, h: 180, color: 'rgba(255, 40, 40, 0.11)',  blur: 45, dur: 17, dx: 6,  dy: -5 },
      ],
    },
    stars: {
      count:   { desktop: 140, mobile: 70 },
      palette: ['#ff3838','#ff3333','#c32b2b','#ff0000','#ff1414','#ff0000','#a90000'],
    },
    cssVars: {
      '--accent':      '#ff3838',
      '--accent-glow': 'rgba(255, 56, 56, 0.35)',
      '--accent-2':    '#ff4242',
    },
  },

  /* ─── Charm ─────────────────────────────────────────────────── */
  charm: {
    pageId: 'charm',
    aurora: {
      bgGradient: 'radial-gradient(ellipse 130% 70% at 50% 0%, #2a0a00 0%, #120a1e 65%)',
      blobs: [
        // Orange warmth — top-left, fills the sky
        { x: '5%',  y: '5%',  w: 680, h: 400, color: 'rgba(255,140,30,0.18)',  blur: 90, dur: 20, dx: 7,  dy: 5  },
        { x: '50%', y: '0%',  w: 560, h: 320, color: 'rgba(255,100,20,0.13)',  blur: 80, dur: 24, dx: -6, dy: 7  },
        // Purple/violet mid-layer
        { x: '65%', y: '20%', w: 620, h: 380, color: 'rgba(200,50,255,0.15)',  blur: 85, dur: 18, dx: -8, dy: 4  },
        { x: '15%', y: '50%', w: 700, h: 280, color: 'rgba(160,20,220,0.12)',  blur: 80, dur: 28, dx: 5,  dy: -6 },
        // Pink accent sparks
        { x: '40%', y: '60%', w: 320, h: 200, color: 'rgba(255,100,230,0.13)', blur: 50, dur: 13, dx: -6, dy: 8  },
        { x: '80%', y: '55%', w: 280, h: 180, color: 'rgba(255,160,40,0.11)',  blur: 45, dur: 17, dx: 6,  dy: -5 },
      ],
    },
    stars: {
      count:   { desktop: 140, mobile: 70 },
      palette: ['#ffb338','#ff75ed','#ffd580','#ffaaee','#ff8844','#fff0cc','#ffffff'],
    },
    cssVars: {
      '--accent':      '#ffb338',
      '--accent-glow': 'rgba(255,179,56,0.35)',
      '--accent-2':    '#d63bfb',
    },
  },

  /* ─── Unbound ───────────────────────────────────────────────── */
  unbound: {
    pageId: 'unbound',
    aurora: {
      bgGradient: 'radial-gradient(ellipse 130% 70% at 50% 0%, #0d1140 0%, #07091a 65%)',
      blobs: [
        // Deep blue base — wide, slow
        { x: '5%',  y: '10%', w: 700, h: 400, color: 'rgba(30,60,255,0.15)',  blur: 90, dur: 22, dx: 6,  dy: 4  },
        { x: '55%', y: '5%',  w: 600, h: 340, color: 'rgba(0,140,255,0.13)',  blur: 85, dur: 19, dx: -7, dy: 8  },
        // Purple veil — overlaps blue
        { x: '70%', y: '30%', w: 580, h: 360, color: 'rgba(114,9,183,0.16)',  blur: 88, dur: 16, dx: -5, dy: 5  },
        { x: '10%', y: '55%', w: 720, h: 260, color: 'rgba(80,20,180,0.12)',  blur: 80, dur: 25, dx: 4,  dy: -5 },
        // Cyan edge accents
        { x: '35%', y: '65%', w: 340, h: 200, color: 'rgba(0,210,255,0.12)',  blur: 52, dur: 14, dx: -6, dy: 7  },
        { x: '78%', y: '60%', w: 300, h: 190, color: 'rgba(45,70,220,0.11)',  blur: 48, dur: 18, dx: 5,  dy: -4 },
      ],
    },
    stars: {
      count:   { desktop: 150, mobile: 75 },
      palette: ['#a78bfa','#00d4ff','#60a5fa','#c4b5fd','#7dd3fc','#e0f2fe','#ffffff'],
    },
    cssVars: {
      '--accent':      '#7209b7',
      '--accent-glow': 'rgba(114,9,183,0.3)',
      '--accent-2':    '#00d4ff',
    },
  },
};

/**
 * Detect which page config to use.
 * Reads data-page attribute on <body>, e.g. <body data-page="charm">
 * Falls back to 'index'.
 */
function getPageConfig() {
  const key = document.body.dataset.page || 'index';
  return SITE_DATA[key] || SITE_DATA.index;
}