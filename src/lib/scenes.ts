// Room and house pictures drawn in SVG, so the template ships with no photos to license.
// Each room's colors come from its palette in src/data/site.ts.
// To use real photos instead, swap RoomScene for an <img> with your own files.

import type { Palette } from "../data/site";

export type View = "bed" | "window" | "bath" | "desk" | "porch";

const SKY = "#e4e9e6";
const SKY_LOW = "#eef0ea";
const SHORE = "#8b9a91";
const WATER = "#a6b9b5";
const WATER_LINE = "#c3d1cd";
const MARSH = "#b2ab7f";
const REED = "#8c875b";
const FRAME = "#f4f2eb";

function shade(alpha: number, x = 0, y = 0, w = 800, h = 560) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1d221f" opacity="${alpha}"/>`;
}

function reeds(x: number, y: number, w: number, count: number, height: number, seed: number) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const r = Math.abs(Math.sin(seed * 31 + i * 12.9898) * 43758.5453) % 1;
    const rx = x + (w / count) * i + r * 6;
    const rh = height * (0.55 + r * 0.45);
    const lean = (r - 0.5) * 8;
    out += `<path d="M${rx.toFixed(1)} ${y} q ${(lean / 2).toFixed(1)} ${(-rh / 2).toFixed(1)} ${lean.toFixed(1)} ${(-rh).toFixed(1)}" stroke="${REED}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  }
  return out;
}

/** The view out of a window: sky, far shore, water and marsh, clipped to the opening. */
function outside(id: string, x: number, y: number, w: number, h: number) {
  const horizon = y + h * 0.52;
  const waterEnd = y + h * 0.74;
  return `
  <clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>
  <g clip-path="url(#${id})">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${SKY}"/>
    <rect x="${x}" y="${horizon - h * 0.18}" width="${w}" height="${h * 0.18}" fill="${SKY_LOW}"/>
    <path d="M${x} ${horizon} C ${x + w * 0.2} ${horizon - h * 0.06}, ${x + w * 0.45} ${horizon - h * 0.02}, ${x + w * 0.6} ${horizon - h * 0.07} S ${x + w * 0.9} ${horizon - h * 0.03}, ${x + w} ${horizon - h * 0.05} V ${horizon + 2} H ${x} Z" fill="${SHORE}"/>
    <rect x="${x}" y="${horizon}" width="${w}" height="${waterEnd - horizon}" fill="${WATER}"/>
    <path d="M${x + w * 0.1} ${horizon + (waterEnd - horizon) * 0.35} h ${w * 0.25} M${x + w * 0.55} ${horizon + (waterEnd - horizon) * 0.6} h ${w * 0.3}" stroke="${WATER_LINE}" stroke-width="2" stroke-linecap="round"/>
    <path d="M${x} ${waterEnd} Q ${x + w * 0.5} ${waterEnd - h * 0.04} ${x + w} ${waterEnd + h * 0.02} V ${y + h} H ${x} Z" fill="${MARSH}"/>
    ${reeds(x, y + h, w, Math.round(w / 9), h * 0.24, x + y)}
  </g>`;
}

function windowFrame(id: string, x: number, y: number, w: number, h: number, cols = 2, rows = 2) {
  let bars = "";
  for (let c = 1; c < cols; c++) bars += `<rect x="${x + (w / cols) * c - 3}" y="${y}" width="6" height="${h}" fill="${FRAME}"/>`;
  for (let r = 1; r < rows; r++) bars += `<rect x="${x}" y="${y + (h / rows) * r - 3}" width="${w}" height="6" fill="${FRAME}"/>`;
  return `
    <rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" fill="${FRAME}"/>
    <rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" fill="none" stroke="#1d221f" stroke-opacity=".08"/>
    ${outside(id, x, y, w, h)}
    ${bars}
    <rect x="${x - 24}" y="${y + h + 10}" width="${w + 48}" height="12" fill="${FRAME}"/>
    <rect x="${x - 24}" y="${y + h + 22}" width="${w + 48}" height="4" fill="#1d221f" opacity=".06"/>`;
}

function floor(p: Palette, top: number) {
  let boards = "";
  for (let i = -6; i < 16; i++) {
    const x = i * 70;
    boards += `<path d="M${x} 560 L ${x + 120} ${top}" stroke="#1d221f" stroke-opacity=".07" stroke-width="1.5"/>`;
  }
  return `<rect x="0" y="${top}" width="800" height="${560 - top}" fill="${p.floor}"/>${boards}${shade(0.05, 0, top, 800, 10)}`;
}

function lamp(x: number, y: number, p: Palette) {
  return `
    <rect x="${x - 2}" y="${y - 70}" width="4" height="70" fill="${p.wood}"/>
    <rect x="${x - 18}" y="${y - 4}" width="36" height="6" rx="2" fill="${p.wood}"/>
    <path d="M${x - 26} ${y - 66} L ${x - 16} ${y - 106} H ${x + 16} L ${x + 26} ${y - 66} Z" fill="#efe5cf"/>
    <path d="M${x - 26} ${y - 66} H ${x + 26}" stroke="#1d221f" stroke-opacity=".12"/>`;
}

function bed(p: Palette) {
  return `
    ${windowFrame("w-bed", 500, 80, 200, 230, 2, 2)}
    <polygon points="440,430 640,430 760,560 470,560" fill="#ffffff" opacity=".14"/>
    <rect x="170" y="110" width="140" height="90" fill="${FRAME}"/>
    ${outside("w-print", 180, 120, 120, 70)}
    <rect x="170" y="110" width="140" height="90" fill="none" stroke="${p.wood}" stroke-width="3"/>
    <rect x="90" y="236" width="340" height="120" rx="6" fill="${p.wood}"/>
    <rect x="90" y="236" width="340" height="8" rx="4" fill="#ffffff" opacity=".12"/>
    <rect x="70" y="330" width="380" height="104" rx="10" fill="${p.linen}"/>
    ${shade(0.06, 70, 410, 380, 24)}
    <rect x="70" y="372" width="380" height="44" fill="${p.throw}"/>
    ${shade(0.08, 70, 410, 380, 6)}
    <rect x="112" y="300" width="128" height="48" rx="14" fill="${p.linen}" stroke="#1d221f" stroke-opacity=".08"/>
    <rect x="280" y="300" width="128" height="48" rx="14" fill="${p.linen}" stroke="#1d221f" stroke-opacity=".08"/>
    <rect x="80" y="434" width="10" height="26" fill="${p.wood}"/>
    <rect x="430" y="434" width="10" height="26" fill="${p.wood}"/>
    <rect x="8" y="350" width="62" height="74" rx="4" fill="${p.wood}"/>
    ${shade(0.12, 8, 384, 62, 2)}
    ${lamp(39, 350, p)}
    <rect x="18" y="424" width="6" height="24" fill="${p.wood}"/>
    <rect x="54" y="424" width="6" height="24" fill="${p.wood}"/>`;
}

function windowSeat(p: Palette) {
  return `
    ${windowFrame("w-seat", 150, 60, 500, 250, 3, 2)}
    <rect x="110" y="346" width="580" height="90" fill="${FRAME}"/>
    ${shade(0.05, 110, 346, 580, 90)}
    <rect x="130" y="368" width="160" height="56" rx="4" fill="none" stroke="#1d221f" stroke-opacity=".08"/>
    <rect x="320" y="368" width="160" height="56" rx="4" fill="none" stroke="#1d221f" stroke-opacity=".08"/>
    <rect x="510" y="368" width="160" height="56" rx="4" fill="none" stroke="#1d221f" stroke-opacity=".08"/>
    <rect x="120" y="322" width="560" height="30" rx="10" fill="${p.throw}"/>
    <rect x="150" y="280" width="90" height="56" rx="16" fill="${p.linen}" stroke="#1d221f" stroke-opacity=".08" transform="rotate(-6 195 308)"/>
    <rect x="250" y="288" width="80" height="48" rx="14" fill="${p.wall}" stroke="#1d221f" stroke-opacity=".1" transform="rotate(4 290 312)"/>
    <rect x="520" y="310" width="70" height="12" rx="2" fill="${p.wood}"/>
    <rect x="526" y="300" width="62" height="10" rx="2" fill="#c9b48c"/>
    <rect x="606" y="296" width="22" height="26" rx="3" fill="${p.linen}" stroke="#1d221f" stroke-opacity=".12"/>
    ${floor(p, 436)}
    <polygon points="180,436 620,436 700,560 120,560" fill="#ffffff" opacity=".12"/>`;
}

function bath(p: Palette) {
  let tiles = "";
  for (let y = 200; y < 420; y += 34) {
    tiles += `<path d="M0 ${y} H 800" stroke="#1d221f" stroke-opacity=".06"/>`;
  }
  for (let x = 0; x < 800; x += 34) {
    tiles += `<path d="M${x} 200 V 420" stroke="#1d221f" stroke-opacity=".06"/>`;
  }
  return `
    <rect x="0" y="200" width="800" height="220" fill="#f2f0e9"/>
    ${tiles}
    <rect x="0" y="194" width="800" height="8" fill="${p.wood}" opacity=".6"/>
    ${windowFrame("w-bath", 520, 50, 170, 110, 2, 1)}
    <rect x="0" y="420" width="800" height="140" fill="${p.floor}"/>
    ${shade(0.05, 0, 420, 800, 8)}
    <polygon points="500,420 700,420 760,560 470,560" fill="#ffffff" opacity=".12"/>
    <path d="M150 300 H 560 Q 572 300 568 314 L 548 410 Q 544 432 520 432 H 190 Q 166 432 162 410 L 142 314 Q 138 300 150 300 Z" fill="#f8f7f3" stroke="#1d221f" stroke-opacity=".1"/>
    <path d="M150 300 H 560" stroke="#1d221f" stroke-opacity=".14" stroke-width="3"/>
    <path d="M190 432 l -12 26 h 18 l 6 -26 Z M520 432 l 12 26 h -18 l -6 -26 Z" fill="${p.wood}"/>
    <path d="M170 300 V 240 q 0 -16 16 -16 h 18 q 10 0 10 10 v 8" fill="none" stroke="#9a9b93" stroke-width="6" stroke-linecap="round"/>
    <rect x="628" y="230" width="72" height="6" rx="3" fill="#9a9b93"/>
    <rect x="636" y="236" width="56" height="108" rx="4" fill="${p.throw}"/>
    ${shade(0.08, 636, 300, 56, 4)}
    <rect x="70" y="370" width="40" height="62" rx="6" fill="${p.wood}" opacity=".9"/>
    <rect x="76" y="352" width="28" height="20" rx="4" fill="#e9e4d6"/>`;
}

function desk(p: Palette) {
  return `
    ${windowFrame("w-desk", 30, 70, 130, 250, 1, 3)}
    <rect x="380" y="110" width="200" height="140" fill="${FRAME}" stroke="${p.wood}" stroke-width="3"/>
    <path d="M400 210 C 440 170, 470 200, 500 160 S 550 180, 560 150" fill="none" stroke="${p.throw}" stroke-width="2"/>
    <path d="M400 230 H 560" stroke="#1d221f" stroke-opacity=".15"/>
    <circle cx="470" cy="180" r="4" fill="${p.wood}"/>
    ${floor(p, 430)}
    <rect x="260" y="330" width="420" height="16" rx="3" fill="${p.wood}"/>
    <rect x="276" y="346" width="10" height="110" fill="${p.wood}"/>
    <rect x="654" y="346" width="10" height="110" fill="${p.wood}"/>
    <rect x="530" y="346" width="134" height="44" fill="${p.wood}"/>
    ${shade(0.1, 530, 366, 134, 2)}
    <path d="M330 330 v -6 h 26 v 6 Z" fill="${p.wood}"/>
    <path d="M343 324 L 372 262" stroke="${p.wood}" stroke-width="4" stroke-linecap="round"/>
    <path d="M372 262 L 410 276" stroke="${p.wood}" stroke-width="4" stroke-linecap="round"/>
    <path d="M396 266 l 36 12 l -8 22 l -36 -12 Z" fill="#efe5cf"/>
    <rect x="440" y="318" width="70" height="12" rx="2" fill="${p.linen}" stroke="#1d221f" stroke-opacity=".1"/>
    <rect x="590" y="300" width="26" height="30" rx="4" fill="${p.throw}"/>
    <path d="M603 300 c -14 -20 -10 -40 -2 -54 M603 300 c 10 -18 22 -26 30 -30 M603 300 c -20 -8 -30 -18 -34 -30" stroke="#6d7a5c" stroke-width="5" fill="none" stroke-linecap="round"/>
    <rect x="360" y="300" width="110" height="130" rx="8" fill="${p.throw}"/>
    ${shade(0.1, 360, 300, 110, 130)}
    <rect x="352" y="400" width="126" height="20" rx="6" fill="${p.throw}"/>
    <rect x="364" y="420" width="8" height="50" fill="${p.wood}"/>
    <rect x="458" y="420" width="8" height="50" fill="${p.wood}"/>`;
}

function porch(p: Palette) {
  let posts = "";
  for (let x = 40; x < 800; x += 36) {
    posts += `<rect x="${x}" y="352" width="10" height="70" fill="${FRAME}"/>`;
  }
  let boards = "";
  for (let y = 432; y < 560; y += 22) {
    boards += `<path d="M0 ${y} H 800" stroke="#1d221f" stroke-opacity=".08"/>`;
  }
  return `
    ${outside("w-porch", 0, 40, 800, 400)}
    <rect x="0" y="0" width="800" height="44" fill="${FRAME}"/>
    ${shade(0.06, 0, 40, 800, 4)}
    <rect x="16" y="40" width="22" height="390" fill="${FRAME}"/>
    <rect x="762" y="40" width="22" height="390" fill="${FRAME}"/>
    ${posts}
    <rect x="0" y="340" width="800" height="14" fill="${FRAME}"/>
    <rect x="0" y="416" width="800" height="10" fill="${FRAME}"/>
    <rect x="0" y="426" width="800" height="134" fill="${p.floor}"/>
    ${boards}
    ${shade(0.06, 0, 426, 800, 6)}
    <g fill="${p.wood}">
      <path d="M160 470 l 30 -110 h 70 l -10 110 Z"/>
      <rect x="140" y="440" width="150" height="16" rx="3"/>
      <rect x="150" y="456" width="10" height="56"/>
      <rect x="272" y="456" width="10" height="56"/>
      <path d="M500 470 l 30 -110 h 70 l -10 110 Z"/>
      <rect x="480" y="440" width="150" height="16" rx="3"/>
      <rect x="490" y="456" width="10" height="56"/>
      <rect x="612" y="456" width="10" height="56"/>
    </g>
    <rect x="196" y="392" width="54" height="44" rx="10" fill="${p.throw}"/>
    <rect x="360" y="452" width="80" height="44" rx="4" fill="${p.wood}"/>
    <rect x="372" y="440" width="22" height="14" rx="3" fill="${p.linen}"/>`;
}

export function roomScene(view: View, p: Palette): string {
  const wall = `<rect width="800" height="560" fill="${p.wall}"/>`;
  switch (view) {
    case "bed":
      return wall + floor(p, 430) + bed(p);
    case "window":
      return wall + windowSeat(p);
    case "bath":
      return wall + bath(p);
    case "desk":
      return wall + desk(p);
    case "porch":
      return wall + porch(p);
  }
}

/** The house on the marsh, wide, with calm sky on the left for the headline. */
export function houseScene(): string {
  let clap = "";
  for (let y = 430; y < 700; y += 14) clap += `<path d="M1010 ${y} H 1400" stroke="#1d221f" stroke-opacity=".06"/>`;
  let wing = "";
  for (let y = 520; y < 700; y += 14) wing += `<path d="M1400 ${y} H 1560" stroke="#1d221f" stroke-opacity=".06"/>`;
  const win = (x: number, y: number, lit = false) => `
    <rect x="${x}" y="${y}" width="44" height="64" fill="${lit ? "#e6cf9c" : "#7f8d88"}"/>
    <path d="M${x + 22} ${y} V ${y + 64} M${x} ${y + 32} H ${x + 44}" stroke="#f3f1ea" stroke-width="4"/>
    <rect x="${x - 6}" y="${y + 64}" width="56" height="6" fill="#f3f1ea"/>`;
  let porchPosts = "";
  for (let x = 1020; x <= 1390; x += 46) porchPosts += `<rect x="${x}" y="620" width="8" height="80" fill="#f3f1ea"/>`;
  return `
    <defs>
      <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#dfe5e2"/>
        <stop offset="1" stop-color="#eeeee7"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#hs-sky)"/>
    <path d="M0 640 C 220 600, 420 628, 640 604 S 1040 620, 1600 596 V 660 H 0 Z" fill="#a3afa7"/>
    <path d="M0 650 C 300 632, 600 648, 900 634 S 1400 640, 1600 630 V 700 H 0 Z" fill="#8b9a91"/>
    <rect x="0" y="690" width="1600" height="80" fill="${WATER}"/>
    <path d="M120 716 h 260 M620 742 h 340 M1180 724 h 220" stroke="${WATER_LINE}" stroke-width="3" stroke-linecap="round"/>
    <path d="M840 704 C 900 684, 1000 680, 1100 682 S 1400 676, 1600 672 V 760 C 1500 752, 1300 748, 1180 752 C 1040 756, 900 744, 840 704 Z" fill="#a6a47c"/>
    <g fill="#55665c">
      <ellipse cx="930" cy="540" rx="70" ry="120"/>
      <ellipse cx="880" cy="600" rx="56" ry="90"/>
      <rect x="922" y="600" width="12" height="100"/>
    </g>
    <path d="M990 430 L 1205 300 L 1420 430 Z" fill="#69736e"/>
    <rect x="1150" y="270" width="34" height="80" fill="#8a7b6c"/>
    <rect x="1010" y="430" width="390" height="270" fill="#f3f1ea"/>
    ${clap}
    <path d="M1385 520 L 1480 470 L 1575 520 Z" fill="#69736e"/>
    <rect x="1400" y="520" width="160" height="180" fill="#ebe8df"/>
    ${wing}
    ${win(1040, 460)}${win(1120, 460, true)}${win(1290, 460)}${win(1182, 360, true)}
    ${win(1450, 548, true)}
    <rect x="990" y="600" width="430" height="20" fill="#69736e"/>
    ${porchPosts}
    ${win(1060, 630, true)}${win(1300, 630)}
    <rect x="1186" y="630" width="40" height="70" fill="#2e4a3d"/>
    <rect x="1000" y="694" width="410" height="10" fill="#d9d5c9"/>
    <path d="M1580 760 H 1460 V 752 H 1600" fill="none" stroke="#7a6a58" stroke-width="8"/>
    <path d="M1480 760 v 24 M1530 760 v 24 M1580 760 v 24" stroke="#7a6a58" stroke-width="6"/>
    <path d="M0 770 C 300 752, 700 778, 1000 760 S 1400 770, 1600 762 V 900 H 0 Z" fill="${MARSH}"/>
    ${reeds(0, 900, 1600, 180, 150, 7)}
    ${reeds(20, 860, 1600, 120, 90, 3)}`;
}

/** A drawn map of the peninsula with the house marked. */
export function mapScene(): string {
  return `
    <rect width="800" height="600" fill="#a9bcb8"/>
    <path d="M0 0 H 600 C 580 70, 600 140, 560 200 C 524 254, 470 292, 474 352 C 478 410, 556 430, 602 474 C 640 510, 622 560, 574 578 C 516 600, 456 566, 432 520 C 408 474, 360 466, 330 512 C 300 560, 262 600, 240 600 H 0 Z" fill="#ece9df"/>
    <path d="M478 372 C 500 408, 548 424, 584 456 C 560 470, 520 470, 492 448 C 470 430, 468 400, 478 372 Z" fill="#c8c39d"/>
    <path d="M700 360 c 20 -12 52 -8 62 10 c 8 16 -8 34 -34 34 c -26 0 -44 -28 -28 -44 Z" fill="#ece9df"/>
    <path d="M140 0 C 160 120, 260 200, 360 250 C 430 286, 470 320, 470 360 C 470 410, 520 450, 560 500" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
    <path d="M140 0 C 160 120, 260 200, 360 250 C 430 286, 470 320, 470 360 C 470 410, 520 450, 560 500" fill="none" stroke="#c2a878" stroke-width="4" stroke-linecap="round"/>
    <path d="M0 96 C 60 90, 110 70, 150 50" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
    <circle cx="560" cy="500" r="11" fill="#2e4a3d"/>
    <circle cx="560" cy="500" r="4" fill="#f8f7f2"/>
    <circle cx="470" cy="352" r="4" fill="#646b66"/>
    <circle cx="732" cy="378" r="4" fill="#646b66"/>
    <g font-family="Hanken Grotesk Variable, system-ui, sans-serif" font-size="15" fill="#4c534e">
      <text x="168" y="40">Route 129 from Wexham</text>
      <text x="16" y="80">Route 1</text>
      <text x="380" y="346">Fish co-op</text>
      <text x="420" y="556" fill="#1d221f" font-weight="500">Saltmarsh House</text>
      <text x="516" y="418" font-size="13">Calder marsh</text>
      <text x="676" y="430" font-size="13">Pemmet Island light</text>
      <text x="640" y="230" font-size="13">Calder Channel</text>
      <text x="380" y="300" font-size="13">Heron Lane</text>
    </g>`;
}
