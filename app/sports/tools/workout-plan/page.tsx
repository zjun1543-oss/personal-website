export const metadata = {
  title: '运动计划 - MySpace',
  description: '个性化运动训练计划',
};

export default function WorkoutPlanPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <div className="text-6xl mb-6">📋</div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
            运动计划生成
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--morandi-warm-gray)' }}>
            根据你的目标生成个性化训练计划
          </p>
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--morandi-light-blue)' }}>
            <p style={{ color: 'var(--morandi-slate-blue)' }}>功能开发中，敬请期待...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
