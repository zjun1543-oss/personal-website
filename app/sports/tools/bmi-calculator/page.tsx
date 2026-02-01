import BMICalculator from '@/components/tools/BMICalculator';

export const metadata = {
  title: 'BMI 计算器 - MySpace',
  description: '计算你的身体质量指数，了解健康状况',
};

export default function BMICalculatorPage() {
  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
          ⚖️ BMI 计算器
        </h1>
        <p className="text-lg" style={{ color: 'var(--morandi-warm-gray)' }}>
          计算你的身体质量指数，了解健康状态
        </p>
      </div>
      <BMICalculator />
    </div>
  );
}
