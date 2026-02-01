'use client';

import { useState } from 'react';
import { calculateHeartRateZones } from '@/lib/tools';

export default function HeartRateZonesPage() {
  const [age, setAge] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateHeartRateZones> | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age);

    if (a && a > 0 && a < 120) {
      setResult(calculateHeartRateZones(a));
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
          ❤️ 心率区间
        </h1>
        <p className="text-lg" style={{ color: 'var(--morandi-warm-gray)' }}>
          计算你的最佳运动心率区间
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="card">
          <form onSubmit={handleCalculate} className="mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--morandi-charcoal)' }}>
                年龄
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="例如: 30"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                style={{ borderColor: 'var(--morandi-light-blue)' }}
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              计算心率区间
            </button>
          </form>

          {result && (
            <div>
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--morandi-charcoal)' }}>
                您的心率区间
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: 'var(--morandi-light-blue)' }}>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--morandi-charcoal)' }}>最大心率</div>
                    <div className="text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>最大安全心率</div>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--morandi-slate-blue)' }}>
                    {result.max} bpm
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: '#e0f2fe' }}>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--morandi-charcoal)' }}>脂肪燃烧</div>
                    <div className="text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>低强度，适合减脂</div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: 'var(--morandi-slate-blue)' }}>
                    {result.fatBurn.min}-{result.fatBurn.max} bpm
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: '#dcfce7' }}>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--morandi-charcoal)' }}>有氧运动</div>
                    <div className="text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>中等强度，增强心肺</div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: 'var(--morandi-sage)' }}>
                    {result.cardio.min}-{result.cardio.max} bpm
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: '#fef3c7' }}>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--morandi-charcoal)' }}>巅峰训练</div>
                    <div className="text-sm" style={{ color: 'var(--morandi-warm-gray)' }}>高强度，间歇训练</div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: 'var(--morandi-terracotta)' }}>
                    {result.peak.min}-{result.peak.max} bpm
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
