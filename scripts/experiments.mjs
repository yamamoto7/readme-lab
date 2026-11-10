// Generates the experiment SVGs and README for yamamoto7/readme-lab.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const here = new URL("..", import.meta.url).pathname;
mkdirSync(`${here}img`, { recursive: true });
const W = 495;
const FONT = `-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif,'Apple Color Emoji'`;
const T = {
  light: { bg: "#ffffff", fg: "#1f2328", sub: "#59636e", border: "#d1d9e0", accent: "#0969da", soft: "#f6f8fa" },
  dark: { bg: "#0d1117", fg: "#f0f6fc", sub: "#9198a1", border: "#3d444d", accent: "#4493f8", soft: "#151b23" },
};
const write = (name, s) => writeFileSync(`${here}img/${name}.svg`, s);
const svg = (h, body, style = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}"><style>text{font-family:${FONT}}${style}</style>${body}</svg>`;
const box = (t, h, title, sub) =>
  `<rect x="0.5" y="0.5" width="${W - 1}" height="${h - 1}" rx="6" fill="${t.bg}" stroke="${t.border}"/>` +
  `<text x="20" y="${h / 2 - 3}" style="font-size:15px;font-weight:600;fill:${t.fg}">${title}</text>` +
  `<text x="20" y="${h / 2 + 16}" style="font-size:12px;fill:${t.sub}">${sub}</text>`;

// 1. Theme: <picture> (follows GitHub's theme setting).
for (const [k, t] of Object.entries(T)) write(`theme-picture-${k}`, svg(64, box(t, 64, `&lt;picture&gt;: ${k}`, "Follows the theme set in GitHub")));
// 1b. Theme inside the SVG (follows the OS / browser).
write(
  "theme-inner",
  svg(
    64,
    box(T.light, 64, `@media inside the SVG: <tspan class="l">light</tspan><tspan class="d">dark</tspan>`, "Follows the OS / browser, not GitHub's setting"),
    `.d{display:none}@media (prefers-color-scheme:dark){rect{fill:${T.dark.bg};stroke:${T.dark.border}}text{fill:${T.dark.sub}!important}.l{display:none}.d{display:inline}}`,
  ),
);

// 2. Responsive: one SVG that changes layout with its own rendered width.
const resp = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="64" viewBox="0 0 ${W} 64"><style>
text{font-family:${FONT}}.n{display:none}
@media (max-width:420px){.w{display:none}.n{display:inline}}
</style>${box(T.light, 64, "", "")}
<text x="20" y="30" style="font-size:15px;font-weight:600;fill:${T.light.fg}"><tspan class="w">Wide layout: rendered ≥ 420px</tspan><tspan class="n" style="font-size:22px">Narrow layout</tspan></text>
<text x="20" y="48" style="font-size:12px;fill:${T.light.sub}"><tspan class="w">An @media (max-width) inside the SVG sees the &lt;img&gt; width</tspan><tspan class="n" style="font-size:16px">Bigger text on phones</tspan></text></svg>`;
write("responsive-inner", resp);
// 2b. Responsive with <picture media="(max-width: …)">: different files.
write("responsive-wide", svg(64, box(T.light, 64, "&lt;picture&gt; wide variant", "Shown when the window is wider than 600px")));
write("responsive-narrow", svg(64, box(T.light, 64, "&lt;picture&gt; narrow variant", "Shown when the window is 600px or narrower")));
// 2c. Compound: dark and narrow.
write("compound-dark-narrow", svg(64, box(T.dark, 64, "dark AND narrow", "(prefers-color-scheme: dark) and (max-width: 600px)")));
write("compound-dark", svg(64, box(T.dark, 64, "dark", "(prefers-color-scheme: dark)")));
write("compound-light", svg(64, box(T.light, 64, "light (fallback)", "No media query matched")));

// 3. Pointer: touch vs mouse.
write("pointer-touch", svg(64, box(T.light, 64, "👆 Tap a row to open it", "(hover: none): touch screens")));
write("pointer-mouse", svg(64, box(T.light, 64, "🖱️ Click a row to open it", "Fallback: devices with a mouse")));

// 4. Animation, with reduced motion handled inside the SVG and via <picture>.
const anim = (reducedInside) =>
  svg(
    64,
    `${box(T.light, 64, "", "")}<rect class="bar" x="20" y="40" width="0" height="6" rx="3" fill="${T.light.accent}"/>
