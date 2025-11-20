import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import Image from "next/image";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/bounded";
import ProgramsListClient from "@/components/programs/programs-list-client";
import type { ProgramsAndEventDocument } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ uid: string }>;
};

export default async function ProgramDetailPage({ params }: Props) {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("programs_and_event", uid)
    .catch(() => notFound());

  // Get all programs for the list (excluding current program)
  const allPrograms = await client.getAllByType("programs_and_event");
  const otherPrograms = allPrograms.filter((p) => p.uid !== uid) as ProgramsAndEventDocument[];

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

  const programTitle = asText(page.data.program_title) || "Program";
  const category = page.data.category || "Event and Campaigns";

  // Filter out slices that don't have components registered
  const availableSliceTypes = Object.keys(components);
  const allSlices = page.data.slices || [];
  
  // Normalize slice types to lowercase to match component keys
  const filteredSlices = allSlices
    .filter((slice: any) => {
      if (!slice?.slice_type) return false;
      const normalizedType = slice.slice_type.toLowerCase();
      return availableSliceTypes.some(type => type.toLowerCase() === normalizedType);
    })
    .map((slice: any) => ({
      ...slice,
      slice_type: slice.slice_type.toLowerCase(),
    }));

  return (
    <div className="bg-white">
      {/* Header Background */}
      <div className="mb-10">
        <div className="text68 text-wca-secondary text-center pt-10">
          {programTitle}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2 font-medium">
          <Link href={"/"}>Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={"/programs"}>Programs & Events</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={"#"} className="text-[#177402] underline">
            {programTitle}
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
              <div className="flex-1">
                <Image
                  src="/images/pngs/divider.png"
                  height={20}
                  width={100}
                  alt="divider"
                />
                
                {/* Category Badge */}
                {/* <div className="mt-4 mb-4">
                  <span className="inline-block px-4 py-2 bg-[#177402] text-white text-sm font-medium rounded">
                    {category}
                  </span>
                </div> */}

                {/* Program Title */}
                {page.data.program_title && (
                  <div className="mb-6 mt-4">
                    <h1 className="text-3xl md:text-4xl font-serif text-wca-secondary">
                      <PrismicRichText field={page.data.program_title} />
                    </h1>
                  </div>
                )}

                {/* Date */}
                {/* {page.data.date && (
                  <div className="flex items-center gap-3 mb-6 text-wca-secondary">
                    <Calendar className="w-5 h-5" />
                    <span className="text-base font-medium">
                      {formatDate(page.data.date)}
                    </span>
                  </div>
                )} */}

                {/* Description */}
                {page.data.description && (
                  <div className="text-wca-gray text-base leading-relaxed">
                    <PrismicRichText field={page.data.description} />
                  </div>
                )}
              </div>

              {/* Right Section - Image */}
              <div className="flex flex-1 w-full items-center justify-center">
                {page.data.image?.url ? (
                  <PrismicNextImage
                    field={page.data.image}
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
                    {/* Program Title as fallback */}
                    {page.data.program_title && (
                      <div className="text-center p-5">
                        <div className="text-green-600 font-bold text-lg md:text-xl uppercase tracking-wide">
                          <PrismicRichText field={page.data.program_title} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Bounded>
        </div>
      </div>

      {/* Render Slices */}
      {filteredSlices.length > 0 && (
        <SliceZone slices={filteredSlices} components={components} />
      )}

      {/* Related Programs List */}
      {otherPrograms.length > 0 && (
        <ProgramsListClient programs={otherPrograms} showFilters={false} itemsPerView={2} />
      )}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("programs_and_event", uid)
    .catch(() => notFound());

  const programTitle = asText(page.data.program_title) || "Program Detail";
  const category = page.data.category || "";
  const description = asText(page.data.description) || "";

  return {
    title: `${programTitle} - Programs & Events`,
    description: description || `Details about ${programTitle}`,
    openGraph: {
      title: `${programTitle} - Programs & Events`,
      description: description || `Details about ${programTitle}`,
      images: page.data.image?.url
        ? [{ url: asImageSrc(page.data.image) ?? "" }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("programs_and_event");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}



