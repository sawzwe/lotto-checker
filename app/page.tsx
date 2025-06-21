"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { OTPInput } from "@/components/ui/otp-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Search, Moon, Sun, Info, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import {
  checkLotteryNumber,
  getCurrentDraw,
  getAllDraws,
  getDrawByDate,
  formatDrawDate,
  LotteryResult,  
} from "@/lib/mockData";
import Result from "@/components/Result";
import "@/lib/i18n";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LotteryResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [inputNumber, setInputNumber] = useState("");
  const [selectedDrawDate, setSelectedDrawDate] = useState<string>("latest");
  const [showWinningNumbers, setShowWinningNumbers] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // Get the selected draw
  const selectedDraw = useMemo(() => {
    if (selectedDrawDate === "latest") {
      return getCurrentDraw();
    }
    return getDrawByDate(selectedDrawDate) || getCurrentDraw();
  }, [selectedDrawDate]);

  // Create validation schema with translations
  const formSchema = useMemo(
    () =>
      z.object({
        lotteryNumber: z
          .string()
          .min(6, t("validation.exactly6Digits"))
          .max(6, t("validation.exactly6Digits"))
          .regex(/^\d{6}$/, t("validation.numbersOnly")),
      }),
    [t]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lotteryNumber: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update document language when i18n language changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  // Update form validation when language changes
  useEffect(() => {
    form.clearErrors();
    // Re-validate current field value with new schema
    if (form.getValues().lotteryNumber) {
      form.trigger();
    }
  }, [i18n.language, form, formSchema]);

  // Clear results when draw changes
  useEffect(() => {
    if (showResult) {
      setShowResult(false);
      setResult(null);
      setInputNumber("");
    }
    // Also hide winning numbers when changing draws to prevent spoilers
    setShowWinningNumbers(false);
  }, [selectedDrawDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setShowResult(false);
    setResult(null);
    setInputNumber(values.lotteryNumber);

    // Simulate loading for 1 second
    setTimeout(() => {
      try {
        const checkResult = checkLotteryNumber(
          values.lotteryNumber,
          t,
          selectedDraw
        );
        setResult(checkResult);
        setShowResult(true);
      } catch (error) {
        console.error("Error checking lottery:", error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleNewCheck = () => {
    setShowResult(false);
    setResult(null);
    setInputNumber("");
    form.reset();
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "th" ? "en" : "th";
    i18n.changeLanguage(newLanguage);
  };

  // Function to determine which positions should be highlighted based on prize type
  const getWinningPositions = (prizeType: string): number[] => {
    switch (prizeType) {
      case "first":
      case "adjacent":
      case "second":
      case "third":
      case "fourth":
      case "fifth":
        return [0, 1, 2, 3, 4, 5]; // All 6 digits
      case "front3":
        return [0, 1, 2]; // First 3 digits
      case "back3":
        return [3, 4, 5]; // Last 3 digits
      case "last2":
        return [4, 5]; // Last 2 digits
      default:
        return []; // No highlighting for no prize
    }
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
                title={
                  i18n.language === "th"
                    ? "Switch to English"
                    : "เปลี่ยนเป็นภาษาไทย"
                }
              >
                <Languages className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            {formatDrawDate(selectedDraw.date, i18n.language)}
          </p>

          <div className="flex flex-col items-center gap-3">
            {/* Date Selection */}
            <div className="w-full max-w-xs">
              <Select
                value={selectedDrawDate}
                onValueChange={setSelectedDrawDate}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("ui.selectDate")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">
                    📅 {t("ui.latest")} -{" "}
                    {formatDrawDate(getCurrentDraw().date, i18n.language)}
                  </SelectItem>
                  {getAllDraws().map((draw) => (
                    <SelectItem key={draw.date} value={draw.date}>
                      📅 {formatDrawDate(draw.date, i18n.language)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                  {t("formTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="lotteryNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("numberLabel")}
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-3">
                              <OTPInput
                                value={field.value}
                                onChange={field.onChange}
                                disabled={isLoading}
                                winningPositions={
                                  result ? getWinningPositions(result.type) : []
                                }
                                showWinning={
                                  showResult && result?.type !== "none"
                                }
                              />
                              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                {t("numberPlaceholder")}
                              </p>
                            </div>
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
                            {t("checkingButton")}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            {t("checkButton")}
                          </div>
                        )}
                      </Button>

                      {showResult && (
                        <Button
                          onClick={handleNewCheck}
                          variant="outline"
                          className="w-full h-12 text-lg font-semibold"
                        >
                          {t("newCheckButton")}
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
          <Result
            result={result}
            inputNumber={inputNumber}
            isVisible={showResult}
          />

          {/* Mock Data Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-blue-200 dark:border-gray-700">
              <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-lg">
                    <Info className="h-5 w-5" />
                    {t("ui.winningNumbers")}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowWinningNumbers(!showWinningNumbers)}
                    className="text-sm"
                  >
                    {showWinningNumbers ? t("ui.hideWinningNumbers") : t("ui.showWinningNumbers")}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {showWinningNumbers ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-yellow-600 dark:text-yellow-400">
                      {t("categories.firstPrize")}
                    </h4>
                    <div className="space-y-1">
                      {selectedDraw.firstPrize.map(
                        (num: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="default"
                            className="font-mono"
                          >
                            {num}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-600 dark:text-gray-400">
                      {t("categories.secondPrize")}
                    </h4>
                    <div className="space-y-1">
                      {selectedDraw.secondPrize.map(
                        (num: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="font-mono"
                          >
                            {num}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-600 dark:text-green-400">
                      {t("categories.frontThree")}
                    </h4>
                    <div className="space-y-1">
                      {selectedDraw.frontThreeDigits.map(
                        (num: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="font-mono"
                          >
                            {num}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                      {t("categories.backThree")}
                    </h4>
                    <div className="space-y-1">
                      {selectedDraw.backThreeDigits.map(
                        (num: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="font-mono"
                          >
                            {num}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400">
                      {t("categories.lastTwo")}
                    </h4>
                    <div className="space-y-1">
                      {selectedDraw.lastTwoDigits.map(
                        (num: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="font-mono"
                          >
                            {num}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🔒</div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                      {t("ui.winningNumbers")}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                      {i18n.language === "th" 
                        ? "คลิกปุ่มด้านบนเพื่อแสดงเลขที่ออกรางวัล" 
                        : "Click the button above to reveal winning numbers"}
                    </p>
                  </div>
                )}
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
                {t("ui.adPlaceholder")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
