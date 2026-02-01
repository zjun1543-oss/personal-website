'use client';

import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import ShareButtons from './ShareButtons';
import type { Post } from '@/lib/posts';
import { useEffect, useState } from 'react';

interface BlogDetailProps {
  post: Post;
}

const categoryNames = {
  psychology: '心理学',
  food: '美食',
  sports: '运动',
};

const categoryColors = {
  psychology: 'var(--morandi-sage)',
  food: 'var(--morandi-dusty-rose)',
  sports: 'var(--morandi-slate-blue)',
};

export default function BlogDetail({ post }: BlogDetailProps) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, [post.slug]);

  // Simple markdown to HTML converter for demo
  const contentHtml = post.content
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n\n/gim, '</p><p>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')
    .replace(/\n/gim, '<br />');

  return (
    <article className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>
        <a href={`/${post.category}`} className="hover:underline">
          {categoryNames[post.category]}
        </a>
        <span className="mx-2">/</span>
        <span>{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div
          className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
          style={{ backgroundColor: categoryColors[post.category] + '33', color: categoryColors[post.category] }}
        >
          {categoryNames[post.category]}
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>
          <time dateTime={post.date}>
            {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
          </time>
          {post.author && <span>作者: {post.author}</span>}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full"
                style={{ backgroundColor: 'var(--morandi-cream)', color: 'var(--morandi-warm-gray)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div
        className="card prose prose-lg max-w-none"
        style={{ color: 'var(--morandi-charcoal)' }}
        dangerouslySetInnerHTML={{ __html: `<p>${contentHtml}</p>` }}
      />

      {/* Share */}
      {url && (
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--morandi-light-sage)' }}>
          <ShareButtons title={post.title} url={url} />
        </div>
      )}
    </article>
  );
}
