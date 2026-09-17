# Cat Mode Widget

A tiny pixel-art widget for picking one of three "modes," made to be embedded
in a Notion page. Plain HTML/CSS/JS, no build step, no backend.

## Files

```
index.html   structure/content
style.css    all styling + colors
script.js    click handling + localStorage
images/      background.jpg, cat1.png, cat2.png, cat3.png
```

## 1. Where to put the three cat images

Drop your three pixel-art cat files into the `images/` folder, named:

- `images/cat1.png`
- `images/cat2.png`
- `images/cat3.png`

(These names are already wired up in `index.html`. If you use different
filenames, update the three `src="images/..."` attributes on the `<img>`
tags in `index.html`.)

## 2. Where to put the background image

Put it at `images/background.jpg`. It's referenced in `style.css` under
`.widget-bg { background-image: url('images/background.jpg'); }`. If your
file is a `.png` instead, update that one line to match.

## 3. Where to change the title

Open `index.html` and edit the text inside:

```html
<h1 class="title">✦ Choose Your Mode ✦</h1>
```

## 4. Where to change the three mode ids

There are no visible labels under the cats — each button just carries an
internal `data-mode` id, used only as the key saved to localStorage. Edit
it in `index.html` if you want different ids:

```html
<button class="cat-option" type="button" data-mode="cat1" aria-pressed="false">
  <span class="cat-visual">
    <span class="ring" aria-hidden="true"></span>
    <img class="cat-img" src="images/cat1.png" alt="Cat 1">
  </span>
</button>
```

Repeat for the `cat2` and `cat3` buttons.

## 5. How to deploy to Vercel

**Option A — Vercel dashboard (no terminal needed)**
1. Go to https://vercel.com and sign in.
2. Click "Add New… → Project", then "Deploy" and drag-and-drop this
   `mood-tracker` folder (or connect a GitHub repo and set this folder as
   the project's root directory).
3. Vercel auto-detects it as a static site — no settings to change. Click
   Deploy.
4. You'll get a URL like `https://your-project.vercel.app`.

**Option B — Vercel CLI**
```bash
npm install -g vercel
cd /path/to/mood-tracker
vercel        # follow the prompts
vercel --prod # deploy to your production URL
```

## 6. How to embed the Vercel URL into Notion

1. Copy your deployed URL (e.g. `https://your-project.vercel.app`).
2. In Notion, type `/embed` and press Enter, or paste the URL directly on
   its own line and choose "Embed" when Notion prompts you.
3. Resize the embed block by dragging its corner handles — the widget is
   responsive and will scale to fit.

That's it — the selected cat is remembered per-browser via `localStorage`,
so it stays selected after refreshing the Notion page.
