"use client";

import { FC, useMemo } from "react";
import Countdown from "react-countdown";
import { PrismicNextImage } from "@prismicio/next";
import { type Content } from "@prismicio/client";

interface PageHeaderProps {
  logo?: Content.PageHeaderSliceDefaultPrimary["wca_logo"];
  text?: string;
  days?: number;
  hours?: number;
  minute?: number;
  seconds_value?: number;
}

export const PageHeader: FC<PageHeaderProps> = ({
  logo,
  text,
  days = 0,
  hours = 0,
  minute = 0,
  seconds_value = 0,
}) => {
  // Calculate target date from initial countdown values
  const targetDate = useMemo(() => {
    const now = Date.now();
    const totalMilliseconds =
      (days || 0) * 24 * 60 * 60 * 1000 +
      (hours || 0) * 60 * 60 * 1000 +
      (minute || 0) * 60 * 1000 +
      (seconds_value || 0) * 1000;
    return now + totalMilliseconds;
  }, [days, hours, minute, seconds_value]);

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
        <div className="flex gap-2 md:gap-4 flex-shrink-0">
          <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="text-2xl md:text-3xl font-bold">00</span>
            <span className="text-xs uppercase">Hours</span>
          </div>
          <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="text-2xl md:text-3xl font-bold">00</span>
            <span className="text-xs uppercase">Min</span>
          </div>
          <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="text-2xl md:text-3xl font-bold">00</span>
            <span className="text-xs uppercase">Sec</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex gap-2 md:gap-4 flex-shrink-0" suppressHydrationWarning>
        {countdownDays > 0 && (
          <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
              {countdownDays}
            </span>
            <span className="text-xs uppercase">Days</span>
          </div>
        )}
        <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
            {String(countdownHours).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase">Hours</span>
        </div>
        <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
            {String(countdownMinutes).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase">Min</span>
        </div>
        <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
            {String(countdownSeconds).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase">Sec</span>
        </div>
      </div>
    );
  };

  return (
    <header className="w-full bg-gradient-to-b from-blue-900 to-blue-800 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        {logo && (
          <div className="flex-shrink-0">
            <PrismicNextImage
              field={logo}
              alt=""
              className="w-[92px] h-[82px] object-contain"
            />
          </div>
        )}

        {/* Text */}
        {text && (
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold">{text}</h1>
          </div>
        )}

        {/* Countdown Timer */}
        {(days !== null || hours !== null || minute !== null || seconds_value !== null) && (
          <Countdown
            date={targetDate}
            renderer={countdownRenderer}
            key={`${days}-${hours}-${minute}-${seconds_value}`}
          />
        )}
      </div>
    </header>
  );
};
