"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `PageHeader`.
 */
export type PageHeaderProps = SliceComponentProps<Content.PageHeaderSlice>;

/**
 * Component for "PageHeader" Slices.
 */
const PageHeader: FC<PageHeaderProps> = ({ slice }) => {
  const { wca_logo, text, days, hours, minute, seconds_value } = slice.primary;

  // Calculate target date from the countdown values
  // Note: This assumes the numbers represent remaining time
  // If you have a target date instead, use that
  // Track if component has mounted to prevent hydration mismatches
  const [mounted, setMounted] = useState(false);
  
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
    // Only start countdown after component has mounted
    if (!mounted) return;

    // If you have actual countdown values, decrement them
    // For a real countdown, you'd typically use a target date
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
    <header
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-linear-to-b from-blue-900 to-blue-800 text-white py-4 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        {wca_logo && (
          <div className="shrink-0">
            <PrismicNextImage
              field={wca_logo}
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

        {/* Countdown Timer - Only render after mount to prevent hydration issues */}
        {mounted && (days !== null || hours !== null || minute !== null || seconds_value !== null) && (
          <div className="flex gap-2 md:gap-4 shrink-0">
            {countdown.days > 0 && (
              <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
                <span className="text-2xl md:text-3xl font-bold">
                  {countdown.days}
                </span>
                <span className="text-xs uppercase">Days</span>
              </div>
            )}
            <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold">
                {String(countdown.hours).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase">Hours</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold">
                {String(countdown.minutes).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase">Min</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold">
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

export default PageHeader;
