export const metadata = {
  title: '正念计时器 - MySpace',
  description: '冥想计时工具，帮助放松身心',
};

export default function MindfulnessTimerPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <div className="text-6xl mb-6">🧘</div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
            正念计时器
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--morandi-warm-gray)' }}>
            冥想计时工具，帮助放松身心
          </p>
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--morandi-light-sage)' }}>
            <p style={{ color: 'var(--morandi-sage)' }}>功能开发中，敬请期待...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
