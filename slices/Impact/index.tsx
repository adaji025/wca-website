"use client"
import { FC, useState, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/bounded";

/**
 * Props for `Impact`.
 */
export type ImpactProps = SliceComponentProps<Content.ImpactSlice>;

/**
 * Hook to animate a number from 0 to target value
 */
const useCountUp = (target: number, duration: number = 2000, isVisible: boolean = false) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const previousVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    // Reset when component leaves viewport
    if (!isVisible && previousVisibleRef.current) {
      setCount(0);
      startTimeRef.current = undefined;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    }
    previousVisibleRef.current = isVisible;

    if (!isVisible || typeof target !== "number" || isNaN(target)) return;

    // Reset and start animation when entering viewport
    setCount(0);
    startTimeRef.current = undefined;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(target * easeOutQuart);

      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [target, duration, isVisible]);

  return count;
};

/**
 * Component for "Impact" Slices.
 */
const Impact: FC<ImpactProps> = ({ slice }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Reset when leaving viewport so animation can restart
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const productivityValue = useCountUp(
    Number(slice.primary.productivity_vlaue) || 0,
    2000,
    isVisible
  );
  const investmentValue = useCountUp(
    Number(slice.primary.investement_value) || 0,
    2000,
    isVisible
  );
  const customerValue = useCountUp(
    Number(slice.primary.customer_value) || 0,
    2000,
    isVisible
  );
  const reviewValue = useCountUp(
    Number(slice.primary.review_value) || 0,
    2000,
    isVisible
  );

  return (
    <section
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="impact-bg min-h-[400px] flex justify-start items-center text-white py-10"
    >
      <div className="app-width w-full">
        <div>
          <div className="text38 font-bold text-white/90">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="text-white/80">
            <PrismicRichText field={slice.primary.text} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-10 mt-10">
          <div className="flex-1">
            <span className="text38 font-black">
              {productivityValue}
              <span className="text-xl">X</span>
            </span>
            <PrismicRichText field={slice.primary.productivity_text} />
          </div>
          <div className="flex-1">
            <span className="text38 font-black">
              {investmentValue}
              <span className="test-sm">%</span>
            </span>
            <PrismicRichText field={slice.primary.investment_text} />
          </div>
          <div className="flex-1">
            <span className="text38 font-black">
              {customerValue}K<span className="text-s">+</span>
            </span>
            <PrismicRichText field={slice.primary.customer_text} />
          </div>
          <div className="flex-1">
            <span className="text38 font-black">
              {reviewValue}
              <span className="text-s">+</span>
            </span>
            <PrismicRichText field={slice.primary.review_text} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
