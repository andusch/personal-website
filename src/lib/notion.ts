import * as NotionLog from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new NotionLog.Client({
  auth: process.env.NOTION_SECRET,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

// 1. FOR THE BLOG LIST
export async function getPublishedPosts() {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;
  if (!databaseId) return [];
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: { property: 'Published', checkbox: { equals: true } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });
    return response.results;
  } catch (error) {
    return [];
  }
}

// 2. FOR THE INDIVIDUAL BLOG POST CONTENT
export async function getPostContent(slug: string) {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;
  if (!databaseId) return null;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  const page = response.results[0];
  if (!page) return null;
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);
  return {
    title: (page as any).properties.Name.title[0].plain_text,
    content: mdString.parent,
  };
}

// 3. FOR THE BOOKSHELF
export async function getBookshelf() {
  const databaseId = process.env.NOTION_BOOKSHELF_DATABASE_ID;
  if (!databaseId) {
    console.error("❌ Bookshelf Database ID missing");
    return [];
  }
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  } catch (error) {
    return [];
  }
}

// 4. FOR PROJECTS
export async function getProjects() {
  const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID;
  if (!databaseId) return [];
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: 'Year', direction: 'descending' }],
    });
    return response.results;
  } catch (error) {
    return [];
  }
}