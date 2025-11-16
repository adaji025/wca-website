"use client";

import React, { useState, useMemo } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { ChevronDown, Calendar, ArrowRight } from "lucide-react";
import type { ProgramsAndEventDocument } from "@/prismicio-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import Bounded from "@/components/bounded";

type Category =
  | "all"
  | "Event and Campaigns"
  | "Youth Voices"
  | "Women in Action"
  | "Policy & Advocacy";

type SortOption =
  | "default"
  | "date_desc"
  | "date_asc"
  | "title_asc"
  | "title_desc";

interface ProgramsListClientProps {
  programs: ProgramsAndEventDocument[];
}

const ProgramsListClient: React.FC<ProgramsListClientProps> = ({
  programs,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All Categories" },
    { id: "Event and Campaigns", label: "Event and Campaigns" },
    { id: "Youth Voices", label: "Youth Voices" },
    { id: "Women in Action", label: "Women in Action" },
    { id: "Policy & Advocacy", label: "Policy & Advocacy" },
  ];

  // Helper function to extract text from Prismic RichText field
  const getRichTextAsString = (field: any): string => {
    if (!field || !Array.isArray(field)) return "";
    return field
      .map((item: any) => item?.text || "")
      .join(" ")
      .trim();
  };

  // Format date
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter and sort programs
  const filteredAndSortedPrograms = useMemo(() => {
    // First, filter by category
    let filtered = programs;
    if (selectedCategory !== "all") {
      filtered = programs.filter((program) => {
        const programCategory = program.data.category;
        return programCategory === selectedCategory;
      });
    }

    // Then, sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "title_asc":
        sorted.sort((a, b) => {
          const titleA = getRichTextAsString(a.data.program_title);
          const titleB = getRichTextAsString(b.data.program_title);
          return titleA.localeCompare(titleB);
        });
        break;
      case "title_desc":
        sorted.sort((a, b) => {
          const titleA = getRichTextAsString(a.data.program_title);
          const titleB = getRichTextAsString(b.data.program_title);
          return titleB.localeCompare(titleA);
        });
        break;
      case "date_asc":
        sorted.sort((a, b) => {
          const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
          const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case "date_desc":
        sorted.sort((a, b) => {
          const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
          const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
          return dateB - dateA;
        });
        break;
      default:
        // Default: sort by date (newest first)
        sorted.sort((a, b) => {
          const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
          const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
          return dateB - dateA;
        });
    }

    return sorted;
  }, [programs, selectedCategory, sortBy]);

  return (
    <section className="bg-white pb-10">
      <Image
        src="/images/pngs/header-bg.png"
        height={138}
        width={1000}
        alt="wca header image"
        className="w-full"
      />

      <Bounded>
        {/* Filters and Sort Header */}
        <div className="flex items-center border-b border-gray-300 mt-16 mb-8 overflow-x-auto">
          {/* View All Button */}
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-[#f5f5dc] text-gray-800"
                : "bg-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            View all
          </button>

          {/* Category Filters on White Background */}
          <div className="flex-1 bg-white px-6 py-3 flex items-center gap-8 overflow-x-auto">
            {categories
              .filter((cat) => cat.id !== "all")
              .map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 font-bold text-sm whitespace-nowrap transition-colors rounded ${
                    selectedCategory === category.id
                      ? "bg-[#f5f5dc] text-gray-800"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {category.label}
                </button>
              ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="bg-[#f5f5f5] px-6 py-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 font-bold text-sm text-gray-800 hover:text-gray-600 transition-colors">
                <span>Sort by</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem
                  onClick={() => setSortBy("default")}
                  className={
                    sortBy === "default" ? "bg-gray-100 font-medium" : ""
                  }
                >
                  Date (Newest First)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("date_asc")}
                  className={
                    sortBy === "date_asc" ? "bg-gray-100 font-medium" : ""
                  }
                >
                  Date (Oldest First)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("title_asc")}
                  className={
                    sortBy === "title_asc" ? "bg-gray-100 font-medium" : ""
                  }
                >
                  Title (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("title_desc")}
                  className={
                    sortBy === "title_desc" ? "bg-gray-100 font-medium" : ""
                  }
                >
                  Title (Z-A)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Programs Grid */}
        {filteredAndSortedPrograms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedPrograms.map((program) => (
              <Link
                key={program.uid}
                href={`/programs/${program.uid}`}
                className="flex flex-col"
              >
                {/* Program Image */}
                <div className="w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {program.data.image?.url ? (
                    <PrismicNextImage
                      field={program.data.image}
                      className="w-full h-[200px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-[200px] bg-gray-300 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Program Info */}
                <div className="mt-4 flex flex-col gap-3 flex-1">
                  {/* Category Badge */}
                  {program.data.category && (
                    <div>
                      <span className="inline-block px-3 py-1 bg-[#FEFF03]  text-xs font-bold">
                        {program.data.category}
                      </span>
                    </div>
                  )}

                  {/* Program Title */}
                  {program.data.program_title && (
                    <h3 className="text-lg font-bold text-wca-secondary line-clamp-2">
                      <PrismicRichText field={program.data.program_title} />
                    </h3>
                  )}

                  {/* Description Preview */}
                  {program.data.description && (
                    <p className="text-sm text-wca-gray line-clamp-3">
                      {getRichTextAsString(program.data.description)}
                    </p>
                  )}

                  {/* Read More Link */}
                  <div className="mt-auto flex justify-between pt-2">
                    {/* Date */}
                    {program.data.date && (
                      <div className="flex items-center gap-2 text-sm text-wca-gray">
                        <span>{formatDate(program.data.date)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[#177402] font-medium text-sm hover:gap-3 transition-all">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No programs found matching your filters.</p>
          </div>
        )}
      </Bounded>
    </section>
  );
};

export default ProgramsListClient;
