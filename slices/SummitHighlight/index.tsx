"use client"
import { FC, useState, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/bounded";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowRight } from "@/components/svg";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Props for `SummitHighlight`.
 */
export type SummitHighlightProps =
  SliceComponentProps<Content.SummitHighlightSlice>;

/**
 * Component for "SummitHighlight" Slices.
 */
const SummitHighlight: FC<SummitHighlightProps> = ({ slice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Get items from the repeatable group field
  const items = slice.primary.item || [];
  
  // Create carousel items from the group items
  const carouselItems = items.map((item) => {
    const gridImages = [
      item.image2,
      item.image3,
      item.image4,
      item.image5,
      item.image6,
      item.image7,
    ].filter(Boolean);

    return {
      type: "featured-with-grid" as const,
      image: item.image1,
      title: item.post_title,
      description: item.post_description,
      link: item.see_all,
      gridImages: gridImages,
    };
  });

  const totalItems = carouselItems.length;

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

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20"
    >
      <Bounded>
        <div className="flex justify-between items-end gap-10">
          <div>
            <Image
              src="/images/pngs/divider.png"
              height={12}
              width={100}
              className="mb-2 h-1"
              alt="divider"
            />
            <div className="text-wca-gray text26 font-medium">
              <PrismicRichText field={slice.primary.title} />
            </div>
            <div className="text38 text-wca-secondary mt-2">
              <PrismicRichText field={slice.primary.title2} />
            </div>
          </div>
          <div className="bg-[#FBE5B6] px-6 py-3  hidden sm:block">
            <PrismicNextLink field={slice.primary.view_all} />
          </div>
        </div>
        {/* Carousel */}
        <div className="mt-10 relative overflow-hidden min-h-[400px]" ref={carouselRef}>
          {carouselItems.length === 0 ? (
            <div className="text-wca-gray p-4">
              <p>No carousel items available.</p>
              <p>Items array length: {items.length}</p>
              <p>Slice primary keys: {Object.keys(slice.primary).join(", ")}</p>
            </div>
          ) : carouselItems[currentIndex] ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`carousel-${currentIndex}`}
                initial={direction === 0 ? false : { opacity: 0, x: direction > 0 ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="flex flex-col md:flex-row gap-10 w-full"
              >
                {(() => {
                  const currentItem = carouselItems[currentIndex];
                  return (
                    <>
                      <div className="flex-1 flex flex-col justify-between gap-3">
                        <div className="flex-1">
                          {currentItem.image && (
                            <PrismicNextImage field={currentItem.image} className="w-full h-96 object-cover" />
                          )}
                          {currentItem.title && (
                            <div className="text26 mt-3">
                              <PrismicRichText field={currentItem.title} />
                            </div>
                          )}
                          {currentItem.description && (
                            <div className="text-wca-gray mt-2">
                              <PrismicRichText field={currentItem.description} />
                            </div>
                          )}
                          {currentItem.link && (
                            <div className="mt-2 flex gap-2 text-[#177402] items-center">
                              <PrismicNextLink field={currentItem.link} />
                              <ArrowRight />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-5">
                        {currentItem.gridImages.map((img, imgIndex) => (
                          <PrismicNextImage className="w-full h-[162px] object-cover" key={imgIndex} field={img} />
                        ))}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-wca-gray p-4">
              <p>Current index {currentIndex} is out of bounds.</p>
              <p>Total items: {carouselItems.length}</p>
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={goToPrevious}
            className="flex justify-center items-center border rounded-full text-wca-gray h-12 w-12 cursor-pointer hover:bg-wca-gray hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goToNext}
            className="flex justify-center items-center border rounded-full text-wca-gray h-12 w-12 cursor-pointer hover:bg-wca-gray hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>
        </div>
      </Bounded>
    </section>
  );
};

export default SummitHighlight;
