import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import NewsListClient from "@/components/news/news-list-client";
import type { NewsAndStoriesDetailsDocument } from "@/prismicio-types";

export default async function NewsPage() {
  const client = createClient();
  
  // Get the single page document for header/slices
  const page = await client.getSingle("news_and_stories").catch(() => notFound());
  
  // Get all news and stories
  const newsItems = await client.getAllByType("news_and_stories_details");

  // Filter out slices that don't have components registered
  const availableSliceTypes = Object.keys(components);
  const allSlices = page.data.slices || [];
  const filteredSlices = allSlices.filter((slice: any) =>
    availableSliceTypes.includes(slice.slice_type)
  );

  return (
    <>
      <SliceZone slices={filteredSlices} components={components} />
      <NewsListClient newsItems={newsItems as NewsAndStoriesDetailsDocument[]} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("news_and_stories").catch(() => notFound());

  return {
    title: page.data.meta_title || "News & Stories",
    description: page.data.meta_description || "Explore our news and stories",
    openGraph: {
      images: page.data.meta_image?.url
        ? [{ url: asImageSrc(page.data.meta_image) ?? "" }]
        : [],
    },
  };
}

