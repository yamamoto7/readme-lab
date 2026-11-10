// Generates the gallery pieces into works/. Each piece is plain SVG that GitHub renders through <img>.
import { mkdirSync, writeFileSync } from "node:fs";

const here = new URL("..", import.meta.url).pathname;
mkdirSync(`${here}works`, { recursive: true });
const out = (name, s) => writeFileSync(`${here}works/${name}.svg`, s);
const SANS = `-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji'`;
const MONO = `ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace`;

// Deterministic pseudo-random, so regenerating gives the same stars.
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// ---------- 1. Aurora hero ----------
function hero(theme) {
  const dark = theme === "dark";
  const W = 840, H = 280;
  const blobs = dark ? ["#7c3aed", "#0ea5e9", "#ec4899", "#22c55e"] : ["#c4b5fd", "#7dd3fc", "#f9a8d4", "#86efac"];
  seed = 7;
  const stars = dark
    ? Array.from({ length: 70 }, () => {
        const r = rnd() < 0.85 ? 0.8 : 1.5;
        return `<circle cx="${(rnd() * W).toFixed(1)}" cy="${(rnd() * H).toFixed(1)}" r="${r}" fill="#fff" class="s" style="animation-delay:${(rnd() * 4).toFixed(2)}s;opacity:${(0.3 + rnd() * 0.7).toFixed(2)}"/>`;
      }).join("")
    : "";
  const ink = dark ? ["#ffffff", "#c4b5fd"] : ["#0f172a", "#6d28d9"];
  const sub = dark ? "rgba(255,255,255,.72)" : "rgba(15,23,42,.66)";
  const chipFill = dark ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.55)";
  const chipStroke = dark ? "rgba(255,255,255,.18)" : "rgba(15,23,42,.10)";
  const chipText = dark ? "#e2e8f0" : "#334155";
  const chips = ["Go", "Kotlin", "TypeScript", "Open source"];
  let x = 56;
  const chipEls = chips
    .map((c) => {
      const w = c.length * 8.2 + 28;
      const el = `<g transform="translate(${x} 196)"><rect width="${w}" height="30" rx="15" fill="${chipFill}" stroke="${chipStroke}"/><text x="${w / 2}" y="20" text-anchor="middle" style="font-size:13px;font-weight:600;fill:${chipText}">${c}</text></g>`;
      x += w + 10;
      return el;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<clipPath id="c"><rect width="${W}" height="${H}" rx="18"/></clipPath>
<filter id="blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="46"/></filter>
<linearGradient id="ink" x1="0" x2="1"><stop offset="0" stop-color="${ink[0]}"/><stop offset="1" stop-color="${ink[1]}"/>
<animateTransform attributeName="gradientTransform" type="translate" values="-0.3 0;0.3 0;-0.3 0" dur="8s" repeatCount="indefinite"/></linearGradient>
<linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${dark ? 0.25 : 0.9}"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="${dark ? 0.12 : 0.6}"/></linearGradient>
</defs>
<style>
text{font-family:${SANS}}
.b{transform-box:fill-box;transform-origin:center}
.b1{animation:m1 13s ease-in-out infinite alternate}.b2{animation:m2 17s ease-in-out infinite alternate}
.b3{animation:m3 11s ease-in-out infinite alternate}.b4{animation:m4 19s ease-in-out infinite alternate}
@keyframes m1{to{transform:translate(260px,70px) scale(1.25)}}
@keyframes m2{to{transform:translate(-280px,-60px) scale(.85)}}
@keyframes m3{to{transform:translate(-160px,110px) scale(1.3)}}
@keyframes m4{to{transform:translate(200px,-90px) scale(1.1)}}
.s{animation:tw 3.2s ease-in-out infinite}@keyframes tw{50%{opacity:.1}}
.shoot{animation:sh 7s linear infinite}
@keyframes sh{0%,82%{transform:translate(0,0);opacity:0}84%{opacity:1}96%,100%{transform:translate(-340px,170px);opacity:0}}
.wave{transform-box:fill-box;transform-origin:70% 80%;animation:wv 2.6s ease-in-out infinite}
@keyframes wv{0%,60%,100%{transform:rotate(0)}10%,30%{transform:rotate(16deg)}20%,40%{transform:rotate(-8deg)}}
.n{display:none}
@media (max-width:560px){.w{display:none}.n{display:inline}}
@media (prefers-reduced-motion:reduce){.b,.s,.shoot,.wave{animation:none}}
</style>
<g clip-path="url(#c)">
<rect width="${W}" height="${H}" fill="${dark ? "#060816" : "#f8fafc"}"/>
<g filter="url(#blur)" opacity="${dark ? 0.85 : 0.9}">
<circle class="b b1" cx="110" cy="40" r="130" fill="${blobs[0]}"/>
<circle class="b b2" cx="720" cy="250" r="150" fill="${blobs[1]}"/>
<circle class="b b3" cx="520" cy="10" r="105" fill="${blobs[2]}"/>
<circle class="b b4" cx="300" cy="300" r="95" fill="${blobs[3]}"/>
</g>
${stars}
${dark ? `<g class="shoot"><line x1="760" y1="30" x2="840" y2="-10" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/></g>` : ""}
<g class="w">
<text x="56" y="112" style="font-size:52px;font-weight:800;letter-spacing:-1.5px;fill:url(#ink)">Hi, I'm yamamoto7</text>
<text x="512" y="110" style="font-size:44px" class="wave">👋</text>
<text x="58" y="158" style="font-size:19px;fill:${sub}">Software engineer. I fix things in open source.</text>
${chipEls}
</g>
<g class="n">
<text x="${W / 2}" y="132" text-anchor="middle" style="font-size:96px;font-weight:800;letter-spacing:-3px;fill:url(#ink)">yamamoto7</text>
<text x="${W / 2}" y="206" text-anchor="middle" style="font-size:40px;fill:${sub}">Software engineer 👋</text>
</g>
</g>
<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="17.5" fill="none" stroke="url(#edge)" stroke-width="1.5"/>
</svg>`;
}
out("hero-dark", hero("dark"));
out("hero-light", hero("light"));

// ---------- 2. Terminal ----------
function terminal() {
  const W = 840, CH = 9.03; // character width of 15px monospace
  const lines = [
    { t: 0.4, cmd: "whoami" },
    { t: 1.5, out: [["yamamoto7", "#e6edf3"], [" — software engineer, contributing to open source", "#8b949e"]] },
    { t: 2.3, cmd: "gh search prs --author=@me --merged --sort=updated" },
    ...[
      ["grpc-ecosystem/grpc-gateway", "#7653", "support optional enum path params"],
      ["webpro-nl/knip", "#2319", "read Next.js image loader files"],
      ["axllent/mailpit", "#768", "accept `latest` as the message ID"],
      ["detekt/detekt", "#9870", "CouldBeSequence after toList()"],
      ["grafana/mcp-grafana", "#1496", "apply limitPerMetric to metadata"],
    ].map(([repo, num, title], i) => ({
      t: 4.6 + i * 0.28,
      out: [["✓ ", "#3fb950"], [repo.padEnd(29), "#79c0ff"], [num.padEnd(7), "#d2a8ff"], [title, "#c9d1d9"]],
    })),
    { t: 6.4, out: [["14 merged PRs in 10 organizations", "#8b949e"]] },
    { t: 6.9, cmd: "" },
  ];
  const top = 66, lh = 25;
  let y = top;
  const els = [];
  for (const l of lines) {
    if ("cmd" in l) {
      const n = l.cmd.length;
      const dur = Math.max(n * 0.045, 0.01);
      els.push(`<g style="animation:show 0s ${l.t}s forwards" opacity="0">
<text x="28" y="${y}" class="m"><tspan fill="#3fb950">➜</tspan><tspan fill="#56d4dd" dx="9">~</tspan><tspan fill="#e6edf3" dx="9">${l.cmd.replace(/&/g, "&amp;")}</tspan></text>
${n ? `<rect x="${28 + CH * 4}" y="${y - 17}" width="${CH * n + 4}" height="22" fill="#0d1117" style="transform-box:fill-box;transform-origin:right;animation:type ${dur}s steps(${n}) ${l.t + 0.25}s forwards"/>` : ""}
<rect x="${28 + CH * 4}" y="${y - 15}" width="9" height="19" fill="#e6edf3" style="animation:${n ? `caret ${dur}s steps(${n}) ${l.t + 0.25}s forwards,` : ""}blink 1s steps(1) infinite${n ? `,hide 0s ${l.t + 0.25 + dur + 0.3}s forwards` : ""}" class="c" data-n="${n}"/>
</g>`);
    } else {
      els.push(
        `<text x="28" y="${y}" class="m" opacity="0" style="animation:show 0s ${l.t}s forwards" xml:space="preserve">${l.out
          .map(([s, c]) => `<tspan fill="${c}">${s.replace(/&/g, "&amp;")}</tspan>`)
          .join("")}</text>`,
      );
    }
    y += lh;
  }
  const H = y + 12;
  // The caret moves with the typing: one keyframe per command, generated per length.
  const carets = [...new Set(lines.filter((l) => "cmd" in l && l.cmd.length).map((l) => l.cmd.length))]
    .map((n) => `.c[data-n="${n}"]{--d:${(CH * n).toFixed(1)}px}`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><linearGradient id="bar" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2d333b"/><stop offset="1" stop-color="#22272e"/></linearGradient>
<filter id="sh" x="-5%" y="-5%" width="110%" height="120%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-opacity=".35"/></filter></defs>
<style>
.m{font-family:${MONO};font-size:15px;white-space:pre}
text{font-family:${SANS}}
@keyframes show{to{opacity:1}}
@keyframes hide{to{opacity:0}}
@keyframes type{to{transform:scaleX(0)}}
@keyframes caret{to{transform:translateX(var(--d))}}
@keyframes blink{50%{fill-opacity:0}}
${carets}
@media (prefers-reduced-motion:reduce){*{animation-duration:0s!important;animation-delay:0s!important}}
</style>
<g filter="url(#sh)"><rect x="8" y="4" width="${W - 16}" height="${H - 20}" rx="12" fill="#0d1117" stroke="#30363d"/></g>
<path d="M8 16a12 12 0 0 1 12-12h${W - 40}a12 12 0 0 1 12 12v20H8z" fill="url(#bar)"/>
<circle cx="30" cy="20" r="6" fill="#ff5f57"/><circle cx="50" cy="20" r="6" fill="#febc2e"/><circle cx="70" cy="20" r="6" fill="#28c840"/>
<text x="${W / 2}" y="25" text-anchor="middle" style="font-size:13px;fill:#8b949e">yamamoto7 — zsh — 96×12</text>
<g transform="translate(0 6)">${els.join("\n")}</g>
</svg>`;
}
out("terminal", terminal());

// ---------- 3. Bento grid (each tile is its own linked image) ----------
const B = {
  dark: { bg: "#0d1117", card: "#161b22", edge: "#30363d", fg: "#f0f6fc", sub: "#9198a1", glow: 0.55 },
  light: { bg: "#ffffff", card: "#f6f8fa", edge: "#d1d9e0", fg: "#1f2328", sub: "#59636e", glow: 0.35 },
};
const G = 8; // half gutter inside every tile
// On a phone a tile renders at well under half its size, so each tile also carries a "mini" layout with
// big type, swapped in by a width media query inside the SVG. Keyed by the tile's name.
const MINI = {
  oss: (t) => `<text x="40" y="150" style="font-size:120px;font-weight:800;letter-spacing:-4px;fill:${t.fg}">14</text>
<text x="210" y="112" style="font-size:34px;font-weight:700;fill:${t.fg}">merged</text><text x="210" y="152" style="font-size:34px;font-weight:700;fill:${t.fg}">PRs</text>
<text x="40" y="206" style="font-size:28px;fill:${t.sub}">in 10 orgs →</text>`,
  me: (t) => `<g transform="translate(140 104)"><circle r="62" fill="url(#mono)"/><text y="18" text-anchor="middle" style="font-size:50px;font-weight:800;fill:#fff">Y7</text></g>
<text x="140" y="212" text-anchor="middle" style="font-size:30px;font-weight:700;fill:${t.fg}">GitHub →</text>`,
  now: (t) => `<circle cx="52" cy="62" r="14" fill="#3fb950"/>
<text x="36" y="132" style="font-size:40px;font-weight:800;fill:${t.fg}">readme</text><text x="36" y="174" style="font-size:40px;font-weight:800;fill:${t.fg}">-lab</text>`,
  stack: (t) => `<rect x="36" y="44" width="104" height="22" rx="4" fill="#00add8"/><rect x="142" y="44" width="44" height="22" rx="4" fill="#a97bff"/><rect x="188" y="44" width="56" height="22" rx="4" fill="#8b949e"/>
<text x="36" y="136" style="font-size:52px;font-weight:800;fill:${t.fg}">Go</text><text x="36" y="180" style="font-size:32px;fill:${t.sub}">50% of PRs</text>`,
  theme: (t) => `<text x="140" y="140" text-anchor="middle" style="font-size:96px">${t === B.dark ? "🌙" : "☀️"}</text>`,
};
let nextMini = null;
function tile(theme, w, h, inner, extraDefs = "", extraStyle = "") {
  const t = B[theme];
  const mini = nextMini;
  nextMini = null;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><clipPath id="k"><rect x="${G}" y="${G}" width="${w - 2 * G}" height="${h - 2 * G}" rx="16"/></clipPath>${extraDefs}</defs>
<style>text{font-family:${SANS}}.t{font-size:13px;font-weight:600;letter-spacing:.06em;fill:${t.sub}}.a{fill:${t.sub};font-size:13px}
.mini{display:none}@media (max-width:${Math.round(w * 0.7)}px){.full{display:none}.mini{display:inline}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}${extraStyle}</style>
<g clip-path="url(#k)"><rect x="${G}" y="${G}" width="${w - 2 * G}" height="${h - 2 * G}" fill="${t.card}"/><g class="full">${inner(t)}</g>${mini ? `<g class="mini">${mini(t)}</g>` : ""}</g>
<rect x="${G + 0.5}" y="${G + 0.5}" width="${w - 2 * G - 1}" height="${h - 2 * G - 1}" rx="15.5" fill="none" stroke="${t.edge}"/>
</svg>`;
}
for (const theme of ["dark", "light"]) {
  // Big tile: merged PR count with rising bars.
  const bars = [3, 2, 2, 1, 1, 1, 1, 1, 1, 1]; // merged PRs per organization on the card
  out(
    ((nextMini = MINI.oss), `bento-oss-${theme}`),
    tile(
      theme,
      560,
      240,
      (t) => `
<circle cx="470" cy="40" r="120" fill="#2f81f7" opacity="${t.glow * 0.5}" filter="url(#g)"/>
<text x="36" y="52" class="t">OPEN SOURCE</text>
<text x="34" y="128" style="font-size:72px;font-weight:800;letter-spacing:-2px;fill:${t.fg}">14</text>
<text x="36" y="160" style="font-size:16px;fill:${t.sub}">merged PRs in 10 organizations</text>
<text x="36" y="206" class="a">grpc-gateway · knip · mailpit · detekt</text>
${bars
  .map(
    (v, i) =>
      `<rect x="${372 + i * 15}" y="${206 - v * 30}" width="10" height="${v * 30}" rx="3" fill="url(#bg)" style="transform-box:fill-box;transform-origin:bottom;animation:rise .9s cubic-bezier(.2,.8,.2,1) ${(0.1 + i * 0.07).toFixed(2)}s both"/>`,
  )
  .join("")}`,
      `<filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#58a6ff"/><stop offset="1" stop-color="#1f6feb" stop-opacity=".5"/></linearGradient>`,
      `@keyframes rise{from{transform:scaleY(0)}}`,
    ),
  );
  // Profile tile: monogram with a rotating conic-like ring.
  out(
    ((nextMini = MINI.me), `bento-me-${theme}`),
    tile(
      theme,
      280,
      240,
      (t) => `
<g transform="translate(140 96)">
<circle r="46" fill="none" stroke="url(#ring)" stroke-width="4" stroke-linecap="round" stroke-dasharray="200 90" style="animation:spin 6s linear infinite"/>
<circle r="38" fill="url(#mono)"/>
<text y="11" text-anchor="middle" style="font-size:30px;font-weight:800;fill:#fff">Y7</text>
</g>
<text x="140" y="176" text-anchor="middle" style="font-size:18px;font-weight:700;fill:${t.fg}">yamamoto7</text>
<text x="140" y="200" text-anchor="middle" class="a">Follow on GitHub →</text>`,
      `<linearGradient id="ring" x1="0" x2="1"><stop offset="0" stop-color="#a371f7"/><stop offset="1" stop-color="#2f81f7"/></linearGradient>
<linearGradient id="mono" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8957e5"/><stop offset="1" stop-color="#1f6feb"/></linearGradient>`,
      `@keyframes spin{to{transform:rotate(360deg)}}`,
    ),
  );
  // Now tile: pulsing live dot.
  out(
    ((nextMini = MINI.now), `bento-now-${theme}`),
    tile(
      theme,
      280,
      200,
      (t) => `
<text x="36" y="52" class="t">NOW</text>
<circle cx="42" cy="88" r="6" fill="#3fb950"/><circle cx="42" cy="88" r="6" fill="none" stroke="#3fb950" stroke-width="2" style="transform-box:fill-box;transform-origin:center;animation:ping 1.8s cubic-bezier(0,0,.2,1) infinite"/>
<text x="58" y="93" style="font-size:15px;font-weight:600;fill:${t.fg}">Building</text>
<text x="36" y="128" style="font-size:20px;font-weight:700;fill:${t.fg}">readme-lab</text>
<text x="36" y="154" class="a">How far can a README go?</text>`,
      "",
      `@keyframes ping{75%,100%{transform:scale(2.6);opacity:0}}`,
    ),
  );
  // Stack tile: language bar that fills in.
  const langs = [["Go", "#00add8", 50], ["Kotlin", "#a97bff", 21], ["TypeScript", "#3178c6", 7], ["Swift, Ruby, Python", "#8b949e", 22]]; // the 14 merged PRs on the card, by repo language
  let lx = 36;
  const segs = langs
    .map(([, c, p], i) => {
      const w = (208 * p) / 100;
      const el = `<rect x="${lx}" y="74" width="${w - 2}" height="10" rx="2" fill="${c}" style="transform-box:fill-box;transform-origin:left;animation:fill .7s ease-out ${(0.2 + i * 0.25).toFixed(2)}s both"/>`;
      lx += w;
      return el;
    })
    .join("");
  out(
    ((nextMini = MINI.stack), `bento-stack-${theme}`),
    tile(
      theme,
      280,
      200,
      (t) => `
<text x="36" y="52" class="t">LANGUAGES IN MY PRS</text>
${segs}
${langs.map(([n, c, p], i) => `<g transform="translate(36 ${112 + i * 21})"><circle cx="5" cy="-5" r="5" fill="${c}"/><text x="16" y="0" style="font-size:14px;fill:${t.fg}">${n}</text><text x="208" y="0" text-anchor="end" class="a">${p}%</text></g>`).join("")}`,
      "",
      `@keyframes fill{from{transform:scaleX(0)}}`,
    ),
  );
  // Theme tile: sun or moon, matching the theme it is shown in.
  out(
    ((nextMini = MINI.theme), `bento-theme-${theme}`),
    tile(
      theme,
      280,
      200,
      (t) =>
        `<text x="36" y="52" class="t">THEME</text>` +
        (theme === "dark"
          ? `<g transform="translate(206 104)"><g style="animation:float 4s ease-in-out infinite"><circle r="30" fill="#e3b341"/><circle cx="14" cy="-10" r="28" fill="${t.card}"/></g></g>
<circle cx="160" cy="80" r="1.5" fill="#fff" style="animation:tw 2s infinite"/><circle cx="236" cy="150" r="1.2" fill="#fff" style="animation:tw 2.6s .5s infinite"/>`
          : `<g transform="translate(206 100)"><g style="animation:spin 14s linear infinite">${Array.from({ length: 8 }, (_, i) => `<rect x="-2" y="-46" width="4" height="12" rx="2" fill="#d4a72c" transform="rotate(${i * 45})"/>`).join("")}</g><circle r="24" fill="#f2cc60"/></g>`) +
        `<text x="36" y="138" style="font-size:20px;font-weight:700;fill:${t.fg}">${theme === "dark" ? "Good night" : "Good morning"}</text>
<text x="36" y="162" class="a">Switch GitHub's theme to see</text>`,
      "",
      `@keyframes float{50%{transform:translateY(-8px)}}@keyframes tw{50%{opacity:.15}}@keyframes spin{to{transform:rotate(360deg)}}`,
    ),
  );
}
console.log("works ok");
