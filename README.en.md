# Notion Blog Project

[한국어](./README.md) · [English](./README.en.md)

[![DEMO](https://img.shields.io/badge/BLOG%20DEMO-2d55ff)](https://www.chipmunk-world.com/)

- ✏️ Write your posts in Notion
- ⚙️ Easy site configuration
- 🎨 Theme customization powered by [vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract)
- 📊 Google Analytics support
- 🤖 Sentry support

<br />

## 🚀 Getting Started

![image](https://github.com/im-ian/notion-blog/assets/38205068/fdc98dfd-c6df-4f1e-9909-e756ee08b29b)

Fork this repository and clone it to your workspace.

![image](https://github.com/im-ian/notion-blog/assets/38205068/56ade899-23bd-4544-8625-154ecad129ae)

Duplicate [this Notion template](https://imian.notion.site/7cdd2b347b734b7caeb754d8701a4b57?v=c9d11f25b61b4d249d45f3b4dde4c2f2&pvs=4) into your own workspace.

![image](https://github.com/im-ian/notion-blog/assets/38205068/0dff2c40-8464-4140-92c2-f865e5067cf2)

Find your own ![#f03c15](https://placehold.co/13x13/f03c15/f03c15.png) `NOTION_BLOG_PAGE_ID` and ![#1589F0](https://placehold.co/13x13/1589F0/1589F0.png) `NOTION_VIEW_ID`.

![image](https://github.com/im-ian/notion-blog/assets/38205068/62d3c169-d47b-4e78-80d4-192fe446b1c6)

Add the values above to Vercel `Environment Variables`.

To enable Sentry error tracking, all four env vars below must be set.

- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_AUTH_TOKEN`
- `SENTRY_DSN`

`Sentry.init()` is activated only when all four are present.

![image](https://github.com/im-ian/notion-blog/assets/38205068/47731fd6-e4b0-4bfa-a0b4-c9ef9471f409)

Deploy on [Vercel](https://vercel.com/) and you're done.

<br />

## 💻 Development

```shell
cp .env.example .env
```

For local development, copy `.env.example` to `.env`, then run:

```shell
yarn && yarn dev
# or
npm install && npm dev
```

<br />

## 🎨 Customize

```ts
import type { Config } from "@/types";

const CONFIG: Config = {
  profile: {
    // utterances repo for comments (owner/repo). Comments disabled if empty.
    repo: "im-ian/notion-blog",
    github: "im-ian",
  },
  // ...
};
```

You can adjust the following groups in `site.config.ts` (see option tables below).

- profile
- notion
- meta (SEO)
- site
- theme
- search
- posts
- comments
- rss
- footer

### `profile`

| Key | Type | Description |
|-----|------|-------------|
| `name` | `string` | Display name |
| `profileImage` | `string \| undefined` | Avatar URL |
| `bio` | `string \| undefined` | Short bio |
| `repo` | `string \| undefined` | utterances GitHub repo (`owner/repo`). Comments disabled when omitted |
| `github` | `string \| undefined` | GitHub username |
| `linkedin` | `string \| undefined` | LinkedIn URL |
| `instagram` | `string \| undefined` | Instagram URL |
| `twitter` | `string \| undefined` | Twitter/X URL |
| `threads` | `string \| undefined` | Threads URL |

### `notion`

| Key | Type | Description |
|-----|------|-------------|
| `blogPageId` | `string` | Notion DB page ID. Provided via `NOTION_BLOG_PAGE_ID` env |
| `viewId` | `string` | Notion view ID. Provided via `NOTION_VIEW_ID` env. The `?v=...` portion of the URL |
| `useViewIdFilter` | `boolean` | When `true`, results from the chosen Notion view are used as-is. Code-side filters (`posts.useScheduled`, `status==Public`) are bypassed (delegated to the view). Default `false` |

#### `useViewIdFilter` behavior

| Value | Behavior |
|-------|----------|
| `false` (default) | Fetch all posts and apply code filters (`posts.useScheduled`, `status==Public`) |
| `true` | Use only the rows from the configured Notion view. Sorting, filtering, and hidden columns all follow the view. Falls back to default behavior automatically (with a console warning) if the view ID is invalid |

To set up your own view:

1. In your Notion DB, click `+` in the upper right and add a new view (configure filters/sorting freely)
2. With that view open, copy the `?v=<viewId>` portion of the URL
3. Save it as the `NOTION_VIEW_ID` env var
4. Toggle `notion.useViewIdFilter` to `true`

### `meta`

Accepts `Next.js Metadata` directly, with the following extra keys.

| Key | Type | Description |
|-----|------|-------------|
| `siteUrl` | `string \| undefined` | Canonical domain. Used by sitemap, RSS, and the layout's `metadataBase`. Falls back to `process.env.SITE_URL` (one of the two is required in production) |
| `ogImage` | `string \| undefined` | Default OG image. Also used as a fallback when a post has no thumbnail |

### `site`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `lang` | `string` | `"ko"` | `<html lang>` value |
| `title` | `string` | — | Site title, shown in the header |
| `stickyProfile` | `boolean` | `false` | Sticky desktop sidebar profile while scrolling |

### `theme`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `mode` | `"auto" \| "light" \| "dark"` | `"auto"` | Initial theme. `auto` follows OS settings. User toggle is persisted in localStorage and takes precedence afterwards |
| `showToggle` | `boolean` | `true` | Show the dark-mode toggle button in the header. Set to `false` if you want to enforce `mode` |

### `search`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `shortcut` | `boolean` | `true` | Enable the search keyboard shortcut (⌘/Ctrl+K) |
| `scope` | `"title" \| "title+summary" \| "all"` | `"all"` | Matching scope for search. `all` covers title + summary + tags |
| `showInHeader` | `boolean` | `true` | Show the search icon in the header (set to `false` for shortcut-only) |

### `posts`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `perPage` | `number` | `10` | Number of posts per page (clamped to a minimum of 1) |
| `paginationMode` | `"infinite" \| "numbered"` | `"infinite"` | `infinite` = infinite scroll (restores visible count and scroll position on back navigation). `numbered` = numbered pages + Prev/Next buttons; URL is `?page=N` |
| `useScheduled` | `boolean` | `true` | When `true`, Public posts only appear after their date has passed (scheduled publishing) |
| `showSummary` | `boolean` | `true` | Show post summary in the post card |
| `showPrevNext` | `boolean` | `true` | Show adjacent (previous/next) post navigation at the bottom of post pages |
| `dateFormat` | `string` | `"YYYY년 MM월 DD일"` | dayjs format token (e.g. `"YYYY-MM-DD"`, `"YYYY/MM/DD HH:mm"`) |
| `showScrollProgress` | `boolean` | `true` | Show the scroll progress bar at the top of post pages |

### `comments`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `use` | `boolean` | `true` | Show the utterances comments section (requires `profile.repo`) |

### `rss`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `use` | `boolean` | `true` | Enable `/rss.xml`. Requires `meta.siteUrl` (or `SITE_URL` env). Returns 404 when `false` |

### `footer`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `show` | `boolean` | `true` | Show the global site footer |
| `text` | `string` | `"© ..."` | Footer text |

```ts
export const vars = createGlobalTheme(":root", {
  // ...
  color: {
    white: "#fff",
    black: "#333",
    darkgray: "#2f3437",

    "gray-50": "#f9fafb",
    "gray-100": "#f3f4f6",
    "gray-200": "#e5e7eb",
    "gray-300": "#d1d5db",
    "gray-400": "#9ca3af",
    "gray-500": "#6b7280",
    "gray-600": "#4b5563",
    "gray-700": "#374151",
    // ...
  },
});
```

To customize colors or sizes, edit `sprinkles.css.ts` or `vars.css.ts`.

<br />

## 📄 License

Released under the [MIT License](./LICENSE). Feel free to fork and use it as your own blog.
