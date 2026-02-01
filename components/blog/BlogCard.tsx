import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import type { Post } from '@/lib/posts';

interface BlogCardProps {
  post: Post;
}

const categoryColors = {
  psychology: {
    bg: 'var(--morandi-light-sage)',
    border: 'var(--morandi-sage)',
    text: 'var(--morandi-sage)',
  },
  food: {
    bg: 'var(--morandi-light-rose)',
    border: 'var(--morandi-dusty-rose)',
    text: 'var(--morandi-dusty-rose)',
  },
  sports: {
    bg: 'var(--morandi-light-blue)',
    border: 'var(--morandi-slate-blue)',
    text: 'var(--morandi-slate-blue)',
  },
};

const categoryNames = {
  psychology: '心理学',
  food: '美食',
  sports: '运动',
};

export default function BlogCard({ post }: BlogCardProps) {
  const colors = categoryColors[post.category];

  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      className="block group"
    >
      <article className="card h-full transition-all duration-300 group-hover:scale-[1.02]">
        {/* Category Badge */}
        <div
          className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {categoryNames[post.category]}
        </div>

        {/* Title */}
        <h3
          className="text-xl font-serif font-bold mb-3 group-hover:underline"
          style={{ color: 'var(--morandi-charcoal)' }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-base mb-4 line-clamp-2" style={{ color: 'var(--morandi-warm-gray)' }}>
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>
          <time dateTime={post.date}>
            {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
          </time>
          {post.author && <span>{post.author}</span>}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded"
                style={{ backgroundColor: 'var(--morandi-cream)', color: 'var(--morandi-warm-gray)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
