import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import ProgramsListClient from "@/components/programs/programs-list-client";
import type { ProgramsAndEventDocument } from "@/prismicio-types";

export default async function ProgramsPage() {
  const client = createClient();
  
  // Get the single page document for header/slices
  const page = await client.getSingle("programes_and_event").catch(() => notFound());
  
  // Get all programs and events
  const programs = await client.getAllByType("programs_and_event");

  // Filter out slices that don't have components registered
  const availableSliceTypes = Object.keys(components);
  const allSlices = page.data.slices || [];
  const filteredSlices = allSlices.filter((slice: any) =>
    availableSliceTypes.includes(slice.slice_type)
  );

  return (
    <>
      <SliceZone slices={filteredSlices} components={components} />
      <ProgramsListClient programs={programs as ProgramsAndEventDocument[]} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("programes_and_event").catch(() => notFound());

  return {
    title: page.data.meta_title || "Programs & Events",
    description: page.data.meta_description || "Explore our programs and events",
    openGraph: {
      images: page.data.meta_image?.url
        ? [{ url: asImageSrc(page.data.meta_image) ?? "" }]
        : [],
    },
  };
}


