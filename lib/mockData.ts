import { Language, getTranslation } from './translations';

export interface LotteryResult {
  type: 'first' | 'second' | 'front3' | 'back3' | 'last2' | 'none';
  prize: string;
  amount: string;
  description: string;
}

export const MOCK_RESULTS = {
  firstPrize: ['123456'],
  secondPrize: ['234567', '345678'],
  frontThreeDigits: ['123', '456'],
  backThreeDigits: ['789', '890'],
  lastTwoDigits: ['56']
};

export function checkLotteryNumber(inputNumber: string, language: Language = 'th'): LotteryResult {
  // Ensure input is exactly 6 digits
  if (inputNumber.length !== 6 || !/^\d{6}$/.test(inputNumber)) {
    throw new Error('Invalid input: Must be exactly 6 digits');
  }

  const t = getTranslation(language);

  // Priority order checking as specified
  
  // 1. First Prize - Exact 6-digit match
  if (MOCK_RESULTS.firstPrize.includes(inputNumber)) {
    return {
      type: 'first',
      prize: t.prizes.first,
      amount: t.amounts.first,
      description: t.results.first
    };
  }

  // 2. Second Prize - Exact match in secondPrize array
  if (MOCK_RESULTS.secondPrize.includes(inputNumber)) {
    return {
      type: 'second',
      prize: t.prizes.second,
      amount: t.amounts.second,
      description: t.results.second
    };
  }

  // 3. Front 3 digits - First 3 digits match frontThreeDigits
  const frontThree = inputNumber.substring(0, 3);
  if (MOCK_RESULTS.frontThreeDigits.includes(frontThree)) {
    return {
      type: 'front3',
      prize: t.prizes.front3,
      amount: t.amounts.front3,
      description: t.results.front3
    };
  }

  // 4. Back 3 digits - Last 3 digits match backThreeDigits
  const backThree = inputNumber.substring(3, 6);
  if (MOCK_RESULTS.backThreeDigits.includes(backThree)) {
    return {
      type: 'back3',
      prize: t.prizes.back3,
      amount: t.amounts.back3,
      description: t.results.back3
    };
  }

  // 5. Last 2 digits - Last 2 digits match lastTwoDigits
  const lastTwo = inputNumber.substring(4, 6);
  if (MOCK_RESULTS.lastTwoDigits.includes(lastTwo)) {
    return {
      type: 'last2',
      prize: t.prizes.last2,
      amount: t.amounts.last2,
      description: t.results.last2
    };
  }

  // 6. No match
  return {
    type: 'none',
    prize: t.prizes.none,
    amount: t.amounts.none,
    description: t.results.none
  };
}

export function getLotteryDrawDate(language: Language = 'th'): string {
  // Mock lottery draw date
  const today = new Date();
  const drawDate = new Date(today.getFullYear(), today.getMonth(), 16);
  
  // If we're past the 16th, show next month's draw
  if (today.getDate() > 16) {
    drawDate.setMonth(drawDate.getMonth() + 1);
  }
  
  if (language === 'en') {
    return drawDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  return drawDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 