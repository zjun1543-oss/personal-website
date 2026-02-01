export const metadata = {
  title: '营养搭配 - MySpace',
  description: '膳食营养建议，均衡饮食指导',
};

export default function NutritionGuidePage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <div className="text-6xl mb-6">🥗</div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
            营养搭配
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--morandi-warm-gray)' }}>
            膳食营养建议，均衡饮食指导
          </p>
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--morandi-light-rose)' }}>
            <p style={{ color: 'var(--morandi-dusty-rose)' }}>功能开发中，敬请期待...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
