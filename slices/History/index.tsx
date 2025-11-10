"use client";
import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import Bounded from "@/components/bounded";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Props for `History`.
 */
export type HistoryProps = SliceComponentProps<Content.HistorySlice>;

/**
 * Component for "History" Slices.
 */
const History: FC<HistoryProps> = ({ slice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const items = slice.primary.items || [];
  const totalItems = items.length;

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (totalItems === 0) {
    return null;
  }

  const currentItem = items[currentIndex];

  // Helper function to get timeline events
  const getTimelineEvents = (item: typeof currentItem) => {
    const events: Array<{
      year?: typeof item.year1;
      month?: typeof item.month1;
      title?: typeof item.title1;
      text?: typeof item.text1;
      index: number;
    }> = [];
    for (let i = 1; i <= 5; i++) {
      const year = item[`year${i}` as keyof typeof item] as
        | typeof item.year1
        | undefined;
      const month = item[`month${i}` as keyof typeof item] as
        | typeof item.month1
        | undefined;
      const title = item[`title${i}` as keyof typeof item] as
        | typeof item.title1
        | undefined;
      const text = item[`text${i}` as keyof typeof item] as
        | typeof item.text1
        | undefined;

      if (year || month || title || text) {
        events.push({ year, month, title, text, index: i });
      }
    }
    return events;
  };

  const timelineEvents = getTimelineEvents(currentItem);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20"
    >
      <Bounded>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`carousel-${currentIndex}`}
            initial={
              direction === 0
                ? false
                : { opacity: 0, x: direction > 0 ? 50 : -50 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col lg:flex-row gap-10 lg:gap-20"
          >
            {/* Left Column */}
            <div className="flex-1 flex flex-col">
              {/* Header with divider */}
              <div className="mb-6">
                <div className="text38 text-wca-secondary font-sans mb-3">
                  <Image
                    src="/images/pngs/divider.png"
                    height={20}
                    width={100}
                    alt="divider"
                  />
                  <PrismicRichText field={slice.primary.title} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-6">
                {currentItem.item_title && (
                  <div className="text38 text-wca-secondary font-sans">
                    <PrismicRichText field={currentItem.item_title} />
                  </div>
                )}

                {currentItem.item_text && (
                  <div className="text-wca-gray font-sans leading-relaxed">
                    <PrismicRichText field={currentItem.item_text} />
                  </div>
                )}

                {currentItem.image && (
                  <div className="mt-4">
                    <PrismicNextImage
                      field={currentItem.image}
                      className="w-full h-[266px] object-cover"
                      alt=""
                    />
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={goToPrevious}
                    className="flex justify-center items-center rounded-full text-wca-secondary h-10 w-10 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-300"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="flex justify-center items-center rounded-full text-wca-secondary h-10 w-10 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-300"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Pagination Dots */}
                  <div className="flex gap-2 ml-4">
                    {items.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "bg-yellow-400 w-2"
                            : "bg-gray-300 hover:bg-gray-400 w-2"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Timeline */}
            <div className="flex-1">
              <div className="relative pr-4">
                <div className="relative">
                  {timelineEvents.map((event, eventIndex) => {
                    const isLastItem = eventIndex === timelineEvents.length - 1;

                    return (
                      <div
                        key={eventIndex}
                        className="relative"
                        style={{ marginBottom: isLastItem ? "0" : "4rem" }}
                      >
                        {/* Timeline SVG - box with line for all except last, box only for last */}
                        <div className="absolute left-0 top-0">
                          {isLastItem ? (
                            <Image
                              src="/images/svgs/timeline-box.svg"
                              width={48}
                              height={48}
                              alt="timeline box"
                              className="w-12 h-12"
                            />
                          ) : (
                            <Image
                              src="/images/svgs/time-box-and-line.svg"
                              width={48}
                              height={164}
                              alt="timeline box and line"
                              className="w-12 h-auto"
                            />
                          )}
                        </div>

                        {/* Event Content */}
                        <div className="pl-16 pt-1">
                          {(event.year || event.month) && (
                            <div className="text-sm text-wca-primary capitalize font-sans mb-3">
                              {event.year && (
                                <span className="inline-block">
                                  <PrismicRichText field={event.year} />
                                </span>
                              )}
                              {event.year && event.month && (
                                <span className="mx-1">•</span>
                              )}
                              {event.month && (
                                <span className="inline-block">
                                  <PrismicRichText field={event.month} />
                                </span>
                              )}
                            </div>
                          )}

                          {event.title && (
                            <div className="text26 text-wca-primary font-sans mb-3">
                              <PrismicRichText field={event.title} />
                            </div>
                          )}

                          {event.text && (
                            <div className="text-sm text-wca-gray font-sans leading-relaxed">
                              <PrismicRichText field={event.text} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Bounded>
    </section>
  );
};

export default History;
