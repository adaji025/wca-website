import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function CoalitionPage() {
  const client = createClient();
  const page = await client.getSingle("coalision").catch(() => notFound());

  // Filter out slices that don't have components registered
  const availableSliceTypes = Object.keys(components);
  const allSlices = page.data.slices || [];
  const filteredSlices = allSlices.filter((slice: any) =>
    availableSliceTypes.includes(slice.slice_type)
  );

  return <SliceZone slices={filteredSlices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("coalision").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

