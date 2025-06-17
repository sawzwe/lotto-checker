export type Language = 'th' | 'en';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  drawDate: string;
  
  // Form
  formTitle: string;
  numberLabel: string;
  numberPlaceholder: string;
  checkButton: string;
  checkingButton: string;
  newCheckButton: string;
  
  // Validation Messages
  validation: {
    required: string;
    exactly6Digits: string;
    numbersOnly: string;
  };
  
  // Prize Types
  prizes: {
    first: string;
    second: string;
    front3: string;
    back3: string;
    last2: string;
    none: string;
  };
  
  // Prize Amounts
  amounts: {
    first: string;
    second: string;
    front3: string;
    back3: string;
    last2: string;
    none: string;
  };
  
  // Result Messages
  results: {
    first: string;
    second: string;
    front3: string;
    back3: string;
    last2: string;
    none: string;
  };
  
  // UI Elements
  ui: {
    winner: string;
    tryAgain: string;
    prizeAmount: string;
    numberPrefix: string;
    winningNumbers: string;
    mockDataNote: string;
    adPlaceholder: string;
  };
  
  // Prize Categories Display
  categories: {
    firstPrize: string;
    secondPrize: string;
    frontThree: string;
    backThree: string;
    lastTwo: string;
  };
}

export const translations: Record<Language, Translations> = {
  th: {
    title: '🎲 ตรวจสอบรางวัลหวย',
    subtitle: 'ตรวจสอบผลรางวัลสลากกินแบ่งรัฐบาลออนไลน์',
    drawDate: 'งวดประจำวันที่',
    
    formTitle: 'กรอกหมายเลขสลาก',
    numberLabel: 'หมายเลขสลาก (6 หลัก)',
    numberPlaceholder: 'ระบุเลข 6 หลัก เช่น 123456',
    checkButton: 'ตรวจสอบรางวัล',
    checkingButton: 'กำลังตรวจสอบ...',
    newCheckButton: 'ตรวจสอบครั้งใหม่',
    
    validation: {
      required: 'กรุณากรอกเลข 6 หลัก',
      exactly6Digits: 'กรุณากรอกเลข 6 หลัก',
      numbersOnly: 'กรุณากรอกตัวเลข 6 หลักเท่านั้น',
    },
    
    prizes: {
      first: 'รางวัลที่ 1',
      second: 'รางวัลที่ 2',
      front3: 'รางวัลเลขหน้า 3 ตัว',
      back3: 'รางวัลเลขท้าย 3 ตัว',
      last2: 'รางวัลเลขท้าย 2 ตัว',
      none: 'ไม่ถูกรางวัล',
    },
    
    amounts: {
      first: '6,000,000 บาท',
      second: '200,000 บาท',
      front3: '4,000 บาท',
      back3: '4,000 บาท',
      last2: '2,000 บาท',
      none: '0 บาท',
    },
    
    results: {
      first: 'ยินดีด้วย! คุณถูกรางวัลที่ 1',
      second: 'ยินดีด้วย! คุณถูกรางวัลที่ 2',
      front3: 'ยินดีด้วย! คุณถูกรางวัลเลขหน้า 3 ตัว',
      back3: 'ยินดีด้วย! คุณถูกรางวัลเลขท้าย 3 ตัว',
      last2: 'ยินดีด้วย! คุณถูกรางวัลเลขท้าย 2 ตัว',
      none: 'เสียใจด้วย ครั้งหน้าโชคจะดีกว่าแน่นอน',
    },
    
    ui: {
      winner: 'ชนะแล้ว!',
      tryAgain: 'ลองใหม่นะ!',
      prizeAmount: 'เงินรางวัล',
      numberPrefix: 'หมายเลข',
      winningNumbers: 'เลขที่ออกรางวัล (ข้อมูลตัวอย่าง)',
      mockDataNote: 'ข้อมูลตัวอย่าง',
      adPlaceholder: '📢 พื้นที่สำหรับโฆษณา AdSense',
    },
    
    categories: {
      firstPrize: 'รางวัลที่ 1',
      secondPrize: 'รางวัลที่ 2',
      frontThree: 'เลขหน้า 3 ตัว',
      backThree: 'เลขท้าย 3 ตัว',
      lastTwo: 'เลขท้าย 2 ตัว',
    },
  },
  
  en: {
    title: '🎲 Thai Lottery Checker',
    subtitle: 'Check Thai Government Lottery Results Online',
    drawDate: 'Draw Date',
    
    formTitle: 'Enter Lottery Number',
    numberLabel: 'Lottery Number (6 digits)',
    numberPlaceholder: 'Enter 6 digits, e.g. 123456',
    checkButton: 'Check Prize',
    checkingButton: 'Checking...',
    newCheckButton: 'New Check',
    
    validation: {
      required: 'Please enter 6 digits',
      exactly6Digits: 'Please enter exactly 6 digits',
      numbersOnly: 'Please enter numbers only',
    },
    
    prizes: {
      first: '1st Prize',
      second: '2nd Prize',
      front3: 'Front 3 Digits Prize',
      back3: 'Back 3 Digits Prize',
      last2: 'Last 2 Digits Prize',
      none: 'No Prize',
    },
    
    amounts: {
      first: '6,000,000 THB',
      second: '200,000 THB',
      front3: '4,000 THB',
      back3: '4,000 THB',
      last2: '2,000 THB',
      none: '0 THB',
    },
    
    results: {
      first: 'Congratulations! You won the 1st Prize!',
      second: 'Congratulations! You won the 2nd Prize!',
      front3: 'Congratulations! You won the Front 3 Digits Prize!',
      back3: 'Congratulations! You won the Back 3 Digits Prize!',
      last2: 'Congratulations! You won the Last 2 Digits Prize!',
      none: 'Sorry, no prize this time. Better luck next time!',
    },
    
    ui: {
      winner: 'Winner!',
      tryAgain: 'Try Again!',
      prizeAmount: 'Prize Amount',
      numberPrefix: 'Number',
      winningNumbers: 'Winning Numbers (Mock Data)',
      mockDataNote: 'Sample Data',
      adPlaceholder: '📢 AdSense Advertisement Space',
    },
    
    categories: {
      firstPrize: '1st Prize',
      secondPrize: '2nd Prize',
      frontThree: 'Front 3 Digits',
      backThree: 'Back 3 Digits',
      lastTwo: 'Last 2 Digits',
    },
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
} 