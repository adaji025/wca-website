"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import type { CoalitionDetailDocument } from "@/prismicio-types";

// Helper function to extract text from Prismic RichText field
const getRichTextAsString = (field: any): string => {
  if (!field || !Array.isArray(field)) return "";
  return field
    .map((item: any) => item?.text || "")
    .join(" ")
    .trim();
};

interface CoalitionItem {
  id: string;
  title: string;
  href: string;
}

export const useCoalition = () => {
  const [item, setItem] = useState<CoalitionItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = createClient();
        
        // Get all coalition details and sort by first publication date (newest first), then take the first one
        const allCoalitions = await client.getAllByType("coalition_detail");
        const sortedCoalitions = [...allCoalitions].sort((a, b) => {
          const dateA = a.first_publication_date ? new Date(a.first_publication_date).getTime() : 0;
          const dateB = b.first_publication_date ? new Date(b.first_publication_date).getTime() : 0;
          return dateB - dateA; // Newest first
        });
        
        const lastCoalition = sortedCoalitions[0];
        
        if (lastCoalition) {
          const title = getRichTextAsString(lastCoalition.data.country_name) || "Coalition Member";
          setItem({
            id: lastCoalition.uid,
            title,
            href: `/coalition/${lastCoalition.uid}`,
          });
        }
      } catch (error) {
        console.error("Error fetching coalition:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { item, isLoading };
};

