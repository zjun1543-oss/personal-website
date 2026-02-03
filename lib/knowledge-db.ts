import fs from 'fs';
import path from 'path';

const KNOWLEDGE_DB_PATH = path.join(process.cwd(), 'data', 'knowledge-base.json');

// 确保数据目录存在
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 初始化知识库文件
if (!fs.existsSync(KNOWLEDGE_DB_PATH)) {
  fs.writeFileSync(
    KNOWLEDGE_DB_PATH,
    JSON.stringify(
      [
        {
          id: '1',
          title: '关于我',
          category: 'personal',
          content: '# 关于我\n\n你好！我是 MySpace 网站的创建者。这个网站是我分享关于心理学、美食和运动的地方。\n\n## 个人简介\n- 热爱心理学，喜欢探索内心世界\n- 喜欢烹饪，分享健康食谱\n- 坚持运动生活，关注健康\n\n你可以问我关于这个网站的任何问题！',
          tags: ['介绍', '个人', '关于'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      null,
      2
    )
  );
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: 'personal' | 'psychology' | 'food' | 'sports' | 'other';
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// 读取知识库
export function getKnowledgeBase(): KnowledgeArticle[] {
  try {
    const data = fs.readFileSync(KNOWLEDGE_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading knowledge base:', error);
    return [];
  }
}

// 保存知识库
export function saveKnowledgeBase(articles: KnowledgeArticle[]): boolean {
  try {
    fs.writeFileSync(KNOWLEDGE_DB_PATH, JSON.stringify(articles, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving knowledge base:', error);
    return false;
  }
}

// 添加文章
export function addArticle(article: Omit<KnowledgeArticle, 'id' | 'createdAt' | 'updatedAt'>): KnowledgeArticle | null {
  const articles = getKnowledgeBase();
  const newArticle: KnowledgeArticle = {
    ...article,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  articles.push(newArticle);

  if (saveKnowledgeBase(articles)) {
    return newArticle;
  }
  return null;
}

// 更新文章
export function updateArticle(id: string, updates: Partial<KnowledgeArticle>): KnowledgeArticle | null {
  const articles = getKnowledgeBase();
  const index = articles.findIndex((a) => a.id === id);

  if (index === -1) return null;

  articles[index] = {
    ...articles[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  };

  if (saveKnowledgeBase(articles)) {
    return articles[index];
  }
  return null;
}

// 删除文章
export function deleteArticle(id: string): boolean {
  const articles = getKnowledgeBase();
  const filtered = articles.filter((a) => a.id !== id);
  return saveKnowledgeBase(filtered);
}

// 搜索文章 - 基于关键词匹配
export function searchArticles(query: string): { article: KnowledgeArticle; relevance: number }[] {
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
