"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import type { ProgramsAndEventDocument, EventsDetailsDocument } from "@/prismicio-types";

// Helper function to extract text from Prismic RichText field
const getRichTextAsString = (field: any): string => {
  if (!field || !Array.isArray(field)) return "";
  return field
    .map((item: any) => item?.text || "")
    .join(" ")
    .trim();
};

interface ProgramOrEvent {
  id: string;
  title: string;
  href: string;
  type: "program" | "event";
}

export const useProgramsAndEvents = () => {
  const [items, setItems] = useState<ProgramOrEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = createClient();
        
        // Fetch programs and events
        const [allPrograms, allEvents] = await Promise.all([
          client.getAllByType("programs_and_event"),
          client.getAllByType("events_details"),
        ]);

        // Combine and normalize data
        const combined: Array<{
          title: string;
          href: string;
          date: number;
          type: "program" | "event";
        }> = [];

        // Add programs
        allPrograms.forEach((program) => {
          const date = program.data.date ? new Date(program.data.date).getTime() : 0;
          const title = getRichTextAsString(program.data.program_title) || "Program";
          combined.push({
            title,
            href: `/programs/${program.uid}`,
            date,
            type: "program",
          });
        });

        // Add events
        allEvents.forEach((event) => {
          const date = event.data.start_time
            ? new Date(event.data.start_time).getTime()
            : 0;
          const title = getRichTextAsString(event.data.tiltle) || "Event";
          combined.push({
            title,
            href: `/events/${event.uid}`,
            date,
            type: "event",
          });
        });

        // Sort by date (newest first) and take the first 4
        const sorted = combined.sort((a, b) => b.date - a.date);
        const last4 = sorted.slice(0, 4);

        // Format for dropdown items
        const formattedItems: ProgramOrEvent[] = last4.map((item, index) => ({
          id: `${item.type}-${index}`,
          title: item.title,
          href: item.href,
          type: item.type,
        }));

        setItems(formattedItems);
      } catch (error) {
        console.error("Error fetching programs and events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { items, isLoading };
};

