'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Something went wrong!</h2>
      <Button
        onClick={reset}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Try again
      </Button>
    </div>
  );
} 