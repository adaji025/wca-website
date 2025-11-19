import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { asImageSrc, asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import Image from "next/image";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/bounded";
import EventsListClient from "@/components/events/events-list-client";
import SharePost from "@/components/news/share-post";
import type { EventsDetailsDocument } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { ChevronRight, Calendar, Clock, MapPin, User } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ uid: string }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("events_details", uid)
    .catch(() => notFound());

  // Get all events for the list (excluding current event)
  const allEvents = await client.getAllByType("events_details");
  const otherEvents = allEvents.filter(
    (e) => e.uid !== uid
  ) as EventsDetailsDocument[];

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

  // Format time
  const formatTime = (timestamp: string | null | undefined) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format date range
  const formatDateRange = () => {
    const startTime = page.data.start_time;
    const endTime = page.data.end_time;
    
    if (!startTime && !endTime) return "";
    
    // Extract date portion from timestamps
    const startDate = startTime ? new Date(startTime).toISOString().split('T')[0] : null;
    const endDate = endTime ? new Date(endTime).toISOString().split('T')[0] : null;
    
    if (!endTime || startDate === endDate) {
      return formatDate(startTime);
    }
    
    const start = formatDate(startTime);
    const end = formatDate(endTime);
    return `${start} - ${end}`;
  };

  const eventTitle = asText(page.data.tiltle) || "Event";
  const eventDescription = asText(page.data.details) || "";
  
  // Construct the full URL for sharing
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const shareUrl = `${protocol}://${host}/events/${uid}`;

  return (
    <div className="bg-white">
      {/* Header Background */}
      <div className="mb-10">
        <div className="text68 text-wca-secondary text-center pt-10">
          {eventTitle}
        </div>
        <div className="flex justify-center items-center gap-2 font-medium">
          <Link href={"/"}>Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={"/events"}>Events</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={"#"} className="text-[#177402] underline">
            {eventTitle}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-12 mb-10">
        <div className="overflow-hidden">
          <Image
            src="/images/pngs/header-bg.png"
            height={138}
            width={1000}
            alt="wca header image"
            className="w-full"
          />
          <Bounded>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
              {/* Left Section - Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Event Title */}
                  {page.data.tiltle && (
                    <div className="mb-6 mt-4 capitalize">
                      <h1 className="text38 md:text-4xl font-serif text-wca-secondary">
                        <PrismicRichText field={page.data.tiltle} />
                      </h1>
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="space-y-4 mb-6">
                    {/* Date Range */}
                    {(page.data.start_time || page.data.end_time) && (
                      <div className="flex items-center gap-3 text-wca-secondary">
                        <Calendar className="w-5 h-5" />
                        <span className="text-base font-medium">
                          {formatDateRange()}
                        </span>
                      </div>
                    )}

                    {/* Time Range */}
                    {(page.data.start_time || page.data.end_time) && (
                      <div className="flex items-center gap-3 text-wca-secondary">
                        <Clock className="w-5 h-5" />
                        <span className="text-base font-medium">
                          {page.data.start_time && formatTime(page.data.start_time)}
                          {page.data.start_time && page.data.end_time && " - "}
                          {page.data.end_time && formatTime(page.data.end_time)}
                        </span>
                      </div>
                    )}

                    {/* Location */}
                    {page.data.location && (
                      <div className="flex items-start gap-3 text-wca-secondary">
                        <MapPin className="w-5 h-5 mt-0.5" />
                        <div className="text-base font-medium">
                          <PrismicRichText field={page.data.location} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <SharePost 
                  url={shareUrl}
                  title={eventTitle}
                  description={eventDescription}
                />
              </div>

              {/* Right Section - Image */}
              <div className="flex flex-1 w-full items-center justify-center">
                {page.data.feature_image?.url ? (
                  <PrismicNextImage
                    field={page.data.feature_image}
                    className="w-full h-full object-cover lg:-translate-y-16"
                  />
                ) : (
                  <div className="flex bg-gray-200 flex-col min-h-[400px] w-full items-center justify-center rounded-lg lg:-translate-y-16">
                    {/* Fallback - Green Circle with Peace Symbol */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                        <svg
                          className="w-14 h-14 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          {/* Peace Symbol: Circle with vertical line and two downward lines */}
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="3" x2="12" y2="12" />
                          <line x1="7" y1="17" x2="12" y2="12" />
                          <line x1="17" y1="17" x2="12" y2="12" />
                        </svg>
                      </div>
                    </div>
                    {/* Event Title as fallback */}
                    {page.data.tiltle && (
                      <div className="text-center p-5">
                        <div className="text-green-600 font-bold text-lg md:text-xl uppercase tracking-wide">
                          <PrismicRichText field={page.data.tiltle} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Event Details */}
            {page.data.details && (
              <div className="text-wca-gray text-base leading-relaxed mt-10">
                <PrismicRichText field={page.data.details} />
              </div>
            )}

            {/* Speakers Section */}
            {page.data.speakers && page.data.speakers.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-serif text-wca-secondary mb-8">
                  Speakers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {page.data.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg"
                    >
                      {speaker.image?.url ? (
                        <PrismicNextImage
                          field={speaker.image}
                          className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-4">
                          <User className="w-12 h-12 text-white" />
                        </div>
                      )}
                      {speaker.name && (
                        <div className="font-bold text-wca-secondary mb-2">
                          <PrismicRichText field={speaker.name} />
                        </div>
                      )}
                      {speaker.title && (
                        <div className="text-sm text-wca-gray">
                          <PrismicRichText field={speaker.title} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Bounded>
        </div>
      </div>

      {/* Related Events List */}
      {otherEvents.length > 0 && (
        <EventsListClient events={otherEvents} showFilters={false} />
      )}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("events_details", uid)
    .catch(() => notFound());

  const eventTitle = asText(page.data.tiltle) || "Event Detail";
  const description = asText(page.data.details) || "";

  return {
    title: `${eventTitle} - Events`,
    description: description || `Details about ${eventTitle}`,
    openGraph: {
      title: `${eventTitle} - Events`,
      description: description || `Details about ${eventTitle}`,
      images: page.data.feature_image?.url
        ? [{ url: asImageSrc(page.data.feature_image) ?? "" }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("events_details");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}

