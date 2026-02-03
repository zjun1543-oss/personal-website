// 知识库数据库操作
// 使用内置数据，无需文件系统或外部数据库

import { KNOWLEDGE_BASE_DATA } from './knowledge-data';

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: 'personal' | 'psychology' | 'food' | 'sports' | 'other';
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// 读取知识库（从内置数据）
export function getKnowledgeBase(): KnowledgeArticle[] {
  return KNOWLEDGE_BASE_DATA;
}

// 保存知识库（在 Vercel 环境中不支持写入）
export function saveKnowledgeBase(_articles: KnowledgeArticle[]): boolean {
  // Vercel 是只读文件系统，不支持写入
  // 如果需要动态更新，应该使用数据库
  console.warn('在当前环境中无法保存知识库变更。请使用数据库服务。');
  return false;
}

// 添加文章（需要数据库支持）
export function addArticle(
  _article: Omit<KnowledgeArticle, 'id' | 'createdAt' | 'updatedAt'>
): KnowledgeArticle | null {
  console.warn('添加文章功能需要数据库支持。当前使用内置知识库。');
  return null;
}

// 更新文章（需要数据库支持）
export function updateArticle(
  _id: string,
  _updates: Partial<KnowledgeArticle>
): KnowledgeArticle | null {
  console.warn('更新文章功能需要数据库支持。当前使用内置知识库。');
  return null;
}

// 删除文章（需要数据库支持）
export function deleteArticle(_id: string): boolean {
  console.warn('删除文章功能需要数据库支持。当前使用内置知识库。');
  return false;
}

// 搜索文章 - 基于关键词匹配
export function searchArticles(
  query: string
): { article: KnowledgeArticle; relevance: number }[] {
  const articles = getKnowledgeBase();
  const queryLower = query.toLowerCase();
  const keywords = queryLower.split(/\s+/);

  const results = articles.map((article) => {
    const titleLower = article.title.toLowerCase();
    const contentLower = article.content.toLowerCase();
    const tagsLower = article.tags.map((t) => t.toLowerCase());

    let score = 0;

    // 标题匹配权重更高
    keywords.forEach((keyword) => {
      if (titleLower.includes(keyword)) score += 10;
      if (contentLower.includes(keyword)) score += 2;
      tagsLower.forEach((tag) => {
        if (tag.includes(keyword) || keyword.includes(tag)) score += 5;
      });
    });

    return { article, relevance: score };
  });

  // 过滤掉相关性为0的结果，并按相关性排序
  return results.filter((r) => r.relevance > 0).sort((a, b) => b.relevance - a.relevance);
}
