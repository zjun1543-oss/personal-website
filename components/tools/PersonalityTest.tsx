'use client';

import { useState } from 'react';
import { personalityQuestions, calculatePersonality, getPersonalityDescription } from '@/lib/tools';

type Answer = string;
type Answers = Answer[];

export default function PersonalityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (dimension: string) => {
    const newAnswers = [...answers, dimension];
    setAnswers(newAnswers);

    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / personalityQuestions.length) * 100;

  if (showResult) {
    const result = calculatePersonality(answers);
    const description = getPersonalityDescription(result);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="text-6xl mb-6">🎭</div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--morandi-charcoal)' }}>
            你的性格类型是
          </h2>
          <div
            className="text-4xl font-bold mb-6 p-6 rounded-lg"
            style={{ backgroundColor: 'var(--morandi-light-sage)', color: 'var(--morandi-sage)' }}
          >
            {result}
          </div>
          <p className="text-lg mb-8" style={{ color: 'var(--morandi-warm-gray)' }}>
            {description}
          </p>
          <button onClick={resetTest} className="btn-primary">
            重新测试
          </button>
        </div>
      </div>
    );
  }

  const question = personalityQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--morandi-warm-gray)' }}>
            <span>问题 {currentQuestion + 1} / {personalityQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--morandi-cream)' }}>
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${progress}%`, backgroundColor: 'var(--morandi-sage)' }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-center" style={{ color: 'var(--morandi-charcoal)' }}>
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.dimension)}
              className="w-full p-4 text-left rounded-lg border-2 transition-all hover:scale-[1.02]"
              style={{
                borderColor: 'var(--morandi-light-sage)',
                backgroundColor: 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--morandi-sage)';
                e.currentTarget.style.backgroundColor = 'var(--morandi-light-sage)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--morandi-light-sage)';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <span className="font-medium" style={{ color: 'var(--morandi-charcoal)' }}>
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
