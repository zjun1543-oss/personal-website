import Hero from '@/components/home/Hero';
import SectionCard from '@/components/home/SectionCard';

const sections = [
  {
    title: '心理学',
    description: '探索内心世界，分享关于情绪、认知和个人成长的思考，以及实用的心理测评工具。',
    href: '/psychology',
    color: 'sage' as const,
    icon: '🧠',
  },
  {
    title: '美食',
    description: '记录烹饪心得，分享健康食谱，探讨饮食文化与营养科学，附赠实用厨房工具。',
    href: '/food',
    color: 'rose' as const,
    icon: '🍳',
  },
  {
    title: '运动',
    description: '坚持运动生活，分享训练计划、运动心得和健康建议，提供科学的健身计算工具。',
    href: '/sports',
    color: 'blue' as const,
    icon: '💪',
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Sections Grid */}
      <section id="sections" className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
              探索三大板块
            </h2>
            <p className="text-lg" style={{ color: 'var(--morandi-warm-gray)' }}>
              每个板块都包含丰富的文章和实用工具
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section) => (
              <SectionCard key={section.href} {...section} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Highlights */}
      <section className="py-20 bg-white/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
              关于这个网站
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--morandi-warm-gray)' }}>
              这是一个记录我个人成长的地方。在这里，我分享对心理学、美食和运动的热爱。
              每个板块都有精心设计的互动工具，希望对你有所帮助。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--morandi-sage)' }}>
                10+
              </div>
              <div style={{ color: 'var(--morandi-warm-gray)' }}>心理学文章</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--morandi-dusty-rose)' }}>
                20+
              </div>
              <div style={{ color: 'var(--morandi-warm-gray)' }}>美食食谱</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--morandi-slate-blue)' }}>
                15+
              </div>
              <div style={{ color: 'var(--morandi-warm-gray)' }}>运动指南</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
