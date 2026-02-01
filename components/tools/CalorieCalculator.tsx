'use client';

import { useState } from 'react';
import { calculateBMR, calculateTDEE } from '@/lib/tools';

export default function CalorieCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const activityLevels = [
    { value: 1.2, label: '久坐不动（很少或没有运动）' },
    { value: 1.375, label: '轻度活动（每周1-3天轻度运动）' },
    { value: 1.55, label: '中度活动（每周3-5天中等运动）' },
    { value: 1.725, label: '高度活动（每周6-7天剧烈运动）' },
    { value: 1.9, label: '非常活跃（体力劳动或每天训练）' },
  ];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (w && h && a) {
      const bmr = calculateBMR(w, h, a, gender);
      const tdee = calculateTDEE(bmr, activityLevel);
      setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="card">
        <form onSubmit={handleCalculate} className="space-y-6">
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--morandi-charcoal)' }}>
              性别
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  gender === 'male' ? 'border-primary' : ''
                }`}
                style={{
                  borderColor: gender === 'male' ? 'var(--morandi-dusty-rose)' : 'var(--morandi-light-rose)',
                  backgroundColor: gender === 'male' ? 'var(--morandi-dusty-rose)' : 'white',
                  color: gender === 'male' ? 'white' : 'var(--morandi-charcoal)',
                }}
              >
                男性
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  gender === 'female' ? 'border-primary' : ''
                }`}
                style={{
                  borderColor: gender === 'female' ? 'var(--morandi-dusty-rose)' : 'var(--morandi-light-rose)',
                  backgroundColor: gender === 'female' ? 'var(--morandi-dusty-rose)' : 'white',
                  color: gender === 'female' ? 'white' : 'var(--morandi-charcoal)',
                }}
              >
                女性
              </button>
            </div>
          </div>

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
              style={{ borderColor: 'var(--morandi-light-rose)' }}
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
              style={{ borderColor: 'var(--morandi-light-rose)' }}
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--morandi-charcoal)' }}>
              年龄
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="例如: 25"
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-primary"
              style={{ borderColor: 'var(--morandi-light-rose)' }}
              required
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--morandi-charcoal)' }}>
              活动水平
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: 'var(--morandi-light-rose)' }}
            >
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary w-full">
            计算热量需求
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--morandi-light-rose)' }}>
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: 'var(--morandi-charcoal)' }}>
              计算结果
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--morandi-warm-gray)' }}>基础代谢率 (BMR)</span>
                <span className="text-2xl font-bold" style={{ color: 'var(--morandi-dusty-rose)' }}>
                  {result.bmr} 大卡/天
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--morandi-warm-gray)' }}>每日总消耗 (TDEE)</span>
                <span className="text-2xl font-bold" style={{ color: 'var(--morandi-dusty-rose)' }}>
                  {result.tdee} 大卡/天
                </span>
              </div>
              <div className="pt-4 border-t text-sm" style={{ borderColor: 'var(--morandi-dusty-rose)', color: 'var(--morandi-warm-gray)' }}>
                <p>• 减肥: 每日摄入约 {Math.round(result.tdee * 0.8)} 大卡</p>
                <p>• 保持: 每日摄入约 {result.tdee} 大卡</p>
                <p>• 增重: 每日摄入约 {Math.round(result.tdee * 1.1)} 大卡</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
