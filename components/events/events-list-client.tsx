"use client";

import React, { useState, useMemo } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import {
  ChevronDown,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import type { EventsDetailsDocument } from "@/prismicio-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import Bounded from "@/components/bounded";

type SortOption =
  | "default"
  | "date_desc"
  | "date_asc"
  | "title_asc"
  | "title_desc";

interface EventsListClientProps {
  events: EventsDetailsDocument[];
  showFilters?: boolean;
}

const EventsListClient: React.FC<EventsListClientProps> = ({
  events,
  showFilters = true,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper function to extract text from Prismic RichText field
  const getRichTextAsString = (field: any): string => {
    if (!field || !Array.isArray(field)) return "";
    return field
      .map((item: any) => item?.text || "")
      .join(" ")
      .trim();
  };

  // Format date
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format date range for display
  const formatDateRange = (event: EventsDetailsDocument) => {
    const startDate = event.data.start_date;
    const endDate = event.data.end_date;
    
    if (!startDate && !endDate) return "";
    if (!endDate || startDate === endDate) {
      return formatDate(startDate);
    }
    
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  };

  // Sort events
  const sortedEvents = useMemo(() => {
    const sorted = [...events];
    switch (sortBy) {
      case "title_asc":
        sorted.sort((a, b) => {
          const titleA = getRichTextAsString(a.data.tiltle);
          const titleB = getRichTextAsString(b.data.tiltle);
          return titleA.localeCompare(titleB);
        });
        break;
      case "title_desc":
        sorted.sort((a, b) => {
          const titleA = getRichTextAsString(a.data.tiltle);
          const titleB = getRichTextAsString(b.data.tiltle);
          return titleB.localeCompare(titleA);
        });
        break;
      case "date_asc":
        sorted.sort((a, b) => {
          const dateA = a.data.start_date ? new Date(a.data.start_date).getTime() : 0;
          const dateB = b.data.start_date ? new Date(b.data.start_date).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case "date_desc":
        sorted.sort((a, b) => {
          const dateA = a.data.start_date ? new Date(a.data.start_date).getTime() : 0;
          const dateB = b.data.start_date ? new Date(b.data.start_date).getTime() : 0;
          return dateB - dateA;
        });
        break;
      default:
        // Default: sort by start date (upcoming first, then past)
        sorted.sort((a, b) => {
          const dateA = a.data.start_date ? new Date(a.data.start_date).getTime() : 0;
          const dateB = b.data.start_date ? new Date(b.data.start_date).getTime() : 0;
          const now = Date.now();
          
          // Upcoming events first
          const aIsUpcoming = dateA > now;
          const bIsUpcoming = dateB > now;
          
          if (aIsUpcoming && !bIsUpcoming) return -1;
          if (!aIsUpcoming && bIsUpcoming) return 1;
          
          // Both upcoming or both past - sort by date
          if (aIsUpcoming && bIsUpcoming) {
            return dateA - dateB; // Soonest first
          } else {
            return dateB - dateA; // Most recent first
          }
        });
    }

    return sorted;
  }, [events, sortBy]);

  // Group items into carousel slides
  const { slides, totalSlides, maxIndex } = useMemo(() => {
    const itemsPerView = 4; // Show 4 items at a time
    const eventList = sortedEvents;

    // Group items into slides
    const slideGroups: EventsDetailsDocument[][] = [];
    for (let i = 0; i < eventList.length; i += itemsPerView) {
      slideGroups.push(eventList.slice(i, i + itemsPerView));
    }

    return {
      slides: slideGroups,
      totalSlides: slideGroups.length,
      maxIndex: Math.max(0, slideGroups.length - 1),
    };
  }, [sortedEvents]);

  // Reset index when filters change
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [sortBy]);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  return (
    <section className="bg-white pb-10">
      <Image
        src="/images/pngs/header-bg.png"
        height={138}
        width={1000}
        alt="wca header image"
        className="w-full"
      />

      <Bounded>
        {/* Filters and Sort Header */}
        {!showFilters && (
          <div className="text38 mt-6 mb-6 font-serif">
            Related Events
          </div>
        )}
        {showFilters && (
          <div className="flex items-center border-b border-gray-300 mt-16 mb-8 overflow-x-auto">
            {/* Sort By Dropdown */}
            <div className="ml-auto bg-[#f5f5f5] px-6 py-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 font-bold text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  <span>Sort by</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  <DropdownMenuItem
                    onClick={() => setSortBy("default")}
                    className={
                      sortBy === "default" ? "bg-gray-100 font-medium" : ""
                    }
                  >
                    Upcoming First
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("date_asc")}
                    className={
                      sortBy === "date_asc" ? "bg-gray-100 font-medium" : ""
                    }
                  >
                    Date (Oldest First)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("date_desc")}
                    className={
                      sortBy === "date_desc" ? "bg-gray-100 font-medium" : ""
                    }
                  >
                    Date (Newest First)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("title_asc")}
                    className={
                      sortBy === "title_asc" ? "bg-gray-100 font-medium" : ""
                    }
                  >
                    Title (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("title_desc")}
                    className={
                      sortBy === "title_desc" ? "bg-gray-100 font-medium" : ""
                    }
                  >
                    Title (Z-A)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

        {/* Events Carousel */}
        {sortedEvents.length > 0 ? (
          <div className={`relative h-fit ${!showFilters ? "mt-8" : ""}`}>
            {/* Carousel Container */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500 ease-in-out items-start"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="shrink-0 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-start"
                  >
                    {slide.map((event) => (
                      <Link
                        key={event.uid}
                        href={`/events/${event.uid}`}
                        className="flex h-fit flex-col"
                      >
                        {/* Event Image */}
                        <div className="w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {event.data.feature_image?.url ? (
                            <PrismicNextImage
                              field={event.data.feature_image}
                              className="w-full h-[200px] object-cover"
                            />
                          ) : (
                            <div className="w-full h-[200px] bg-gray-300 flex items-center justify-center">
                              <svg
                                className="w-12 h-12 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Event Info */}
                        <div className="mt-4 flex flex-col gap-3 flex-1">
                          {/* Event Title */}
                          {event.data.tiltle && (
                            <h3 className="text-lg font-bold text-wca-secondary line-clamp-2">
                              <PrismicRichText field={event.data.tiltle} />
                            </h3>
                          )}

                          {/* Date Range */}
                          {(event.data.start_date || event.data.end_date) && (
                            <div className="flex items-center gap-2 text-sm text-wca-gray">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDateRange(event)}</span>
                            </div>
                          )}

                          {/* Description Preview */}
                          {event.data.details && (
                            <p className="text-sm text-wca-gray line-clamp-3">
                              {getRichTextAsString(event.data.details)}
                            </p>
                          )}

                          {/* Read More Link */}
                          <div className="mt-auto flex justify-end pt-2">
                            <div className="flex items-center gap-2 text-[#177402] font-medium text-sm hover:gap-3 transition-all">
                              Read more
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            {totalSlides > 1 && (
              <div className="flex justify-between items-center mt-8">
                {/* Chevron Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    disabled={!canGoPrev}
                    className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${
                      canGoPrev
                        ? "hover:bg-gray-50 text-gray-700"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                    aria-label="Previous items"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={!canGoNext}
                    className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${
                      canGoNext
                        ? "hover:bg-gray-50 text-gray-700"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                    aria-label="Next items"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentIndex === index ? "bg-black" : "bg-[#f5f5dc]"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No events found.</p>
          </div>
        )}
      </Bounded>
    </section>
  );
};

export default EventsListClient;

