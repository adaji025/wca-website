"use client";

import Countdown from "react-countdown";

interface CountdownTimerProps {
  eventDate: string;
}

export default function CountdownTimer({ eventDate }: CountdownTimerProps) {
  // Convert the event date string to a timestamp
  const targetDate = new Date(eventDate).getTime();

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
      key={eventDate}
    />
  );
}

