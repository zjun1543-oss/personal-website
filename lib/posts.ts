import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: 'psychology' | 'food' | 'sports';
  tags?: string[];
  author?: string;
}

export function getPostsByCategory(category: 'psychology' | 'food' | 'sports'): Post[] {
  const categoryPath = path.join(postsDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(categoryPath);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: fileName.replace(/\.md$/, ''),
        title: data.title || fileName,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.slice(0, 150) + '...',
        content,
        category,
        tags: data.tags || [],
        author: data.author,
      } as Post;
    });

  // Sort by date (newest first)
  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getAllPosts(): Post[] {
  const categories: Array<'psychology' | 'food' | 'sports'> = ['psychology', 'food', 'sports'];
  const allPosts = categories.flatMap((category) => getPostsByCategory(category));

  return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getPostBySlug(slug: string, category: string): Post | null {
  const categoryPath = path.join(postsDirectory, category);
  const fullPath = path.join(categoryPath, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || content.slice(0, 150) + '...',
    content,
    category: category as 'psychology' | 'food' | 'sports',
    tags: data.tags || [],
    author: data.author,
  } as Post;
}
