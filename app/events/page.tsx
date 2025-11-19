import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import EventsListClient from "@/components/events/events-list-client";
import type { EventsDetailsDocument } from "@/prismicio-types";

export default async function EventsPage() {
  const client = createClient();
  
  // Get the single page document for header/slices
  const page = await client.getSingle("events").catch(() => notFound());
  
  // Get all events
  const events = await client.getAllByType("events_details");

  // Filter out slices that don't have components registered
  const availableSliceTypes = Object.keys(components);
  const allSlices = page.data.slices || [];
  const filteredSlices = allSlices.filter((slice: any) =>
    availableSliceTypes.includes(slice.slice_type)
  );

  return (
    <>
      <SliceZone slices={filteredSlices} components={components} />
      <EventsListClient events={events as EventsDetailsDocument[]} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("events").catch(() => notFound());

  return {
    title: page.data.meta_title || "Events",
    description: page.data.meta_description || "Browse our upcoming and past events",
    openGraph: {
      title: page.data.meta_title || "Events",
      description: page.data.meta_description || "Browse our upcoming and past events",
      images: page.data.meta_image?.url
        ? [{ url: asImageSrc(page.data.meta_image) ?? "" }]
        : [],
    },
  };
}

