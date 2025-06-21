import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  winningPositions?: number[];
  showWinning?: boolean;
}

export function OTPInput({ 
  value, 
  onChange, 
  disabled = false, 
  winningPositions = [], 
  showWinning = false 
}: OTPInputProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  const digits = useMemo(() => (value + '      ').slice(0, 6).split(''), [value]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || disabled) return;
    
    const firstEmptyIndex = digits.findIndex(digit => digit === ' ' || digit === '');
    if (firstEmptyIndex !== -1) {
      // Use a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        inputRefs.current[firstEmptyIndex]?.focus();
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [digits, disabled, isMounted]);

  const handleInputChange = useCallback((index: number, inputValue: string) => {
    if (disabled || !isMounted) return;

    const digit = inputValue.replace(/\D/g, '');
    
    if (digit.length > 1) {
      const newDigits = [...digits];
      const pastedDigits = digit.slice(0, 6 - index);
      
      for (let i = 0; i < pastedDigits.length && index + i < 6; i++) {
        newDigits[index + i] = pastedDigits[i];
      }
      
      const newValue = newDigits.join('').replace(/\s/g, '');
      onChange(newValue);
      
      const nextIndex = Math.min(index + pastedDigits.length, 5);
      setTimeout(() => inputRefs.current[nextIndex]?.focus(), 0);
    } else {
      const newDigits = [...digits];
      newDigits[index] = digit;
      
      const newValue = newDigits.join('').replace(/\s/g, '');
      onChange(newValue);
      
      if (digit && index < 5) {
        setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
      }
    }
  }, [digits, onChange, disabled, isMounted ]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || !isMounted) return;
    
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newDigits = [...digits];
      
      if (digits[index] && digits[index] !== ' ') {
        newDigits[index] = ' ';
      } else if (index > 0) {
        newDigits[index - 1] = ' ';
        setTimeout(() => inputRefs.current[index - 1]?.focus(), 0);
      }
      
      const newValue = newDigits.join('').replace(/\s/g, '');
      onChange(newValue);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  }, [digits, onChange, disabled, isMounted]);

  const handleFocus = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleBlur = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const isWinning = useCallback((index: number) => {
    return showWinning && winningPositions.includes(index);
  }, [showWinning, winningPositions]);

  if (!isMounted) {
    return (
      <div className="flex gap-2 justify-center items-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="relative">
            <div className="w-12 h-14 border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-center items-center">
      {digits.map((digit, index) => (
        <div key={`input-${index}-${digit}`} className="relative">
          <input
          ref={el => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit === ' ' ? '' : digit}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          disabled={disabled || !isMounted}
          className={cn(
            "w-12 h-14 text-center text-2xl font-mono font-bold border-2 rounded-lg",
            "focus:outline-none transition-all duration-300",
            "border-gray-300 bg-white text-gray-900",
            "dark:border-gray-600 dark:bg-gray-800 dark:text-white",
            !isWinning(index) && activeIndex === index && [
              "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            ],
            disabled && "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700",
            isWinning(index) && [
              "border-green-500 dark:border-green-400",
              "bg-green-50 dark:bg-green-900/20",
              "text-green-800 dark:text-green-200",
              "shadow-lg shadow-green-300/70 dark:shadow-green-400/40",
              "animate-pulse",
              "transition-all duration-200 ease-out"
            ],
            isWinning(index) && activeIndex === index && [
              "ring-2 ring-green-400/50 dark:ring-green-300/50"
            ]
          )}
        />
        </div>
      ))}
    </div>
  );
} 