'use client';

import { useState } from 'react';
import { calculateBMI, getBMICategory } from '@/lib/tools';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w && h) {
      const bmi = calculateBMI(w, h);
      const category = getBMICategory(bmi);
      setResult({ bmi: parseFloat(bmi.toFixed(1)), category });
    }
  };

  const getBMIColor = (category: string) => {
    switch (category) {
      case '偏瘦': return 'var(--morandi-slate-blue)';
      case '正常': return 'var(--morandi-sage)';
      case '偏胖': return 'var(--morandi-dusty-rose)';
      case '肥胖': return 'var(--morandi-terracotta)';
      default: return 'var(--morandi-charcoal)';
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="card">
        <form onSubmit={handleCalculate} className="space-y-6">
          {/* Weight */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--morandi-charcoal)' }}>
              体重 (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="例如: 70"
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-primary"
              style={{ borderColor: 'var(--morandi-light-blue)' }}
              required
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--morandi-charcoal)' }}>
              身高 (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="例如: 175"
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-primary"
              style={{ borderColor: 'var(--morandi-light-blue)' }}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            计算 BMI
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--morandi-light-blue)' }}>
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: 'var(--morandi-charcoal)' }}>
              计算结果
            </h3>
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2" style={{ color: getBMIColor(result.category) }}>
                {result.bmi}
              </div>
              <div
                className="text-xl font-medium px-4 py-2 inline-block rounded-full"
                style={{ backgroundColor: 'white', color: getBMIColor(result.category) }}
              >
                {result.category}
              </div>
            </div>

            {/* BMI Scale */}
            <div className="mt-6">
              <div className="h-3 rounded-full flex">
                <div className="flex-1 bg-blue-300 rounded-l-full" title="偏瘦 (&lt;18.5)" />
                <div className="flex-1 bg-green-400" title="正常 (18.5-24)" />
                <div className="flex-1 bg-yellow-400" title="偏胖 (24-28)" />
                <div className="flex-1 bg-red-400 rounded-r-full" title="肥胖 (&gt;28)" />
              </div>
              <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--morandi-warm-gray)' }}>
                <span>偏瘦</span>
                <span>正常</span>
                <span>偏胖</span>
                <span>肥胖</span>
              </div>
              <div
                className="h-1 bg-charcoal rounded mt-2 relative"
                style={{ backgroundColor: 'var(--morandi-charcoal)' }}
              >
                <div
                  className="absolute w-3 h-3 bg-white border-2 border-charcoal rounded-full -top-1 transform -translate-x-1/2"
                  style={{
                    left: `${Math.min(Math.max((result.bmi - 15) / (35 - 15) * 100, 0), 100)}%`,
                    borderColor: 'var(--morandi-charcoal)',
                  }}
                />
              </div>
            </div>

            {/* Health Tips */}
            <div className="mt-6 p-4 rounded-lg bg-white">
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--morandi-charcoal)' }}>
                健康提示：
              </p>
              {result.category === '偏瘦' && (
                <p className="text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>
                  建议增加营养摄入，适当增重。可以增加蛋白质和健康脂肪的摄入。
                </p>
              )}
              {result.category === '正常' && (
                <p className="text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>
                  恭喜！你的体重在健康范围内。继续保持均衡饮食和适量运动。
                </p>
              )}
              {result.category === '偏胖' && (
                <p className="text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>
                  建议适当控制饮食，增加运动量。每周至少进行150分钟中等强度运动。
                </p>
              )}
              {result.category === '肥胖' && (
                <p className="text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>
                  建议制定科学的减重计划。建议咨询专业医生或营养师，制定个性化的健康方案。
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
