import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { asImageSrc, asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import Image from "next/image";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/bounded";
import NewsListClient from "@/components/news/news-list-client";
import SharePost from "@/components/news/share-post";
import type { NewsAndStoriesDetailsDocument } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ uid: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("news_and_stories_details", uid)
    .catch(() => notFound());

  // Get all news items for the list (excluding current news)
  const allNewsItems = await client.getAllByType("news_and_stories_details");
  const otherNewsItems = allNewsItems.filter(
    (n) => n.uid !== uid
  ) as NewsAndStoriesDetailsDocument[];

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

  const newsTitle = asText(page.data.title) || "News";
  const category = page.data.categories || "Events and Campaigns";
  const newsDescription = asText(page.data.description) || "";
  
  // Construct the full URL for sharing
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const shareUrl = `${protocol}://${host}/news/${uid}`;

  return (
    <div className="bg-white">
      {/* Header Background */}
      <div className="mb-10">
        <div className="text68 text-wca-secondary text-center pt-10">
          {newsTitle}
        </div>
        <div className="flex justify-center items-center gap-2 font-medium">
          <Link href={"/"}>Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={"/news"}>News & Stories</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={"#"} className="text-[#177402] underline">
            {newsTitle}
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
                  {page.data.categories && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-[#FEFF03] text-xs font-bold">
                        {page.data.categories}
                      </span>
                    </div>
                  )}

                  {/* News Title */}
                  {page.data.title && (
                    <div className="mb-6 mt-4 capitalize">
                      <h1 className="text38 md:text-4xl font-serif text-wca-secondary">
                        <PrismicRichText field={page.data.title} />
                      </h1>
                    </div>
                  )}

                  {/* Date */}
                  {page.data.date && (
                    <div className="flex items-center gap-3 mb-6 text-wca-secondary">
                      <Calendar className="w-5 h-5" />
                      <span className="text-base font-medium">
                        {formatDate(page.data.date)}
                      </span>
                    </div>
                  )}
                </div>
                <SharePost 
                  url={shareUrl}
                  title={newsTitle}
                  description={newsDescription}
                />
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
                    {/* News Title as fallback */}
                    {page.data.title && (
                      <div className="text-center p-5">
                        <div className="text-green-600 font-bold text-lg md:text-xl uppercase tracking-wide">
                          <PrismicRichText field={page.data.title} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {page.data.description && (
              <div className="text-wca-gray text-base leading-relaxed mt-10">
                <PrismicRichText field={page.data.description} />
              </div>
            )}
          </Bounded>
        </div>
      </div>

      {/* Related News List */}
      {otherNewsItems.length > 0 && (
        <NewsListClient newsItems={otherNewsItems} showFilters={false} />
      )}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("news_and_stories_details", uid)
    .catch(() => notFound());

  const newsTitle = asText(page.data.title) || "News Detail";
  const description = asText(page.data.description) || "";

  return {
    title: `${newsTitle} - News & Stories`,
    description: description || `Details about ${newsTitle}`,
    openGraph: {
      title: `${newsTitle} - News & Stories`,
      description: description || `Details about ${newsTitle}`,
      images: page.data.image?.url
        ? [{ url: asImageSrc(page.data.image) ?? "" }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("news_and_stories_details");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
