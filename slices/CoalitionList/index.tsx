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
import PartnersClientWrapper from "@/components/partners/partners-client-wrapper";

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

  // Helper function to extract text from Prismic RichText field
  const getRichTextAsString = (field: any): string => {
    if (!field || !Array.isArray(field)) return "";
    return field
      .map((item: any) => item?.text || "")
      .join(" ")
      .trim();
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white pb-10"
      id="coalition-list"
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
        <PartnersClientWrapper />
      </Bounded>
    </section>
  );
};

export default CoalitionList;
