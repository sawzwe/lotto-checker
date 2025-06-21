export interface LotteryResult {
  type: 'first' | 'adjacent' | 'second' | 'third' | 'fourth' | 'fifth' | 'front3' | 'back3' | 'last2' | 'none';
  prize: string;
  amount: string;
  description: string;
  winningNumber?: string; // The specific winning number that matched
}

export interface LotteryDraw {
  date: string;
  firstPrize: string[];           // 1 number
  adjacentToFirst: string[];      // 2 numbers (adjacent to first prize)
  secondPrize: string[];          // 5 numbers
  thirdPrize: string[];           // 10 numbers
  fourthPrize: string[];          // 50 numbers
  fifthPrize: string[];           // 100 numbers
  frontThreeDigits: string[];     // 2 sets of 3-digit numbers
  backThreeDigits: string[];      // 2 sets of 3-digit numbers
  lastTwoDigits: string[];        // 1 set of 2-digit numbers
}

export const MOCK_LOTTERY_DRAWS: LotteryDraw[] = [
  // January 16, 2025
  {
    date: '2025-01-16',
    firstPrize: ['123456'],
    adjacentToFirst: ['123455', '123457'],
    secondPrize: ['234567', '345678', '456789', '567890', '678901'],
    thirdPrize: ['789012', '890123', '901234', '012345', '135792', '246813', '357924', '468035', '579146', '680257'],
    fourthPrize: [
      '147258', '258369', '369470', '470581', '581692', '692703', '703814', '814925', '925036', '036147',
      '159357', '260468', '371579', '482680', '593791', '604802', '715913', '826024', '937135', '048246',
      '172839', '283940', '394051', '405162', '516273', '627384', '738495', '849506', '950617', '061728',
      '184062', '295173', '306284', '417395', '528406', '639517', '740628', '851739', '962840', '073951',
      '195284', '206395', '317406', '428517', '539628', '640739', '751840', '862951', '974062', '085173'
    ],
    fifthPrize: [
      '108642', '219753', '320864', '431975', '542086', '653197', '764208', '875319', '986420', '097531',
      '120975', '231086', '342197', '453208', '564319', '675420', '786531', '897642', '908753', '019864',
      '143208', '254319', '365420', '476531', '587642', '698753', '709864', '810975', '921086', '032197',
      '165431', '276542', '387653', '498764', '509875', '610986', '721097', '832108', '943219', '054320',
      '187654', '298765', '309876', '410987', '521098', '632109', '743210', '854321', '965432', '076543',
      '209087', '310198', '421209', '532310', '643421', '754532', '865643', '976754', '087865', '198976',
      '231420', '342531', '453642', '564753', '675864', '786975', '897086', '908197', '019208', '120319',
      '253753', '364864', '475975', '586086', '697197', '708208', '819319', '920420', '031531', '142642',
      '275086', '386197', '497208', '508319', '619420', '720531', '831642', '942753', '053864', '164975',
      '297419', '308520', '419631', '520742', '631853', '742964', '854075', '965186', '076297', '187308'
    ],
    frontThreeDigits: ['123', '789'],
    backThreeDigits: ['456', '012'],
    lastTwoDigits: ['56']
  },
  // January 1, 2025
  {
    date: '2025-01-01',
    firstPrize: ['987654'],
    adjacentToFirst: ['987653', '987655'],
    secondPrize: ['876543', '765432', '654321', '543210', '432109'],
    thirdPrize: ['321098', '210987', '109876', '098765', '864297', '753186', '642075', '531964', '420853', '319742'],
    fourthPrize: [
      '852741', '741630', '630519', '519408', '408297', '297186', '186075', '075964', '964853', '853742',
      '741963', '630852', '519741', '408630', '297519', '186408', '075297', '964186', '853075', '742964',
      '630185', '519074', '408963', '297852', '186741', '075630', '964519', '853408', '742297', '631186',
      '520075', '409964', '298853', '187742', '076631', '965520', '854409', '743298', '632187', '521076',
      '410965', '309854', '198743', '087632', '976521', '865410', '754309', '643198', '532087', '421976'
    ],
    fifthPrize: [
      '369852', '258741', '147630', '036519', '925408', '814297', '703186', '592075', '481964', '370853',
      '147963', '036852', '925741', '814630', '703519', '592408', '481297', '370186', '259075', '148964',
      '037853', '926742', '815631', '704520', '593409', '482298', '371187', '260076', '149965', '038854',
      '927743', '816632', '705521', '594410', '483299', '372188', '261077', '150966', '039855', '928744',
      '817633', '706522', '595411', '484300', '373189', '262078', '151967', '040856', '929745', '818634',
      '707523', '596412', '485301', '374190', '263079', '152968', '041857', '930746', '819635', '708524',
      '597413', '486302', '375191', '264080', '153969', '042858', '931747', '820636', '709525', '598414',
      '487303', '376192', '265081', '154970', '043859', '932748', '821637', '710526', '599415', '488304',
      '377193', '266082', '155971', '044860', '933749', '822638', '711527', '600416', '489305', '378194',
      '267083', '156972', '045861', '934750', '823639', '712528', '601417', '490306', '379195', '268084'
    ],
    frontThreeDigits: ['987', '321'],
    backThreeDigits: ['654', '876'],
    lastTwoDigits: ['54']
  },
  // December 16, 2024
  {
    date: '2024-12-16',
    firstPrize: ['555666'],
    adjacentToFirst: ['555665', '555667'],
    secondPrize: ['111222', '333444', '777888', '999000', '666777'],
    thirdPrize: ['123789', '456012', '789345', '012678', '345901', '678234', '901567', '234890', '567123', '890456'],
    fourthPrize: [
      '147025', '258136', '369247', '470358', '581469', '692570', '703681', '814792', '925803', '036914',
      '159260', '260371', '371482', '482593', '593604', '604715', '715826', '826937', '937048', '048159',
      '172495', '283506', '394617', '405728', '516839', '627940', '738051', '849162', '950273', '061384',
      '184730', '295841', '306952', '417063', '528174', '639285', '740396', '851407', '962518', '073629',
      '196965', '207076', '318187', '429298', '530409', '641520', '752631', '863742', '974853', '085964'
    ],
    fifthPrize: [
      '108531', '219642', '320753', '431864', '542975', '653086', '764197', '875208', '986319', '097420',
      '120864', '231975', '342086', '453197', '564208', '675319', '786420', '897531', '908642', '019753',
      '143197', '254208', '365319', '476420', '587531', '698642', '709753', '810864', '921975', '032086',
      '165420', '276531', '387642', '498753', '509864', '610975', '721086', '832197', '943208', '054319',
      '187753', '298864', '309975', '410086', '521197', '632208', '743319', '854420', '965531', '076642',
      '209086', '310197', '421208', '532319', '643420', '754531', '865642', '976753', '087864', '198975',
      '231419', '342520', '453631', '564742', '675853', '786964', '897075', '908186', '019297', '120308',
      '253642', '364753', '475864', '586975', '697086', '708197', '819208', '920319', '031420', '142531',
      '275975', '386086', '497197', '508208', '619319', '720420', '831531', '942642', '053753', '164864',
      '297308', '308419', '419520', '520631', '631742', '742853', '853964', '965075', '076186', '187297'
    ],
    frontThreeDigits: ['555', '123'],
    backThreeDigits: ['666', '789'],
    lastTwoDigits: ['66']
  },
  // December 1, 2024
  {
    date: '2024-12-01',
    firstPrize: ['888999'],
    adjacentToFirst: ['888998', '889000'],
    secondPrize: ['777666', '555444', '333222', '111000', '999888'],
    thirdPrize: ['654987', '321654', '987321', '654123', '321789', '789456', '456012', '012345', '345678', '678901'],
    fourthPrize: [
      '159753', '260864', '371975', '482086', '593197', '604208', '715319', '826420', '937531', '048642',
      '171986', '282097', '393108', '404219', '515320', '626431', '737542', '848653', '959764', '060875',
      '184219', '295320', '306431', '417542', '528653', '639764', '740875', '851986', '962097', '073108',
      '196452', '207563', '318674', '429785', '530896', '641907', '752018', '863129', '974230', '085341',
      '208685', '319796', '420807', '531918', '642029', '753130', '864241', '975352', '086463', '197574'
    ],
    fifthPrize: [
      '120642', '231753', '342864', '453975', '564086', '675197', '786208', '897319', '908420', '019531',
      '132975', '243086', '354197', '465208', '576319', '687420', '798531', '809642', '920753', '031864',
      '155208', '266319', '377420', '488531', '599642', '610753', '721864', '832975', '943086', '054197',
      '177531', '288642', '399753', '410864', '521975', '632086', '743197', '854208', '965319', '076420',
      '199864', '210975', '321086', '432197', '543208', '654319', '765420', '876531', '987642', '098753',
      '211197', '322208', '433319', '544420', '655531', '766642', '877753', '988864', '099975', '110086',
      '233420', '344531', '455642', '566753', '677864', '788975', '899086', '910197', '021208', '132319',
      '255753', '366864', '477975', '588086', '699197', '710208', '821319', '932420', '043531', '154642',
      '277086', '388197', '499208', '510319', '621420', '732531', '843642', '954753', '065864', '176975',
      '299319', '310420', '421531', '532642', '643753', '754864', '865975', '976086', '087197', '198208'
    ],
    frontThreeDigits: ['888', '654'],
    backThreeDigits: ['999', '987'],
    lastTwoDigits: ['99']
  }
];

