import Link from 'next/link';
import BlogCard from '@/components/blog/BlogCard';
import { getPostsByCategory } from '@/lib/posts';

export default function PsychologyPage() {
  const posts = getPostsByCategory('psychology');

  const tools = [
    { name: '性格测试', href: '/psychology/tools/personality-test', icon: '📝', description: '了解你的性格类型' },
    { name: '情绪日记', href: '/psychology/tools/mood-journal', icon: '📔', description: '记录每日心情' },
    { name: '正念计时器', href: '/psychology/tools/mindfulness-timer', icon: '🧘', description: '冥想与放松' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--morandi-light-sage)' }}>
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6" style={{ color: 'var(--morandi-charcoal)' }}>
            🧠 心理学
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--morandi-warm-gray)' }}>
            探索内心世界，理解情绪与认知，促进个人成长
          </p>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8" style={{ color: 'var(--morandi-charcoal)' }}>
            心理测评工具
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="card transition-all hover:scale-105"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--morandi-charcoal)' }}>
                  {tool.name}
                </h3>
                <p style={{ color: 'var(--morandi-warm-gray)' }}>{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-white/50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold" style={{ color: 'var(--morandi-charcoal)' }}>
              文章列表
            </h2>
            <span className="text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>
              共 {posts.length} 篇文章
            </span>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 card">
              <p style={{ color: 'var(--morandi-warm-gray)' }}>
                暂无文章，敬请期待...
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
