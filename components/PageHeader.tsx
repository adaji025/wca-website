"use client";

import { FC, useEffect, useState } from "react";
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
  days,
  hours,
  minute,
  seconds_value,
}) => {
  // Track if component has mounted to prevent hydration mismatches
  const [mounted, setMounted] = useState(false);
  
  // Initialize countdown state from props
  const [countdown, setCountdown] = useState({
    days: days || 0,
    hours: hours || 0,
    minutes: minute || 0,
    seconds: seconds_value || 0,
  });

  // Set mounted to true after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Update countdown from props if they change
    setCountdown({
      days: days || 0,
      hours: hours || 0,
      minutes: minute || 0,
      seconds: seconds_value || 0,
    });
  }, [days, hours, minute, seconds_value]);

  useEffect(() => {
    // Only start countdown after component has mounted
    if (!mounted) return;

    // Countdown timer logic
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mounted]);

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
          <div className="flex gap-2 md:gap-4 flex-shrink-0" suppressHydrationWarning>
            {countdown.days > 0 && (
              <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
                <span className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
                  {countdown.days}
                </span>
                <span className="text-xs uppercase">Days</span>
              </div>
            )}
            <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
                {String(countdown.hours).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase">Hours</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
                {String(countdown.minutes).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase">Min</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
                {String(countdown.seconds).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase">Sec</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
