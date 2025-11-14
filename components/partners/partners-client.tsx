"use client";

import React, { useState, useMemo } from 'react'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import type { CoalitionDetailDocument } from '@/prismicio-types'

type Region = "all" | "north africa" | "east africa" | "west africa" | "central africa" | "south africa";

interface PartnersClientProps {
  countries: CoalitionDetailDocument[]
}

const PartnersClient: React.FC<PartnersClientProps> = ({ countries }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region>("all");

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

  // Filter countries by selected region
  const filteredCountries = useMemo(() => {
    if (selectedRegion === "all") {
      return countries;
    }
    return countries.filter((country) => {
      // Prismic SelectField returns the value directly as a string
      const countryRegion = country.data.region;
      if (!countryRegion) return false;
      
      // Normalize both values for comparison (lowercase, trim)
      const normalizedCountryRegion = String(countryRegion).toLowerCase().trim();
      const normalizedSelectedRegion = selectedRegion.toLowerCase().trim();
      return normalizedCountryRegion === normalizedSelectedRegion;
    });
  }, [countries, selectedRegion]);

  return (
    <>
      {/* Region Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
        {regions.map((region) => (
          <button
            key={region.id}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleRegionClick(region.id);
            }}
            className={`px-4 py-2 font-medium transition-colors rounded ${
              selectedRegion === region.id
                ? "bg-[#FBE5B6] text-wca-secondary"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {region.label}
          </button>
        ))}
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <div
            key={country.uid}
            className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
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
            <div className="p-4 flex flex-col gap-2">
              {/* Country Name */}
              {country.data.country_name && (
                <div className="text-lg font-semibold text-wca-secondary">
                  <PrismicRichText field={country.data.country_name} />
                </div>
              )}

              {/* Partners Count */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">Partners: </span>
                <span>{country.data.partners || 0}</span>
              </div>

              {/* Region */}
              {country.data.region && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Region: </span>
                  <span className="capitalize">{country.data.region}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCountries.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No countries found for the selected region.</p>
        </div>
      )}
    </>
  )
}

export default PartnersClient

