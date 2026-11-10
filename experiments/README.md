# README lab

Experiments for the article "GitHub READMEで、どこまでリッチなカードを作れるか": what a GitHub README can render, tested on github.com.
Each section shows one technique. Switch GitHub's theme, resize the window or open this page on a phone to see them react.

## 1. Theme switching

<picture><source media="(prefers-color-scheme: dark)" srcset="../img/theme-picture-dark.svg"><img src="../img/theme-picture-light.svg" alt="picture theme test" width="495"></picture>

<img src="../img/theme-inner.svg" alt="theme inside the SVG" width="495">

<img src="../img/theme-picture-dark.svg#gh-dark-mode-only" alt="legacy dark fragment" width="495">
<img src="../img/theme-picture-light.svg#gh-light-mode-only" alt="legacy light fragment" width="495">

## 2. Responsive

<img src="../img/responsive-inner.svg" alt="responsive inside the SVG" width="495">

<picture><source media="(max-width: 600px)" srcset="../img/responsive-narrow.svg"><img src="../img/responsive-wide.svg" alt="responsive picture" width="495"></picture>

<picture><source media="(prefers-color-scheme: dark) and (max-width: 600px)" srcset="../img/compound-dark-narrow.svg"><source media="(prefers-color-scheme: dark)" srcset="../img/compound-dark.svg"><img src="../img/compound-light.svg" alt="compound media query" width="495"></picture>

## 3. Touch or mouse

<picture><source media="(hover: none)" srcset="../img/pointer-touch.svg"><img src="../img/pointer-mouse.svg" alt="pointer test" width="495"></picture>

## 4. Animation

<img src="../img/anim.svg" alt="CSS animation" width="495">

<picture><source media="(prefers-reduced-motion: reduce)" srcset="../img/anim-static.svg"><img src="../img/countup.svg" alt="SMIL count-up" width="495"></picture>

## 5. foreignObject and web fonts

<img src="../img/foreign.svg" alt="foreignObject" width="495">

<img src="../img/webfont.svg" alt="embedded web font" width="495">

## 6. Expandable rows

<details><summary><picture><img src="../img/details-summary.svg" alt="3 more PRs" width="495" align="left"></picture></summary>
<a href="https://github.com/yamamoto7/readme-lab/tree/main/experiments#1-theme-switching" title="Hidden row 1"><picture><img src="../img/details-row-1.svg" alt="row 1" width="495" align="left"></picture></a>
<a href="https://github.com/yamamoto7/readme-lab/tree/main/experiments#2-responsive" title="Hidden row 2"><picture><img src="../img/details-row-2.svg" alt="row 2" width="495" align="left"></picture></a>
<a href="https://github.com/yamamoto7/readme-lab/tree/main/experiments#3-touch-or-mouse" title="Hidden row 3"><picture><img src="../img/details-row-3.svg" alt="row 3" width="495" align="left"></picture></a>
<br clear="all">
</details>

## 7. Tooltips

<a href="https://github.com/yamamoto7/oss-activity-card" title="title on the link: shown on hover"><picture><img src="../img/pointer-mouse.svg" alt="tooltip test" title="title on the image" width="495"></picture></a>
