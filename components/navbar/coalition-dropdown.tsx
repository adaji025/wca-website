"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import type { CoalitionDetailDocument } from "@/prismicio-types";
import CoalitionDropdownContent from "./coalition-dropdown-content";

const CoalitionDropdown = () => {
  const [coalition, setCoalition] = useState<CoalitionDetailDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoalition = async () => {
      try {
        const client = createClient();
        // Get all coalition details and sort by first publication date (newest first), then take the first one
        const allCoalitions = await client.getAllByType("coalition_detail");
        const sortedCoalitions = [...allCoalitions].sort((a, b) => {
          const dateA = a.first_publication_date ? new Date(a.first_publication_date).getTime() : 0;
          const dateB = b.first_publication_date ? new Date(b.first_publication_date).getTime() : 0;
          return dateB - dateA; // Newest first
        });
        const lastCoalition = sortedCoalitions[0] as CoalitionDetailDocument | null;
        setCoalition(lastCoalition || null);
      } catch (error) {
        console.error("Error fetching coalition:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoalition();
  }, []);

  return <CoalitionDropdownContent coalition={coalition} isLoading={isLoading} />;
};

export default CoalitionDropdown;
