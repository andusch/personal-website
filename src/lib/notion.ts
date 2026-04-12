import * as NotionLog from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new NotionLog.Client({
  auth: process.env.NOTION_SECRET,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  published: boolean;
  tags?: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  quote: string;
  cover: string;
  status: "To-Read" | "Reading" | "Finished";
}

export interface Project {
  id: string;
  title: string;
  year: number;
  description: string;
  tags: string[];
  link?: string;
}

export function isNotionConfigured(): boolean {
  return !!(
    process.env.NOTION_SECRET &&
    process.env.NOTION_BLOG_DATABASE_ID &&
    process.env.NOTION_BOOKSHELF_DATABASE_ID &&
    process.env.NOTION_PROJECTS_DATABASE_ID
  );
}

// Helper to safely extract title from various property names
function extractTitle(properties: any): string {
  // Try common title property names
  const titleProps = ['Name', 'Title', 'title', 'name'];
  for (const prop of titleProps) {
    const titleArray = properties?.[prop]?.title;
    if (titleArray && titleArray.length > 0) {
      return titleArray[0]?.plain_text || "Untitled";
    }
  }
  console.log("Could not find title in properties:", Object.keys(properties));
  return "Untitled";
}

// Helper to safely extract text from various property types
function extractText(properties: any, propName: string): string {
  const prop = properties?.[propName];
  if (!prop) return "";
  
  // Try rich_text
  if (prop.rich_text && prop.rich_text.length > 0) {
    return prop.rich_text[0]?.plain_text || "";
  }
  
  // Try plain text
  if (prop.plain_text) return prop.plain_text;
  
  return "";
}

// Helper to extract slug or generate from title
function extractSlug(properties: any, fallback: string): string {
  // Try Slug property first
  const slug = extractText(properties, 'Slug');
  if (slug) return slug;
  
  // Try URL property
  const url = properties?.URL?.url || properties?.Link?.url;
  if (url) {
    // Extract slug from URL or use last part
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1] || fallback;
  }
  
  // Generate from title
  const title = extractTitle(properties);
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || fallback;
}

// BLOG FUNCTIONS
export async function getPublishedPosts() : Promise<BlogPost[]> {

  if (!isNotionConfigured()) {
    console.log("⚠️  Notion not configured, returning empty array");
    return [];
  }

  try {

    const databaseId = process.env.NOTION_BLOG_DATABASE_ID as string;
    const response = await notion.databases.query({
      database_id: databaseId,
      // filter: {
      //   property: "Published",
      //   checkbox: {
      //     equals: true,
      //   },
      // },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    // console.log(`Found ${response.results.length} posts in Notion`);

    // if (response.results.length > 0) {
    //   const firstPost = response.results[0] as any;
    //   console.log("First post properties:", JSON.stringify(firstPost.properties, null, 2));
    // }

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties?.Name?.title?.[0]?.plain_text || "Untitled",
      slug: page.properties?.Slug?.rich_text?.[0]?.plain_text || page.id,
      date: page.properties?.Date?.date?.start || new Date().toISOString(),
      excerpt: page.properties?.Excerpt?.rich_text?.[0]?.plain_text || "",
      published: page.properties?.Published?.checkbox || false,
      tags: page.properties?.Tags?.multi_select?.map((t: any) => t.name) || [],
    }));
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error);
    return [];
  }

}

export async function getPostContent(slug: string) : Promise<{ title: string; content: string; date: string } | null> {

  if (!isNotionConfigured()) {
    console.log("⚠️  Notion not configured, returning null");
    return null;
  }

  try {

    const databaseID = process.env.NOTION_BLOG_DATABASE_ID!;

    const response = await notion.databases.query({
      database_id: databaseID,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    const page = response.results[0];
    if (!page) return null;

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
      title: (page as any).properties?.Name?.title?.[0]?.plain_text || "Untitled",
      content: mdString.parent || "",
      date: (page as any).properties?.Date?.date?.start || new Date().toISOString(),
    };

  } catch (error) {
    console.error("❌ Error fetching post content:", error);
    return null;
  }

}

// BOOKSHELF FUNCTIONS
export async function getBookshelf() : Promise<Book[]> {

  if (!isNotionConfigured()) {
    console.log("⚠️  Notion not configured, returning empty array");
    return [];
  }

  try {

    const databaseId = process.env.NOTION_BOOKSHELF_DATABASE_ID!;
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        { property: "Status", direction: "ascending" },
        { property: "Rating", direction: "descending" },
      ],
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties?.Name?.title?.[0]?.plain_text || "Untitled",
      author: page.properties?.Author?.rich_text?.[0]?.plain_text || "Unknown",
      category: page.properties?.Category?.select?.name || "Uncategorized",
      rating: page.properties?.Rating?.number || 0,
      quote: page.properties?.Quote?.rich_text?.[0]?.plain_text || "",
      cover: page.properties?.Cover?.url || "https://via.placeholder.com/300x450/f5f5f5/666?text=No+Cover",
      status: page.properties?.Status?.select?.name || "To-Read",
    }))

  } catch (error) {
    console.error("❌ Error fetching bookshelf:", error);
    return [];
  }

}

// PROJECTS FUNCTIONS
export async function getProjects(): Promise<Project[]> {
  if (!isNotionConfigured()) {
    console.log("⚠️  Notion not configured, returning empty array");
    return [];
  }

  try {
    const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID!;
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: "Year", direction: "descending" }],
    });

    return response.results
      .filter((page: any) => {
        return !!(page.properties?.Name?.title?.[0]?.plain_text);
      })
      .map((page: any) => ({
        id: page.id,
        title: page.properties?.Name?.title?.[0]?.plain_text || "Untitled",
        year: page.properties?.Year?.number || new Date().getFullYear(),
        description: page.properties?.Description?.rich_text?.[0]?.plain_text || "",
        tags: page.properties?.Tags?.multi_select?.map((t: any) => t.name) || [],
        link: page.properties?.Link?.url || "",
      }));
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return [];
  }
}
