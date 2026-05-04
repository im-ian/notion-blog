# Notion Blog Project
[![DEMO](https://img.shields.io/badge/BLOG%20DEMO-2d55ff)](https://www.chipmunk-world.com/)

  - ✏️ Write your posts using Notion
  - ⚙️ Easily configure site
  - 🎨 Easily customize theme (with [vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract))
  - 📊 Google Analytics Support
  - 🤖 Sentry Support

<br />

## 🚀 Getting Started

![image](https://github.com/im-ian/notion-blog/assets/38205068/fdc98dfd-c6df-4f1e-9909-e756ee08b29b)

Fork this repository and clone on your workspace.

![image](https://github.com/im-ian/notion-blog/assets/38205068/56ade899-23bd-4544-8625-154ecad129ae)

Copy [this Notion template](https://imian.notion.site/7cdd2b347b734b7caeb754d8701a4b57?v=c9d11f25b61b4d249d45f3b4dde4c2f2&pvs=4)

![image](https://github.com/im-ian/notion-blog/assets/38205068/0dff2c40-8464-4140-92c2-f865e5067cf2)

Input your ![#f03c15](https://placehold.co/13x13/f03c15/f03c15.png) `NOTION_BLOG_PAGE_ID` and ![#1589F0](https://placehold.co/13x13/1589F0/1589F0.png) `NOTION_VIEW_ID`

![image](https://github.com/im-ian/notion-blog/assets/38205068/62d3c169-d47b-4e78-80d4-192fe446b1c6)

Add your `env` values in Vercel `Environment Variables`

If you need sentry debugging, add your sentry configure in environment
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_AUTH_TOKEN`
- `SENTRY_DSN`

`Sentry.init()` will not proceed unless you add all four Sentry settings.

![image](https://github.com/im-ian/notion-blog/assets/38205068/47731fd6-e4b0-4bfa-a0b4-c9ef9471f409)

Deploy your repository on [Vercel](https://vercel.com/)!

<br />

## 💻 Development

```shell
cp .env.example .env

```

if you try develop this project, copy `.env.example` to `.env` and

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
  // Profile
  profile: {
    // 댓글 기능을 위한 레포명, 입력하지 않으면 댓글 기능이 비활성화됩니다.
    repo: "im-ian/notion-blog",
    // 페이지 상단 Github 아이콘 링크
    github: "https://github.com/im-ian",
  },
  // ...
}
```
you can customize below information on `site.config.ts` (자세한 옵션 표는 아래 참고)
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
- sentry

### `profile`

| 키 | 타입 | 설명 |
|----|------|------|
| `name` | `string` | 표시 이름 |
| `profileImage` | `string \| undefined` | 아바타 URL |
| `bio` | `string \| undefined` | 한 줄 소개 |
| `repo` | `string \| undefined` | utterances 연동용 GitHub 레포 (`owner/repo`). 미설정 시 댓글 비활성 |
| `github` | `string \| undefined` | GitHub username |
| `linkedin` | `string \| undefined` | LinkedIn URL |
| `instagram` | `string \| undefined` | Instagram URL |
| `twitter` | `string \| undefined` | Twitter/X URL |
| `threads` | `string \| undefined` | Threads URL |

### `meta`

`Next.js Metadata`를 그대로 받으며 다음 키가 추가됨.

| 키 | 타입 | 설명 |
|----|------|------|
| `siteUrl` | `string \| undefined` | 카논컬 도메인. sitemap, RSS, layout `metadataBase`에 사용. 미설정 시 `process.env.SITE_URL` fallback (production에선 둘 중 하나 필수) |
| `ogImage` | `string \| undefined` | 기본 OG 이미지. 포스트 썸네일이 없을 때 fallback으로도 사용 |

### `site`

| 키 | 타입 | 기본값 | 설명 |
|----|------|--------|------|
| `lang` | `string` | `"ko"` | `<html lang>` 값 |
| `title` | `string` | — | 사이트 타이틀, 헤더에 표시 |
| `stickyProfile` | `boolean` | `false` | 데스크탑 좌측 프로필 섹션 스크롤 추종 |

### `theme`

| 키 | 타입 | 기본값 | 설명 |
|----|------|--------|------|
| `mode` | `"auto" \| "light" \| "dark"` | `"auto"` | 첫 방문 기본 테마. `auto`는 OS 설정 추종. 사용자가 토글로 바꾸면 localStorage가 우선 |
| `showToggle` | `boolean` | `true` | 헤더의 다크모드 토글 버튼 노출. `mode`를 강제하고 싶을 때 `false` |

### `search`

| 키 | 타입 | 기본값 | 설명 |
|----|------|--------|------|
| `shortcut` | `boolean` | `true` | 검색 단축키(⌘/Ctrl+K) 활성화 |
| `scope` | `"title" \| "title+summary" \| "all"` | `"all"` | 검색 매칭 범위. `all`은 title + summary + tags |
| `showInHeader` | `boolean` | `true` | 헤더 검색 아이콘 노출 (단축키만 쓰고 싶다면 `false`) |

### `posts`

| 키 | 타입 | 기본값 | 설명 |
|----|------|--------|------|
| `perPage` | `number` | `10` | 페이지당 포스트 개수 (1 미만이면 1로 보정) |
| `paginationMode` | `"infinite" \| "numbered"` | `"infinite"` | `infinite`는 인피니티 스크롤(뒤로가기 시 노출 개수·스크롤 위치 복원). `numbered`는 숫자 페이지 + Prev/Next 버튼, URL은 `?page=N` |
| `useScheduled` | `boolean` | `true` | `true`일 때 Public 포스트가 작성일을 넘어야 리스트에 노출 (예약 게시) |
| `showSummary` | `boolean` | `true` | 포스트 카드의 summary 노출 |
| `showPrevNext` | `boolean` | `true` | 포스트 페이지 하단 인접(이전/다음) 포스트 네비게이션 |
| `dateFormat` | `string` | `"YYYY년 MM월 DD일"` | dayjs 토큰 (e.g. `"YYYY-MM-DD"`, `"YYYY/MM/DD HH:mm"`) |
| `showScrollProgress` | `boolean` | `true` | 포스트 페이지 상단 스크롤 진행바 |

### `comments`

| 키 | 타입 | 기본값 | 설명 |
|----|------|--------|------|
| `use` | `boolean` | `true` | utterances 댓글 영역 노출 (`profile.repo` 필수) |

### `rss`

| 키 | 타입 | 기본값 | 설명 |
|----|------|--------|------|
| `use` | `boolean` | `true` | `/rss.xml` 활성화. `meta.siteUrl` (또는 `SITE_URL` env) 필요. `false`면 404 |

### `footer`

| 키 | 타입 | 기본값 | 설명 |
|----|------|--------|------|
| `show` | `boolean` | `true` | 사이트 전역 footer 영역 노출 |
| `text` | `string` | `"© ..."` | 표시할 텍스트 |

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
  }
});
```

If you want to edit color or size, edit file `sprinkles.css.ts` or `vars.css.ts`
