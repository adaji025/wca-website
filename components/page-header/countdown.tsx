"use client";

import { useMemo } from "react";
import Countdown from "react-countdown";

interface CountdownTimerProps {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export default function CountdownTimer({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
}: CountdownTimerProps) {
  // Calculate target date from initial countdown values
  const targetDate = useMemo(() => {
    const now = Date.now();
    const totalMilliseconds =
      (days || 0) * 24 * 60 * 60 * 1000 +
      (hours || 0) * 60 * 60 * 1000 +
      (minutes || 0) * 60 * 1000 +
      (seconds || 0) * 1000;
    return now + totalMilliseconds;
  }, [days, hours, minutes, seconds]);

  // Countdown renderer function
  const countdownRenderer = ({
    days: countdownDays,
    hours: countdownHours,
    minutes: countdownMinutes,
    seconds: countdownSeconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return (
        <div className="flex gap-4 justify-center">
          <div className="text-center">
            <div className="font-bold text26">Days</div>
            <div>0</div>
          </div>
          <div className="text-center">
            <div className="font-bold text26">Hours</div>
            <div>0</div>
          </div>
          <div className="text-center">
            <div className="font-bold text26">Minutes</div>
            <div>0</div>
          </div>
          <div className="text-center">
            <div className="font-bold text26">Seconds</div>
            <div>0</div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex gap-4 justify-center" suppressHydrationWarning>
        {countdownDays > 0 && (
          <div className="text-center">
            <div className="font-bold text26">Days</div>
            <div suppressHydrationWarning>{countdownDays}</div>
          </div>
        )}
        <div className="text-center">
          <div className="font-bold text26">Hours</div>
          <div suppressHydrationWarning>{String(countdownHours).padStart(2, "0")}</div>
        </div>
        <div className="text-center">
          <div className="font-bold text26">Minutes</div>
          <div suppressHydrationWarning>{String(countdownMinutes).padStart(2, "0")}</div>
        </div>
        <div className="text-center">
          <div className="font-bold text26">Seconds</div>
          <div suppressHydrationWarning>{String(countdownSeconds).padStart(2, "0")}</div>
        </div>
      </div>
    );
  };

  return (
    <Countdown
      date={targetDate}
      renderer={countdownRenderer}
      key={`${days}-${hours}-${minutes}-${seconds}`}
    />
  );
}

