import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  th: {
    translation: {
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
        adjacent: 'รางวัลข้างเคียงรางวัลที่ 1',
        second: 'รางวัลที่ 2',
        third: 'รางวัลที่ 3',
        fourth: 'รางวัลที่ 4',
        fifth: 'รางวัลที่ 5',
        front3: 'รางวัลเลขหน้า 3 ตัว',
        back3: 'รางวัลเลขท้าย 3 ตัว',
        last2: 'รางวัลเลขท้าย 2 ตัว',
        none: 'ไม่ถูกรางวัล',
      },
      
      amounts: {
        first: '6,000,000 บาท',
        adjacent: '100,000 บาท',
        second: '200,000 บาท',
        third: '80,000 บาท',
        fourth: '40,000 บาท',
        fifth: '20,000 บาท',
        front3: '4,000 บาท',
        back3: '4,000 บาท',
        last2: '2,000 บาท',
        none: '0 บาท',
      },
      
      results: {
        first: 'ยินดีด้วย! คุณถูกรางวัลที่ 1',
        adjacent: 'ยินดีด้วย! คุณถูกรางวัลข้างเคียงรางวัลที่ 1',
        second: 'ยินดีด้วย! คุณถูกรางวัลที่ 2',
        third: 'ยินดีด้วย! คุณถูกรางวัลที่ 3',
        fourth: 'ยินดีด้วย! คุณถูกรางวัลที่ 4',
        fifth: 'ยินดีด้วย! คุณถูกรางวัลที่ 5',
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
        winningNumbers: 'เลขที่ออกรางวัล',
        mockDataNote: 'ข้อมูลตัวอย่าง',
        adPlaceholder: '📢 พื้นที่สำหรับโฆษณา AdSense',
        selectDate: 'เลือกงวดสลาก',
        latest: 'ล่าสุด',
        showWinningNumbers: 'แสดงเลขที่ออกรางวัล',
        hideWinningNumbers: 'ซ่อนเลขที่ออกรางวัล',
      },
      
      categories: {
        firstPrize: 'รางวัลที่ 1',
        secondPrize: 'รางวัลที่ 2',
        frontThree: 'เลขหน้า 3 ตัว',
        backThree: 'เลขท้าย 3 ตัว',
        lastTwo: 'เลขท้าย 2 ตัว',
      },
    },
  },
  en: {
    translation: {
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
        adjacent: 'Adjacent to 1st Prize',
        second: '2nd Prize',
        third: '3rd Prize',
        fourth: '4th Prize',
        fifth: '5th Prize',
        front3: 'Front 3 Digits Prize',
        back3: 'Back 3 Digits Prize',
        last2: 'Last 2 Digits Prize',
        none: 'No Prize',
      },
      
      amounts: {
        first: '6,000,000 THB',
        adjacent: '100,000 THB',
        second: '200,000 THB',
        third: '80,000 THB',
        fourth: '40,000 THB',
        fifth: '20,000 THB',
        front3: '4,000 THB',
        back3: '4,000 THB',
        last2: '2,000 THB',
        none: '0 THB',
      },
      
      results: {
        first: 'Congratulations! You won the 1st Prize!',
        adjacent: 'Congratulations! You won the Adjacent to 1st Prize!',
        second: 'Congratulations! You won the 2nd Prize!',
        third: 'Congratulations! You won the 3rd Prize!',
        fourth: 'Congratulations! You won the 4th Prize!',
        fifth: 'Congratulations! You won the 5th Prize!',
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
        winningNumbers: 'Winning Numbers',
        mockDataNote: 'Sample Data',
        adPlaceholder: '📢 AdSense Advertisement Space',
        selectDate: 'Select Draw Date',
        latest: 'Latest',
        showWinningNumbers: 'Show Winning Numbers',
        hideWinningNumbers: 'Hide Winning Numbers',
      },
      
      categories: {
        firstPrize: '1st Prize',
        secondPrize: '2nd Prize',
        frontThree: 'Front 3 Digits',
        backThree: 'Back 3 Digits',
        lastTwo: 'Last 2 Digits',
      },
    },
  },
};

let isInitialized = false;

const LANGUAGE_KEY = 'lotto-checker-language';

// Get saved language from localStorage or default to 'th'
const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LANGUAGE_KEY) || 'th';
  }
  return 'th';
};

// Save language to localStorage
const saveLanguage = (language: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_KEY, language);
  }
};

const initI18n = () => {
  if (!isInitialized && typeof window !== 'undefined') {
    const savedLanguage = getSavedLanguage();
    
    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      });

    // Save language when it changes
    i18n.on('languageChanged', (lng) => {
      saveLanguage(lng);
    });

    isInitialized = true;
  }
  return i18n;
};

export default initI18n(); 