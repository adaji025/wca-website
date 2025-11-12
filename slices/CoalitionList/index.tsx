"use client";

import { FC, useState, useMemo } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { ChevronDown, ArrowRight } from "lucide-react";
import Bounded from "@/components/bounded";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

/**
 * Props for `CoalitionList`.
 */
export type CoalitionListProps =
  SliceComponentProps<Content.CoalitionListSlice>;

type Region =
  | "all"
  | "north_africa"
  | "east_africa"
  | "west_africa"
  | "central_africa"
  | "south_africa";
type SortOption =
  | "default"
  | "name_asc"
  | "name_desc"
  | "partners_asc"
  | "partners_desc";

interface CountryItem {
  image: any;
  country_name: any;
  partners: number | null;
  see_all: any;
  region: Region;
}

/**
 * Component for "CoalitionList" Slices.
 */
const CoalitionList: FC<CoalitionListProps> = ({ slice }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Combine all regions into a single array with region metadata
  const allCountries: CountryItem[] = useMemo(() => {
    const countries: CountryItem[] = [];

    // North Africa
    (slice.primary.north_africa || []).forEach((item) => {
      countries.push({
        ...item,
        region: "north_africa" as Region,
      });
    });

    // East Africa (note: field name is "east_africat" in Prismic, but we'll use "east_africa" for display)
    (slice.primary.east_africat || []).forEach((item) => {
      countries.push({
        ...item,
        region: "east_africa" as Region,
      });
    });

    // West Africa
    (slice.primary.west_africa || []).forEach((item) => {
      countries.push({
        ...item,
        region: "west_africa" as Region,
      });
    });

    // Central Africa
    (slice.primary.central_africa || []).forEach((item) => {
      countries.push({
        ...item,
        region: "central_africa" as Region,
      });
    });

    // South Africa
    (slice.primary.south_africa || []).forEach((item) => {
      countries.push({
        ...item,
        region: "south_africa" as Region,
      });
    });

    return countries;
  }, [slice.primary]);

  // Helper function to extract text from Prismic RichText field
  const getRichTextAsString = (field: any): string => {
    if (!field || !Array.isArray(field)) return "";
    return field
      .map((item: any) => item?.text || "")
      .join(" ")
      .trim();
  };

  // Filter and sort countries
  const filteredAndSortedCountries = useMemo(() => {
    let filtered = allCountries;

    // Filter by region
    if (selectedRegion !== "all") {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "name_asc":
        sorted.sort((a, b) => {
          const nameA = getRichTextAsString(a.country_name);
          const nameB = getRichTextAsString(b.country_name);
          return nameA.localeCompare(nameB);
        });
        break;
      case "name_desc":
        sorted.sort((a, b) => {
          const nameA = getRichTextAsString(a.country_name);
          const nameB = getRichTextAsString(b.country_name);
          return nameB.localeCompare(nameA);
        });
        break;
      case "partners_asc":
        sorted.sort((a, b) => (a.partners || 0) - (b.partners || 0));
        break;
      case "partners_desc":
        sorted.sort((a, b) => (b.partners || 0) - (a.partners || 0));
        break;
      default:
        // Keep original order
        break;
    }

    return sorted;
  }, [allCountries, selectedRegion, sortBy]);

  const regions = [
    { id: "all" as Region, label: "All" },
    { id: "north_africa" as Region, label: "North Africa" },
    { id: "east_africa" as Region, label: "East Africa" },
    { id: "west_africa" as Region, label: "West Africa" },
    { id: "central_africa" as Region, label: "Central Africa" },
    { id: "south_africa" as Region, label: "South Africa" },
  ];

  const sortOptions = [
    { id: "default" as SortOption, label: "Sort by" },
    { id: "name_asc" as SortOption, label: "Name (A-Z)" },
    { id: "name_desc" as SortOption, label: "Name (Z-A)" },
    { id: "partners_asc" as SortOption, label: "Partners (Low to High)" },
    { id: "partners_desc" as SortOption, label: "Partners (High to Low)" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.id === sortBy)?.label || "Sort by";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white pb-10"
    >
      <Image
        src="/images/pngs/header-bg.png"
        height={138}
        width={1000}
        alt="wca header image"
        className="w-full"
      />
      <Bounded>
        {/* Title */}
        <div className="mt-10 mb-8">
          <h1 className="text68 font-serif text-wca-secondary mb-4">
            Our Coalition
          </h1>
        </div>

        {/* Filter and Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-200">
          {/* Region Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-4 py-2 font-medium transition-colors ${
                  selectedRegion === region.id
                    ? "bg-[#FBE5B6] text-wca-secondary"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-[#F7F7F7] hover:bg-gray-50 font-medium">
              {currentSortLabel}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={sortBy === option.id ? "bg-gray-100" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedCountries.map((country, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg overflow-hidden border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Flag Image */}
              <div className="w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {country.image?.url ? (
                  <PrismicNextImage
                    field={country.image}
                    className="w-full h-[180px] object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
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

              {/* Country Info */}
              <div className="p-4 flex flex-col gap-2">
                {/* Country Name */}
                {country.country_name && (
                  <div className="text26 text-wca-secondary font-sans">
                    <PrismicRichText field={country.country_name} />
                  </div>
                )}

                {/* Partners Count and See All Link */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">
                    {country.partners || 0} Partner
                    {country.partners !== 1 ? "s" : ""}
                  </span>
                  {country.see_all && (
                    <PrismicNextLink
                      field={country.see_all}
                      className="text-[#177402] text-sm font-medium hover:underline flex items-center gap-1"
                    >
                      See All
                      <ArrowRight className="w-3 h-3" />
                    </PrismicNextLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedCountries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">
              No countries found for the selected filter.
            </p>
          </div>
        )}
      </Bounded>
    </section>
  );
};

export default CoalitionList;
