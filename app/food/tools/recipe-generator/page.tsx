export const metadata = {
  title: '食谱生成器 - MySpace',
  description: '根据食材推荐食谱',
};

export default function RecipeGeneratorPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <div className="text-6xl mb-6">👨‍🍳</div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
            食谱生成器
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--morandi-warm-gray)' }}>
            根据食材推荐食谱
          </p>
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--morandi-light-rose)' }}>
            <p style={{ color: 'var(--morandi-dusty-rose)' }}>功能开发中，敬请期待...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
