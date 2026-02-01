// BMI Calculator
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return '偏瘦';
  if (bmi < 24) return '正常';
  if (bmi < 28) return '偏胖';
  return '肥胖';
}

// Calorie Calculator (BMR using Mifflin-St Jeor Equation)
export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female'
): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export function calculateTDEE(bmr: number, activityLevel: number): number {
  return bmr * activityLevel;
}

// Heart Rate Zones
export function calculateHeartRateZones(age: number): {
  resting: number;
  fatBurn: { min: number; max: number };
  cardio: { min: number; max: number };
  peak: { min: number; max: number };
  max: number;
} {
  const maxHR = 220 - age;

  return {
    resting: 60,
    fatBurn: { min: Math.round(maxHR * 0.5), max: Math.round(maxHR * 0.6) },
    cardio: { min: Math.round(maxHR * 0.6), max: Math.round(maxHR * 0.7) },
    peak: { min: Math.round(maxHR * 0.7), max: Math.round(maxHR * 0.85) },
    max: maxHR,
  };
}

// Personality Test (simplified MBTI-like)
export interface PersonalityQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  }[];
}

export const personalityQuestions: PersonalityQuestion[] = [
  {
    id: 1,
    question: '在社交场合中，你通常：',
    options: [
      { text: '主动与人交流，享受热闹氛围', dimension: 'E' },
      { text: '选择安静交谈或独自观察', dimension: 'I' },
    ],
  },
  {
    id: 2,
    question: '面对问题时，你更关注：',
    options: [
      { text: '具体的现实细节和事实', dimension: 'S' },
      { text: '整体的模式和可能性', dimension: 'N' },
    ],
  },
  {
    id: 3,
    question: '做决定时，你更倾向：',
    options: [
      { text: '逻辑分析和客观标准', dimension: 'T' },
      { text: '个人价值观和他人感受', dimension: 'F' },
    ],
  },
  {
    id: 4,
    question: '日常生活中，你喜欢：',
    options: [
      { text: '有计划、按部就班', dimension: 'J' },
      { text: '灵活随性、保持开放', dimension: 'P' },
    ],
  },
  {
    id: 5,
    question: '在团队合作中，你通常：',
    options: [
      { text: '积极推动讨论和行动', dimension: 'E' },
      { text: '先思考再发表意见', dimension: 'I' },
    ],
  },
  {
    id: 6,
    question: '学习新知识时，你偏好：',
    options: [
      { text: '循序渐进、注重细节', dimension: 'S' },
      { text: '先了解整体概念', dimension: 'N' },
    ],
  },
  {
    id: 7,
    question: '处理冲突时，你会：',
    options: [
      { text: '直接分析问题、寻找解决方案', dimension: 'T' },
      { text: '先考虑各方感受', dimension: 'F' },
    ],
  },
  {
    id: 8,
    question: '面对突发计划变化，你：',
    options: [
      { text: '感到不安，希望按计划进行', dimension: 'J' },
      { text: '灵活应对，享受变化', dimension: 'P' },
    ],
  },
];

export function calculatePersonality(answers: string[]): string {
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  answers.forEach((answer, index) => {
    const question = personalityQuestions[index];
    const selectedOption = question.options.find((opt) => opt.dimension === answer);
    if (selectedOption) {
      counts[selectedOption.dimension]++;
    }
  });

  return (
    (counts.E >= counts.I ? 'E' : 'I') +
    (counts.S >= counts.N ? 'S' : 'N') +
    (counts.T >= counts.F ? 'T' : 'F') +
    (counts.J >= counts.P ? 'J' : 'P')
  );
}

export function getPersonalityDescription(type: string): string {
  const descriptions: Record<string, string> = {
    INTJ: '建筑师：富有想象力和战略性的思考者，一切皆在计划之中。',
    INTP: '逻辑学家：具有创新性的发明家，对知识有着止不住的渴望。',
    ENTJ: '指挥官：大胆、富有想象力且意志强大的领导者。',
    ENTP: '辩论家：聪明好奇的思考者，无法抗拒智力上的挑战。',
    INFJ: '提倡者：安静而神秘，鼓舞人心且不知疲倦的理想主义者。',
    INFP: '调停者：诗意、善良的利他主义者，总是热情地为正义事业提供帮助。',
    ENFJ: '主人公：富有魅力和鼓舞人心的领导者，有使听众着迷的能力。',
    ENFP: '竞选者：充满热情、有创造力且社交能力强，总是寻找生活的意义。',
    ISTJ: '物流师：实际且注重事实的个人，可靠性不容怀疑。',
    ISFJ: '守卫者：非常专注而温暖的守护者，时刻准备保护爱着的人。',
    ESTJ: '总经理：出色的管理者，在管理事情或人的时候无与伦比。',
    ESFJ: '执政官：极度关心他人、社交能力强、总是热心帮助他人。',
    ISTP: '鉴赏家：大胆而实际的实验家，擅长使用各种工具。',
    ISFP: '探险家：灵活有魅力的艺术家，时刻准备着探索和体验新事物。',
    ESTP: '企业家：聪明、精力充沛的感知者，真心享受活在边缘的生活。',
    ESFP: '表演者：自发的、精力充沛而热情的表演者，生活在他们周围永不无聊。',
  };

  return descriptions[type] || '独特的个性组合';
}