<text x="20" y="30" style="font-size:15px;font-weight:600;fill:${T.light.fg}">CSS animation${reducedInside ? " (stops with reduced motion)" : ""}</text>`,
    `@keyframes g{from{width:0}to{width:455px}}.bar{animation:g 2.4s ease-out infinite}` +
      (reducedInside ? `@media (prefers-reduced-motion:reduce){.bar{animation:none;width:455px;fill:#d1242f}}` : ""),
  );
write("anim", anim(true));
write("anim-static", svg(64, box(T.light, 64, "Static fallback", "&lt;picture media=&quot;(prefers-reduced-motion: reduce)&quot;&gt;")));
// Count-up with SMIL: swap digits over time.
const steps = [0, 3, 7, 10, 12, 14];
write(
  "countup",
  svg(
    64,
    `${box(T.light, 64, "", "")}<text x="20" y="40" style="font-size:22px;font-weight:700;fill:${T.light.fg}">` +
      steps
        .map(
          (n, i) =>
            `<tspan x="20" opacity="0">${n}<set attributeName="opacity" to="1" begin="${i * 0.15}s" end="${i === steps.length - 1 ? "indefinite" : `${(i + 1) * 0.15}s`}"/></tspan>`,
        )
        .join("") +
      `</text><text x="70" y="40" style="font-size:15px;fill:${T.light.sub}">merged PRs (SMIL &lt;set&gt; count-up)</text>`,
  ),
);

// 5. foreignObject: HTML + CSS layout inside the SVG.
write(
  "foreign",
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="72" viewBox="0 0 ${W} 72"><foreignObject width="${W}" height="72"><div xmlns="http://www.w3.org/1999/xhtml" style="box-sizing:border-box;height:72px;display:flex;align-items:center;gap:10px;padding:0 20px;border-radius:8px;font-family:${FONT};color:#fff;background:linear-gradient(120deg,#6e40c9,#0969da 60%,#1a7f37)">
<b style="font-size:16px">foreignObject</b><span style="font-size:12px;border:1px solid rgba(255,255,255,.7);border-radius:99px;padding:2px 10px">flexbox</span><span style="font-size:12px;border:1px solid rgba(255,255,255,.7);border-radius:99px;padding:2px 10px">auto text wrap in HTML</span></div></foreignObject></svg>`,
);

// 6. Embedded web font (subset would be smaller; this is a demo).
const ttf = readFileSync("/System/Library/Fonts/Supplemental/Chalkduster.ttf").toString("base64");
write(
  "webfont",
  svg(64, `${box(T.light, 64, "", "")}<text x="20" y="40" style="font-family:E;font-size:22px;fill:${T.light.fg}">Embedded web font</text>`, `@font-face{font-family:E;src:url(data:font/ttf;base64,${ttf})}`),
);

// 7. Expandable rows with <details>.
write("details-summary", svg(40, box(T.light, 40, "", "").replace(/<text[^]*$/, "") + `<text x="20" y="25" style="font-size:13px;fill:${T.light.accent}">▸ 3 more PRs (click to expand)</text>`));
for (const n of [1, 2, 3]) write(`details-row-${n}`, svg(40, `<rect x="0.5" y="0.5" width="${W - 1}" height="39" fill="${T.light.soft}" stroke="${T.light.border}"/><text x="20" y="25" style="font-size:13px;fill:${T.light.fg}">Hidden row ${n}, linked</text>`));

const pic = (light, dark, alt, extra = "") =>
  `<picture>${extra}<source media="(prefers-color-scheme: dark)" srcset="../img/${dark}.svg"><img src="../img/${light}.svg" alt="${alt}" width="${W}"></picture>`;

const readme = `# README lab

Experiments for the article "GitHub READMEで、どこまでリッチなカードを作れるか": what a GitHub README can render, tested on github.com.
Each section shows one technique. Switch GitHub's theme, resize the window or open this page on a phone to see them react.

## 1. Theme switching

${pic("theme-picture-light", "theme-picture-dark", "picture theme test")}

<img src="../img/theme-inner.svg" alt="theme inside the SVG" width="${W}">

<img src="../img/theme-picture-dark.svg#gh-dark-mode-only" alt="legacy dark fragment" width="${W}">
<img src="../img/theme-picture-light.svg#gh-light-mode-only" alt="legacy light fragment" width="${W}">

## 2. Responsive

<img src="../img/responsive-inner.svg" alt="responsive inside the SVG" width="${W}">

<picture><source media="(max-width: 600px)" srcset="../img/responsive-narrow.svg"><img src="../img/responsive-wide.svg" alt="responsive picture" width="${W}"></picture>

<picture><source media="(prefers-color-scheme: dark) and (max-width: 600px)" srcset="../img/compound-dark-narrow.svg"><source media="(prefers-color-scheme: dark)" srcset="../img/compound-dark.svg"><img src="../img/compound-light.svg" alt="compound media query" width="${W}"></picture>

## 3. Touch or mouse

<picture><source media="(hover: none)" srcset="../img/pointer-touch.svg"><img src="../img/pointer-mouse.svg" alt="pointer test" width="${W}"></picture>

## 4. Animation

<img src="../img/anim.svg" alt="CSS animation" width="${W}">

<picture><source media="(prefers-reduced-motion: reduce)" srcset="../img/anim-static.svg"><img src="../img/countup.svg" alt="SMIL count-up" width="${W}"></picture>

## 5. foreignObject and web fonts

<img src="../img/foreign.svg" alt="foreignObject" width="${W}">

<img src="../img/webfont.svg" alt="embedded web font" width="${W}">

## 6. Expandable rows

<details><summary><picture><img src="../img/details-summary.svg" alt="3 more PRs" width="${W}" align="left"></picture></summary>
<a href="https://github.com/yamamoto7/readme-lab/tree/main/experiments#1-theme-switching" title="Hidden row 1"><picture><img src="../img/details-row-1.svg" alt="row 1" width="${W}" align="left"></picture></a>
<a href="https://github.com/yamamoto7/readme-lab/tree/main/experiments#2-responsive" title="Hidden row 2"><picture><img src="../img/details-row-2.svg" alt="row 2" width="${W}" align="left"></picture></a>
<a href="https://github.com/yamamoto7/readme-lab/tree/main/experiments#3-touch-or-mouse" title="Hidden row 3"><picture><img src="../img/details-row-3.svg" alt="row 3" width="${W}" align="left"></picture></a>
<br clear="all">
</details>

## 7. Tooltips

<a href="https://github.com/yamamoto7/oss-activity-card" title="title on the link: shown on hover"><picture><img src="../img/pointer-mouse.svg" alt="tooltip test" title="title on the image" width="${W}"></picture></a>
`;
writeFileSync(`${here}experiments/README.md`, readme);
console.log("ok");
