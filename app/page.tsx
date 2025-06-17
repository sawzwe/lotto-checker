'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Search, Calendar, Moon, Sun, Info, Languages } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/components/language-provider';
import { checkLotteryNumber, getLotteryDrawDate, MOCK_RESULTS, LotteryResult } from '@/lib/mockData';
import { Language } from '@/lib/translations';
import Result from '@/components/Result';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LotteryResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [inputNumber, setInputNumber] = useState('');
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Create validation schema with translations
  const formSchema = useMemo(() => z.object({
    lotteryNumber: z
      .string()
      .min(6, t.validation.exactly6Digits)
      .max(6, t.validation.exactly6Digits)
      .regex(/^\d{6}$/, t.validation.numbersOnly),
  }), [t]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lotteryNumber: '',
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update form validation when language changes
  useEffect(() => {
    form.clearErrors();
    // Re-validate current field value with new schema
    if (form.getValues().lotteryNumber) {
      form.trigger();
    }
  }, [language, form, formSchema]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setShowResult(false);
    setResult(null);
    setInputNumber(values.lotteryNumber);

    // Simulate loading for 1 second
    setTimeout(() => {
      try {
        const checkResult = checkLotteryNumber(values.lotteryNumber, language);
        setResult(checkResult);
        setShowResult(true);
      } catch (error) {
        console.error('Error checking lottery:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleNewCheck = () => {
    setShowResult(false);
    setResult(null);
    setInputNumber('');
    form.reset();
  };

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'th' ? 'en' : 'th';
    setLanguage(newLanguage);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Skeleton className="w-96 h-64" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleLanguage}
                className="rounded-full"
                title={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
              >
                <Languages className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            {t.subtitle}
          </p>
          
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{t.drawDate} {getLotteryDrawDate(language)}</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="max-w-md mx-auto shadow-lg border-2 border-blue-200 dark:border-gray-700">
              <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold">
                  {t.formTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="lotteryNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t.numberLabel}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t.numberPlaceholder}
                              className="text-center text-2xl font-mono tracking-wider h-14 border-2 focus:border-blue-500"
                              maxLength={6}
                              disabled={isLoading}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                            {t.checkingButton}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            {t.checkButton}
                          </div>
                        )}
                      </Button>

                      {showResult && (
                        <Button
                          onClick={handleNewCheck}
                          variant="outline"
                          className="w-full h-12 text-lg font-semibold"
                        >
                          {t.newCheckButton}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto"
            >
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Result Display */}
          <Result result={result} inputNumber={inputNumber} isVisible={showResult} />

          {/* Mock Data Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-blue-200 dark:border-gray-700">
              <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="h-5 w-5" />
                  {t.ui.winningNumbers}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-yellow-600 dark:text-yellow-400">{t.categories.firstPrize}</h4>
                    <div className="space-y-1">
                      {MOCK_RESULTS.firstPrize.map((num, idx) => (
                        <Badge key={idx} variant="default" className="font-mono">
                          {num}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-600 dark:text-gray-400">{t.categories.secondPrize}</h4>
                    <div className="space-y-1">
                      {MOCK_RESULTS.secondPrize.map((num, idx) => (
                        <Badge key={idx} variant="secondary" className="font-mono">
                          {num}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-600 dark:text-green-400">{t.categories.frontThree}</h4>
                    <div className="space-y-1">
                      {MOCK_RESULTS.frontThreeDigits.map((num, idx) => (
                        <Badge key={idx} variant="outline" className="font-mono">
                          {num}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">{t.categories.backThree}</h4>
                    <div className="space-y-1">
                      {MOCK_RESULTS.backThreeDigits.map((num, idx) => (
                        <Badge key={idx} variant="outline" className="font-mono">
                          {num}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400">{t.categories.lastTwo}</h4>
                    <div className="space-y-1">
                      {MOCK_RESULTS.lastTwoDigits.map((num, idx) => (
                        <Badge key={idx} variant="outline" className="font-mono">
                          {num}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AdSense Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t.ui.adPlaceholder}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
