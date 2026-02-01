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
    <div className="bg-white">
      <Hero />

      {/* Sections Grid */}
      <section id="sections" className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#999' }}>
                Explore
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-normal mb-6" style={{ fontFamily: 'Georgia, serif', color: '#000' }}>
              探索三大板块
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#999' }}>
                About
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Georgia, serif', color: '#000' }}>
              关于这个网站
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              这是一个记录我个人成长的地方。在这里，我分享对心理学、美食和运动的热爱。
              每个板块都有精心设计的互动工具，希望对你有所帮助。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8">
                <div className="text-5xl font-bold mb-3" style={{ color: '#9CAF88' }}>
                  10+
                </div>
                <div className="text-gray-600">心理学文章</div>
              </div>
              <div className="bg-white rounded-2xl p-8">
                <div className="text-5xl font-bold mb-3" style={{ color: '#C4A484' }}>
                  20+
                </div>
                <div className="text-gray-600">美食食谱</div>
              </div>
              <div className="bg-white rounded-2xl p-8">
                <div className="text-5xl font-bold mb-3" style={{ color: '#8B9DC3' }}>
                  15+
                </div>
                <div className="text-gray-600">运动指南</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
