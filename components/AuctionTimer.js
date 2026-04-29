'use client';

import { useEffect, useState } from 'react';

export default function AuctionTimer({ initialTime, onTimerEnd }) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimerEnd?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimerEnd]);

  const getTimerColor = () => {
    if (timeRemaining > 30) return 'text-green-600';
    if (timeRemaining > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="text-center">
      <div className={`text-6xl font-bold ${getTimerColor()}`}>
        {timeRemaining}s
      </div>
      <p className="text-gray-600 mt-2">Time Remaining</p>
    </div>
  );
}
