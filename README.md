# Personal Website

Personal website built with Next.js App Router, TypeScript, Tailwind CSS, and Notion as a CMS source for blog posts, projects, and bookshelf entries.

## Tech Stack

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS v4
- Notion API (`@notionhq/client`) + `notion-to-md`

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Fill required Notion variables in `.env.local`:

- `NOTION_SECRET`
- `NOTION_BLOG_DATABASE_ID`
- `NOTION_BOOKSHELF_DATABASE_ID`
- `NOTION_PROJECTS_DATABASE_ID`

4. Run development server:

```bash
npm run dev
```

## Build And Run

```bash
npm run build
npm run start
```

## Deployment (Vercel)

1. Import this repository in Vercel.
2. Add all variables from `.env.example` in Project Settings -> Environment Variables.
3. Deploy from `main` branch.
4. After deploy, verify:
   - Home, blog, projects, and bookshelf routes load.
   - `/sitemap.xml` and `/robots.txt` are reachable.
   - Social preview metadata resolves with your final domain.
