"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import type { ProgramsAndEventDocument } from "@/prismicio-types";
import ProgramsDropdownContent from "./programs-dropdown-content";

const ProgramsDropdown = () => {
  const [programs, setPrograms] = useState<ProgramsAndEventDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const client = createClient();
        // Get all programs and sort by date (newest first), then take the first 4
        const allPrograms = await client.getAllByType("programs_and_event");
        const sortedPrograms = [...allPrograms].sort((a, b) => {
          const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
          const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
          return dateB - dateA; // Newest first
        });
        const displayPrograms = sortedPrograms.slice(0, 4) as ProgramsAndEventDocument[];
        setPrograms(displayPrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (isLoading) {
    // Show a loading state or the fallback content
    return <ProgramsDropdownContent programs={[]} />;
  }

  return <ProgramsDropdownContent programs={programs} />;
};

export default ProgramsDropdown;
