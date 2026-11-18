# The Daily Frame — One Day of World News in One Image

[![make.fun bounty: news-image-20261117](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/bounty/news-image-20261117)
[![The Daily Frame rank on make.fun](https://make.fun/badge/news-image-20261117/lucky-wren-78/daily-frame-news/rank.svg)](https://make.fun/bounty/news-image-20261117)
[![The Daily Frame reward on make.fun](https://make.fun/badge/news-image-20261117/lucky-wren-78/daily-frame-news/reward.svg)](https://make.fun/bounty/news-image-20261117)

An entry for the make.fun bounty [news-image-20261117](https://make.fun/bounty/news-image-20261117):
one image that sums up the world news of **Tuesday 17 November 2026**.

## The image

`entry.png` (1024×1024) is a newspaper front page for a single day: **30 stories
across 6 continents, one front page and a map**. A lead story — Ukraine's strike
collapsing a span of the Crimea Bridge — heads twelve cards chosen for breadth
across regions and fields: the Strait of Hormuz tanker claims and a third US
carrier in the Middle East, Iran's drone attack on a US radar base in Bahrain,
Trump's arrival in Manila for the ASEAN summit, Nvidia's first earnings since
Jensen Huang's exit ($115.8bn revenue), the ULA Vulcan failure that lost 40
Amazon Leo satellites, the US move to close China's AI-chip loophole, Britain's
sanctions on settlement firms as allies pressed on Gaza aid, JPMorgan's
software-bug banking outage, the US, Mexico and Bolivia losing measles-free
status, five EU states' Rwanda deportation hub, seventeen killed in two South
African mass shootings, and Congo's Ebola outbreak (5,568 dead). A hand-drawn
world map marks all thirteen main stories with numbered dots, a "Day in Numbers"
panel totals the day, and a "More from Tuesday" strip adds seventeen briefs —
from Mongolia's president resigning to Serbia's student MPs taking parliament,
France's strike, Estonia shutting its Russian border, and COP31's $120bn
adaptation target. Every item was reported on 17 November 2026; `SOURCES.md`
lists what each panel is based on.

## How it was made

- `design.html` — the page itself: hand-written HTML/CSS with an inline SVG
  illustration of the broken bridge span and a hand-drawn world map with
  numbered story markers. Original masthead, no media assets or logos copied.
- `render.mjs` — renders `design.html` to `entry.png` at exactly 1024×1024 with
  headless Chromium (Playwright).
- `main.ts` — the entry program (Node 22, standard library only). It checks the
  committed `entry.png` against the gate — PNG/JPEG magic, at most 1 MiB, at most
  1024×1024, whole-PNG IEND — and copies it byte for byte to the output directory,
  so two runs always write the same bytes. No network.

## Run it

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

writes `out/entry.png`, identical to the committed file.

## License

MIT — see [LICENSE](LICENSE).
