export const metadata = {
  title: '情绪日记 - MySpace',
  description: '记录每日情绪状态，追踪心情变化',
};

export default function MoodJournalPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <div className="text-6xl mb-6">📔</div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
            情绪日记
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--morandi-warm-gray)' }}>
            记录每日情绪状态，追踪心情变化
          </p>
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--morandi-light-sage)' }}>
            <p style={{ color: 'var(--morandi-sage)' }}>功能开发中，敬请期待...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
