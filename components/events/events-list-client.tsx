"use client";

import React, { useState, useMemo } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import {
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  ExternalLink,
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

type FilterOption = "all" | "upcoming" | "past";

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
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(0);

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
      month: "long",
      day: "numeric",
    });
  };

  // Format date range for display
  const formatDateRange = (event: EventsDetailsDocument) => {
    const startTime = event.data.start_time;
    const endTime = event.data.end_time;

    if (!startTime && !endTime) return "";

    // Extract date portion from timestamps
    const startDate = startTime
      ? new Date(startTime).toISOString().split("T")[0]
      : null;
    const endDate = endTime
      ? new Date(endTime).toISOString().split("T")[0]
      : null;

    if (!endTime || startDate === endDate) {
      return formatDate(startTime);
    }

    const start = formatDate(startTime);
    const end = formatDate(endTime);
    return `${start} - ${end}`;
  };

  // Format time range
  const formatTimeRange = (event: EventsDetailsDocument) => {
    const startTime = event.data.start_time;
    const endTime = event.data.end_time;

    if (!startTime && !endTime) return "";

    const formatTime = (timestamp: string | null | undefined) => {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    };

    if (!endTime) {
      return formatTime(startTime);
    }

    const start = formatTime(startTime);
    const end = formatTime(endTime);
    return `${start} - ${end}`;
  };

  // Check if event is upcoming
  const isUpcoming = (event: EventsDetailsDocument): boolean => {
    if (!event.data.start_time) return false;
    const eventTime = new Date(event.data.start_time).getTime();
    return eventTime > Date.now();
  };

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    // First, filter by past/upcoming
    let filtered = events;
    if (filterBy !== "all") {
      filtered = events.filter((event) => {
        const upcoming = isUpcoming(event);
        if (filterBy === "upcoming") {
          return upcoming;
        } else if (filterBy === "past") {
          return !upcoming;
        }
        return true;
      });
    }

    // Then, sort
    const sorted = [...filtered];
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
          const dateA = a.data.start_time
            ? new Date(a.data.start_time).getTime()
            : 0;
          const dateB = b.data.start_time
            ? new Date(b.data.start_time).getTime()
            : 0;
          return dateA - dateB;
        });
        break;
      case "date_desc":
        sorted.sort((a, b) => {
          const dateA = a.data.start_time
            ? new Date(a.data.start_time).getTime()
            : 0;
          const dateB = b.data.start_time
            ? new Date(b.data.start_time).getTime()
            : 0;
          return dateB - dateA;
        });
        break;
      default:
        // Default: sort by start time (upcoming first, then past)
        sorted.sort((a, b) => {
          const dateA = a.data.start_time
            ? new Date(a.data.start_time).getTime()
            : 0;
          const dateB = b.data.start_time
            ? new Date(b.data.start_time).getTime()
            : 0;
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
  }, [events, filterBy, sortBy]);

  // Pagination
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredAndSortedEvents.length / itemsPerPage);
  const paginatedEvents = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return filteredAndSortedEvents.slice(start, start + itemsPerPage);
  }, [filteredAndSortedEvents, currentPage]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(0);
  }, [filterBy, sortBy]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const canGoNext = currentPage < totalPages - 1;
  const canGoPrev = currentPage > 0;

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
          <div className="text38 mt-6 mb-6 font-serif">Related Events</div>
        )}
        {showFilters && (
          <div className="flex items-center border-b border-gray-300 mt-16 mb-8 overflow-x-auto">
            {/* View All Button */}
            <button
              onClick={() => setFilterBy("all")}
              className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors ${
                filterBy === "all"
                  ? "bg-[#f5f5dc] text-gray-800"
                  : "bg-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              View all
            </button>

            {/* Filter Buttons */}
            <div className="flex-1 bg-white px-6 py-4 flex items-center gap-8 overflow-x-auto">
              <button
                onClick={() => setFilterBy("upcoming")}
                className={`px-4 py-2 font-bold text-sm whitespace-nowrap transition-colors rounded ${
                  filterBy === "upcoming"
                    ? "bg-[#f5f5dc] text-gray-800"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilterBy("past")}
                className={`px-4 py-2 font-bold text-sm whitespace-nowrap transition-colors rounded ${
                  filterBy === "past"
                    ? "bg-[#f5f5dc] text-gray-800"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Past
              </button>
            </div>

            {/* Sort By Dropdown */}
            <div className="bg-[#f5f5f5] px-6 py-3">
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

        {/* Events List */}
        {paginatedEvents.length > 0 ? (
          <div className={`space-y-8 ${!showFilters ? "mt-8" : ""}`}>
            {paginatedEvents.map((event) => {
              const upcoming = isUpcoming(event);

              return (
                <div
                  key={event.uid}
                  className="grid border border-wca-gray grid-cols-1 lg:grid-cols-2 gap-6 bg-white  overflow-hidden"
                >
                  {/* Left Section - Content */}
                  <div className="flex flex-col p-6 lg:p-8 relative">
                    {/* Status Badge */}
                    <div className="absolute top-6 left-6">
                      {upcoming ? (
                        <span className="inline-block px-4 py-2 bg-[#FEFF03] text-gray-800 text-sm font-bold">
                          Upcoming
                        </span>
                      ) : (
                        <span className="inline-block px-4 py-2 bg-wca-primary text-white text-sm font-bold">
                          Past
                        </span>
                      )}
                    </div>

                    {/* Date and Time */}
                    <div className="mt-12 space-y-3 mb-4">
                      {(event.data.start_time || event.data.end_time) && (
                        <div className="flex items-center gap-2 text-wca-secondary">
                          <Calendar className="w-5 h-5" />
                          <span className="text-base font-medium">
                            {formatDateRange(event)}
                          </span>
                        </div>
                      )}

                      {(event.data.start_time || event.data.end_time) && (
                        <div className="flex items-center gap-2 text-wca-secondary">
                          <Clock className="w-5 h-5" />
                          <span className="text-base font-medium">
                            {formatTimeRange(event)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Event Title */}
                    {event.data.tiltle && (
                      <h3 className="text-2xl md:text-3xl font-bold text-wca-secondary mb-4">
                        <PrismicRichText field={event.data.tiltle} />
                      </h3>
                    )}

                    {/* Event Details */}
                    {event.data.details && (
                      <p className="text-base text-wca-gray mb-4 line-clamp-3">
                        {getRichTextAsString(event.data.details)}
                      </p>
                    )}

                    {/* Location */}
                    {event.data.location && (
                      <div className="flex items-start gap-2 text-wca-secondary mb-6">
                        <MapPin className="w-5 h-5 mt-0.5" />
                        <div className="text-base font-medium">
                          <PrismicRichText field={event.data.location} />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-end gap-4 mt-auto">
                      {upcoming && (
                        <button className="flex items-center gap-2 px-6 py-3 text-[#177402] font-medium rounded hover:scale-105 transition-all">
                          Register
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                      <Link
                        href={`/events/${event.uid}`}
                        className="flex items-center gap-2 px-6 py-3  text-[#177402] font-medium rounded hover:scale-105 transition-all"
                      >
                        Find Out More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Section - Image */}
                  <div className="relative h-full min-h-[300px] lg:min-h-[400px]">
                    {event.data.feature_image?.url ? (
                      <div className="relative w-full h-full">
                        <PrismicNextImage
                          field={event.data.feature_image}
                          className="w-full h-full object-cover"
                          width={600}
                          height={400}
                        />
                        {/* Map Pin Overlay */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                            <MapPin className="w-5 h-5 text-[#177402]" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center relative">
                        <svg
                          className="w-16 h-16 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {/* Map Pin Overlay */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                            <MapPin className="w-5 h-5 text-[#177402]" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No events found.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-4 items-center">
              {/* Previous Button */}
              <button
                onClick={prevPage}
                disabled={!canGoPrev}
                className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${
                  canGoPrev
                    ? "hover:bg-gray-50 text-gray-700"
                    : "text-gray-300 cursor-not-allowed"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextPage}
                disabled={!canGoNext}
                className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${
                  canGoNext
                    ? "hover:bg-gray-50 text-gray-700"
                    : "text-gray-300 cursor-not-allowed"
                }`}
                aria-label="Next page"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentPage === index ? "bg-black" : "bg-[#f5f5dc]"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </Bounded>
    </section>
  );
};

export default EventsListClient;
