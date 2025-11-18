"use client";

import Image from "next/image";
import CustomDropdown from "./custom-dropdown";
import { ArrowRight } from "../svg";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import type { CoalitionDetailDocument } from "@/prismicio-types";

interface CoalitionDropdownContentProps {
  coalition: CoalitionDetailDocument | null;
  isLoading: boolean;
}

// Helper function to extract text from Prismic RichText field
const getRichTextAsString = (field: any): string => {
  if (!field || !Array.isArray(field)) return "";
  return field
    .map((item: any) => item?.text || "")
    .join(" ")
    .trim();
};

const CoalitionDropdownContent = ({
  coalition,
  isLoading,
}: CoalitionDropdownContentProps) => {
  return (
    <CustomDropdown trigger="Coalition">
      <div className="flex py-4">
        <div className="flex gap-4 items-center">
          {coalition?.data.country_flag?.url ? (
            <PrismicNextImage
              field={coalition.data.country_flag}
              height={80}
              width={160}
              className="object-cover"
            />
          ) : (
            <Image
              src={"/images/pngs/placeholder-image.png"}
              height={80}
              width={160}
              alt="Coalition"
            />
          )}
          <div>
            <div className="text-sm text-gray-700">
              {coalition?.data.partners_list?.[0]?.description
                ? (() => {
                    const descriptionText = getRichTextAsString(
                      coalition.data.partners_list[0].description
                    );
                    const truncatedText =
                      descriptionText.length > 100
                        ? descriptionText.slice(0, 100) + "..."
                        : descriptionText;
                    return truncatedText;
                  })()
                : "WCA is a partnership of like minded organizations accross africa looking to drive positive change in the live of women, children and youth"}
            </div>
            {coalition?.uid ? (
              <Link href={`/coalition/${coalition.uid}`}>
                <div className="flex items-center gap-2 mt-2 text-[#177402] font-medium">
                  <div>Read more</div>
                  <ArrowRight />
                </div>
              </Link>
            ) : (
              <Link href={"/coalition"}>
                <div className="flex items-center gap-2 mt-2 text-[#177402] font-medium">
                  <div>Read more</div>
                  <ArrowRight />
                </div>
              </Link>
            )}
          </div>
        </div>
        <div className="space-y-3 w-1/3">
          <Link href={"/coalition#coalition-list"} className="flex items-center gap-2 mt-2 text-[#177402] font-medium">
            <div>Explore Partnership by Region</div>
            <ArrowRight />
          </Link>
          <Link
            href={"/coalition"}
            className="flex items-center gap-2 mt-2 text-[#177402] font-medium"
          >
            <div>See all Partners</div>
            <ArrowRight />
          </Link>
          <button className="flex items-center gap-2 mt-2 text-[#177402] font-medium">
            <div>Become a Partner</div>
            <ArrowRight />
          </button>
        </div>
      </div>
    </CustomDropdown>
  );
};

export default CoalitionDropdownContent;
