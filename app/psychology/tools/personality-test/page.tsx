import PersonalityTest from '@/components/tools/PersonalityTest';

export const metadata = {
  title: '性格测试 - MySpace',
  description: '通过简化版MBTI测试了解你的性格类型',
};

export default function PersonalityTestPage() {
  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
          📝 性格测试
        </h1>
        <p className="text-lg" style={{ color: 'var(--morandi-warm-gray)' }}>
          回答8个问题，了解你的性格类型（简化版MBTI）
        </p>
      </div>
      <PersonalityTest />
    </div>
  );
}