// Get the current active lottery draw (most recent)
export function getCurrentDraw(): LotteryDraw {
  return MOCK_LOTTERY_DRAWS[0]; // Most recent draw
}

// Get all available draws
export function getAllDraws(): LotteryDraw[] {
  return MOCK_LOTTERY_DRAWS;
}

// Get a specific draw by date
export function getDrawByDate(date: string): LotteryDraw | null {
  return MOCK_LOTTERY_DRAWS.find(draw => draw.date === date) || null;
}

// Format draw date for display
export function formatDrawDate(date: string, language: string = 'th'): string {
  const drawDate = new Date(date);
  
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

export function checkLotteryNumber(inputNumber: string, t: (key: string) => string, selectedDraw?: LotteryDraw): LotteryResult {
  // Ensure input is exactly 6 digits
  if (inputNumber.length !== 6 || !/^\d{6}$/.test(inputNumber)) {
    throw new Error('Invalid input: Must be exactly 6 digits');
  }

  const currentDraw = selectedDraw || getCurrentDraw();

  // Priority order checking as specified
  
  // 1. First Prize - Exact 6-digit match
  if (currentDraw.firstPrize.includes(inputNumber)) {
    return {
      type: 'first',
      prize: t('prizes.first'),
      amount: t('amounts.first'),
      description: t('results.first'),
      winningNumber: inputNumber
    };
  }

  // 2. Adjacent to First Prize - Numbers adjacent to first prize
  if (currentDraw.adjacentToFirst.includes(inputNumber)) {
    return {
      type: 'adjacent',
      prize: t('prizes.adjacent'),
      amount: t('amounts.adjacent'),
      description: t('results.adjacent'),
      winningNumber: inputNumber
    };
  }

  // 3. Second Prize - Exact match in secondPrize array
  if (currentDraw.secondPrize.includes(inputNumber)) {
    return {
      type: 'second',
      prize: t('prizes.second'),
      amount: t('amounts.second'),
      description: t('results.second'),
      winningNumber: inputNumber
    };
  }

  // 4. Third Prize
  if (currentDraw.thirdPrize.includes(inputNumber)) {
    return {
      type: 'third',
      prize: t('prizes.third'),
      amount: t('amounts.third'),
      description: t('results.third'),
      winningNumber: inputNumber
    };
  }

  // 5. Fourth Prize
  if (currentDraw.fourthPrize.includes(inputNumber)) {
    return {
      type: 'fourth',
      prize: t('prizes.fourth'),
      amount: t('amounts.fourth'),
      description: t('results.fourth'),
      winningNumber: inputNumber
    };
  }

  // 6. Fifth Prize
  if (currentDraw.fifthPrize.includes(inputNumber)) {
    return {
      type: 'fifth',
      prize: t('prizes.fifth'),
      amount: t('amounts.fifth'),
      description: t('results.fifth'),
      winningNumber: inputNumber
    };
  }

  // 7. Front 3 digits - First 3 digits match frontThreeDigits
  const frontThree = inputNumber.substring(0, 3);
  if (currentDraw.frontThreeDigits.includes(frontThree)) {
    return {
      type: 'front3',
      prize: t('prizes.front3'),
      amount: t('amounts.front3'),
      description: t('results.front3'),
      winningNumber: frontThree
    };
  }

  // 8. Back 3 digits - Last 3 digits match backThreeDigits
  const backThree = inputNumber.substring(3, 6);
  if (currentDraw.backThreeDigits.includes(backThree)) {
    return {
      type: 'back3',
      prize: t('prizes.back3'),
      amount: t('amounts.back3'),
      description: t('results.back3'),
      winningNumber: backThree
    };
  }

  // 9. Last 2 digits - Last 2 digits match lastTwoDigits
  const lastTwo = inputNumber.substring(4, 6);
  if (currentDraw.lastTwoDigits.includes(lastTwo)) {
    return {
      type: 'last2',
      prize: t('prizes.last2'),
      amount: t('amounts.last2'),
      description: t('results.last2'),
      winningNumber: lastTwo
    };
  }

  // 10. No match
  return {
    type: 'none',
    prize: t('prizes.none'),
    amount: t('amounts.none'),
    description: t('results.none')
  };
}

export function getLotteryDrawDate(language: string = 'th', selectedDraw?: LotteryDraw): string {
  const currentDraw = selectedDraw || getCurrentDraw();
  return formatDrawDate(currentDraw.date, language);
} 