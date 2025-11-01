import fs from "fs";
import { readdir } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import getReadTime from "./readTime";

const postsDirectory = join(process.cwd(), "_posts");

const walk: any = async (dirPath: string) =>
  Promise.all(
    await readdir(dirPath, { withFileTypes: true }).then((entries) =>
      entries
        .filter((entry) => !entry.name.startsWith("."))
        .map((entry) => {
          const childPath = join(dirPath, entry.name);
          return entry.isDirectory() ? walk(childPath) : childPath;
        })
    )
  );

export async function getPostSlugs(categoryName?: string, slug?: string) {
  let path = postsDirectory;

  if (categoryName) {
    path = postsDirectory + "/" + categoryName;
  }

  const files = await walk(path);
  const _files = files.flat(Infinity);

  const slugs = _files.map((file: string) => {
    if (typeof file === "undefined") {
      return [];
    }

    const path = file.split("/");
    const _slug = path[path.length - 1].replace(".md", "");
    const category = path[path.length - 2];

    if (typeof slug !== "undefined" && _slug === slug) {
      return [];
    }

    if (typeof categoryName !== "undefined" && category !== categoryName) {
      return [];
    } else {
      return {
        _slug,
        category,
      };
    }
  }, []);

  return slugs;
}

export function getPostBySlug(
  slug: string,
  categoryName: string,
  fields: string[] = []
) {
  if (typeof slug !== "undefined") {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(
      postsDirectory + "/" + categoryName,
      `${realSlug}.md`
    );

    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const readTime = getReadTime(content);

      type Items = {
        [key: string]: string;
      };

      const items: Items = {};

      // Ensure only the minimal needed data is exposed
      fields.forEach((field) => {
        if (field === "slug") {
          items[field] = realSlug;
        }
        if (field === "content") {
          items[field] = content;
        }
        if (field === "readTime") {
          if (typeof data[field] === "undefined") {
            items[field] = readTime;
          } else {
            items[field] = data[field];
          }
        }
        if (field === "categoryName") {
          items[field] = categoryName;
        }

        if (typeof data[field] !== "undefined") {
          items[field] = data[field];
        }
      });

      return items;
    }
  }
}

type Slug = {
  _slug: string;
  category: string;
};

export async function getAllPosts(
  fields: string[] = [],
  categoryName?: string
) {
  const slugs = await getPostSlugs(categoryName);

  const posts = slugs
    .map((slug: Slug) => getPostBySlug(slug._slug, slug.category, fields))
    .sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1));

  // remove undefined posts
  const filteredPosts = posts.filter((post: any) => post !== undefined);

  return filteredPosts;
}

export async function getRelatedPosts(
  fields: string[] = [],
  slug: string,
  categoryName: string
) {
  const slugs = await getPostSlugs(categoryName, slug);

  const posts = slugs
    .map((slug: Slug) => getPostBySlug(slug._slug, slug.category, fields))
    .sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
