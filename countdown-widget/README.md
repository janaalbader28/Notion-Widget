# Countdown Widget

A tiny pixel-art countdown widget for Notion: a "days left" counter next to
a card with the event's title and date, both on a plain white background.
Plain HTML/CSS/JS, no build step, no backend.

## Files

```
index.html   structure/content
style.css    all styling
script.js    event list + countdown logic
images/      christmas.png, easter.png, reading-week-1.png, reading-week-2.png,
             bank-holiday-1.png, bank-holiday-2.png, bank-holiday-3.png
```

## 1. Where to put the event images

Drop your pixel-art images into the `images/` folder, named exactly:

- `images/christmas.png`
- `images/easter.png`
- `images/reading-week-1.png`
- `images/reading-week-2.png`
- `images/bank-holiday-1.png`
- `images/bank-holiday-2.png`
- `images/bank-holiday-3.png`

These names are already wired up in `script.js`. If you use different
filenames, update the `image` field for that event. Omit the `image` field
entirely for an event that shouldn't show one.

## 2. Where to edit events and dates

Open `script.js` and edit the `events` array at the top:

```js
{
  title: 'Christmas',
  start: new Date(2026, 11, 23, 17, 30), // month is 0-indexed (11 = December)
  end: new Date(2027, 0, 4, 9, 0),
  image: 'images/christmas.png',
},
```

- `start` is the countdown target (and the start of the displayed date range).
- `end` is only used for the displayed date range — omit it (or set to
  `null`) for single-day events like the Bank Holidays.
- Events are sorted by `start` automatically, so they can be listed in any
  order.

The widget always counts down to the nearest event whose `start` is still in
the future, and moves on to the next one automatically once that time
passes — no manual switching needed.

## 3. How to deploy to Vercel

**Option A — Vercel dashboard (no terminal needed)**
1. Go to https://vercel.com and sign in.
2. Click "Add New… → Project", then "Deploy" and drag-and-drop this
   `countdown-widget` folder (or connect a GitHub repo and set this folder
   as the project's root directory).
3. Vercel auto-detects it as a static site — no settings to change. Click
   Deploy.
4. You'll get a URL like `https://your-project.vercel.app`.

**Option B — Vercel CLI**
```bash
npm install -g vercel
cd /path/to/countdown-widget
vercel        # follow the prompts
vercel --prod # deploy to your production URL
```

## 4. How to embed the Vercel URL into Notion

1. Copy your deployed URL (e.g. `https://your-project.vercel.app`).
2. In Notion, type `/embed` and press Enter, or paste the URL directly on
   its own line and choose "Embed" when Notion prompts you.
3. Resize the embed block by dragging its corner handles — the widget is
   responsive and the two cards stay side by side.
