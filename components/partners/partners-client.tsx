"use client";

import React, { useState, useMemo } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { ChevronDown } from "lucide-react";
import type { CoalitionDetailDocument } from "@/prismicio-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ArrowRight } from "../svg";

type Region =
  | "all"
  | "north africa"
  | "east africa"
  | "west africa"
  | "central africa"
  | "south africa";
type SortOption =
  | "default"
  | "name_asc"
  | "name_desc"
  | "partners_asc"
  | "partners_desc";

interface PartnersClientProps {
  countries: CoalitionDetailDocument[];
}

const PartnersClient: React.FC<PartnersClientProps> = ({ countries }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const regions: { id: Region; label: string }[] = [
    { id: "all", label: "All" },
    { id: "north africa", label: "North Africa" },
    { id: "east africa", label: "East Africa" },
    { id: "west africa", label: "West Africa" },
    { id: "central africa", label: "Central Africa" },
    { id: "south africa", label: "South Africa" },
  ];

  // Handle region filter click
  const handleRegionClick = (regionId: Region) => {
    setSelectedRegion(regionId);
  };

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
    // First, filter by region
    let filtered = countries;
    if (selectedRegion !== "all") {
      filtered = countries.filter((country) => {
        const countryRegion = country.data.region;
        if (!countryRegion) return false;

        const normalizedCountryRegion = String(countryRegion)
          .toLowerCase()
          .trim();
        const normalizedSelectedRegion = selectedRegion.toLowerCase().trim();
        return normalizedCountryRegion === normalizedSelectedRegion;
      });
    }

    // Then, sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "name_asc":
        sorted.sort((a, b) => {
          const nameA = getRichTextAsString(a.data.country_name);
          const nameB = getRichTextAsString(b.data.country_name);
          return nameA.localeCompare(nameB);
        });
        break;
      case "name_desc":
        sorted.sort((a, b) => {
          const nameA = getRichTextAsString(a.data.country_name);
          const nameB = getRichTextAsString(b.data.country_name);
          return nameB.localeCompare(nameA);
        });
        break;
      case "partners_asc":
        sorted.sort((a, b) => (a.data.partners || 0) - (b.data.partners || 0));
        break;
      case "partners_desc":
        sorted.sort((a, b) => (b.data.partners || 0) - (a.data.partners || 0));
        break;
      default:
        // Keep original order
        break;
    }

    return sorted;
  }, [countries, selectedRegion, sortBy]);

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
    <>
      {/* Filter and Sort Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-200">
        {/* Region Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleRegionClick(region.id);
              }}
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
          <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-[#F7F7F7] hover:bg-gray-50 font-medium rounded">
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
        {filteredAndSortedCountries.map((country) => (
          <div
            key={country.uid}
            className="flex flex-col hover:scale-105 transition-all duration-300 bg-white rounded-lg overflow-hidden"
          >
            {/* Country Flag */}
            <div className="w-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {country.data.country_flag?.url ? (
                <PrismicNextImage
                  field={country.data.country_flag}
                  className="w-full h-[180px] object-cover"
                />
              ) : (
                <div className="w-full h-[180px] bg-gray-300 flex items-center justify-center">
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
            <div className="mt-4 flex flex-col gap-2">
              {/* Country Name */}
              {country.data.country_name && (
                <div className="text-lg font-semibold text-wca-secondary">
                  <PrismicRichText field={country.data.country_name} />
                </div>
              )}

              {/* Partners Count */}
              <div className="flex gap-4 items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span>{country.data.partners || 0} </span>
                  <span className="font-medium">Partners</span>
                </div>
                {country.uid && (
                  <Link
                    href={`/coalition/${country.uid}`}
                    className="text-[#177402] flex gap-2 items-center"
                  >
                    <span>See all</span>
                    <ArrowRight />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedCountries.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No countries found for the selected region.</p>
        </div>
      )}
    </>
  );
};

export default PartnersClient;
