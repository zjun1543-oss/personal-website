import CalorieCalculator from '@/components/tools/CalorieCalculator';

export const metadata = {
  title: '卡路里计算器 - MySpace',
  description: '计算你的每日热量需求和基础代谢率',
};

export default function CalorieCalculatorPage() {
  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
          🔥 卡路里计算器
        </h1>
        <p className="text-lg" style={{ color: 'var(--morandi-warm-gray)' }}>
          计算你的基础代谢率和每日总热量消耗
        </p>
      </div>
      <CalorieCalculator />
    </div>
  );
}
