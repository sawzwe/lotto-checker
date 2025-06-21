'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trophy, Star, DollarSign, X } from 'lucide-react';
import { LotteryResult } from '@/lib/mockData';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import '@/lib/i18n';

interface ResultProps {
  result: LotteryResult | null;
  inputNumber: string;
  isVisible: boolean;
}

const prizeIcons = {
  first: Trophy,
  second: Star,
  front3: DollarSign,
  back3: DollarSign,
  last2: DollarSign,
  none: X
};

const prizeColors = {
  first: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600',
  second: 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500',
  front3: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
  back3: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
  last2: 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600',
  none: 'bg-gradient-to-r from-red-400 via-red-500 to-red-600'
};

const badgeVariants = {
  first: 'default',
  second: 'secondary',
  front3: 'default',
  back3: 'default',
  last2: 'default',
  none: 'destructive'
} as const;

export default function Result({ result, inputNumber, isVisible }: ResultProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { t } = useTranslation();

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    if (result && result.type !== 'none' && isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [result, isVisible]);

  if (!result || !isVisible) return null;

  const isWinner = result.type !== 'none';
  const Icon = prizeIcons[result.type as keyof typeof prizeIcons];

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
        />
      )}

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
            delay: 0.2 
          }}
          className="w-full max-w-md mx-auto"
        >
          <Card className={cn(
            "overflow-hidden border-2 shadow-lg",
            isWinner ? "border-green-500 shadow-green-200" : "border-red-500 shadow-red-200"
          )}>
            <CardHeader className={cn(
              "text-center text-white",
              prizeColors[result.type as keyof typeof prizeColors]
            )}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-2"
              >
                <Icon className="h-12 w-12" />
              </motion.div>
              
              <CardTitle className="text-xl font-bold">
                {t('ui.numberPrefix')} {inputNumber}
              </CardTitle>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Badge 
                  variant={badgeVariants[result.type as keyof typeof badgeVariants]}
                  className="text-sm font-medium px-4 py-1"
                >
                  {result.prize}
                </Badge>
              </motion.div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Alert className={cn(
                  "border-2",
                  isWinner ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
                )}>
                  <AlertDescription className="text-center font-medium text-gray-800">
                    {result.description}
                  </AlertDescription>
                </Alert>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-center space-y-2"
              >
                <div className="text-sm text-gray-600">{t('ui.prizeAmount')}</div>
                <div className={cn(
                  "text-3xl font-bold",
                  isWinner ? "text-green-600" : "text-red-600"
                )}>
                  {result.amount}
                </div>
              </motion.div>

              {isWinner && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.1, 1] }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium">
                    <Trophy className="h-4 w-4" />
                    {t('ui.winner')}
                  </div>
                </motion.div>
              )}

              {!isWinner && (
                <motion.div
                  initial={{ x: [-10, 10, -10, 10, 0] }}
                  animate={{ x: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-red-800 text-sm font-medium">
                    <X className="h-4 w-4" />
                    {t('ui.tryAgain')}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  );
} 