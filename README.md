# Personal Website Tasks

## Phase 1: Foundation & Setup

1. Set up a GitHub repository for your code.

2. Initialize a Next.js project with Tailwind CSS.

3. Establish the basic routing layout for your pages: / (Home/About), /projects, /blog, /bookshelf.

4. Configure global styles (picking the right typography—perhaps a clean Sans-Serif like Inter for navigation and a highly readable Serif like Merriweather or Lora for your philosophical writing).

## Phase 2: The Core Pages

1. **The Home/About Page**: This is where we implement your bio. We'll structure it to immediately hook the reader with your philosophy ("Building things that solve real problems... intersection of computer science, physics, philosophy") and lay out your long-term vision (NUS/Berkeley, Sky Computing Lab).

2. **The Projects Showcase**: Hardcode the MVP versions of the Hospital Panic Button and VR Flight Simulator so you have something to show immediately.

## Phase 3: The Notion API integration

1. Create a Notion Workspace specifically for your website.

2. Build three Notion Databases: Blog, Projects, and Bookshelf / Reading List.

3. Create a Notion Integration Token and share those databases with your integration.

4. Use the official @notionhq/client in your Next.js app to fetch the data.

5. Use a package like react-notion-x or standard Markdown parsing to render your Notion pages as beautiful web pages on your site.

## Phase 4: Data Fetching & Dynamic Routing

1. Set up Next.js dynamic routes (e.g., /blog/[slug]) so every time you write a new Notion page, a new webpage is automatically generated.

2. Style the database lists (e.g., a grid for the Bookshelf, a clean chronological list for the Blog).

## Phase 5: Polish & Deployment

1. Ensure mobile responsiveness (Tailwind makes this easy).

2. Add metadata (OpenGraph tags) so when you share your links, a nice preview appears.

3. Push your code to GitHub and connect it to Vercel for one-click deployment.

4. Link a custom domain (e.g., yourname.com).