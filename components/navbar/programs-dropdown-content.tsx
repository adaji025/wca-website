"use client";

import Image from "next/image";
import CustomDropdown from "./custom-dropdown";
import { ArrowRight } from "../svg";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import type { ProgramsAndEventDocument, EventsDetailsDocument } from "@/prismicio-types";

type CombinedItem = {
  type: "program" | "event";
  program?: ProgramsAndEventDocument;
  event?: EventsDetailsDocument;
  href: string;
};

interface ProgramsDropdownContentProps {
  items: CombinedItem[];
}

const ProgramsDropdownContent = ({
  items,
}: ProgramsDropdownContentProps) => {
  return (
    <CustomDropdown trigger="Programmes & Impact">
      <div className="grid grid-cols-2 gap-4 py-4">
        {items.length > 0
          ? items.map((item, index) => (
              <Link
                key={item.type === "program" ? item.program?.uid : item.event?.uid || index}
                href={item.href}
                className="flex gap-4 items-center hover:opacity-80 transition-opacity"
              >
                <div className="shrink-0">
                  {item.type === "program" && item.program?.data.image?.url ? (
                    <PrismicNextImage
                      field={item.program.data.image}
                      height={80}
                      width={160}
                      className="object-cover"
                    />
                  ) : item.type === "event" && item.event?.data.feature_image?.url ? (
                    <PrismicNextImage
                      field={item.event.data.feature_image}
                      height={80}
                      width={160}
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={"/images/pngs/placeholder-image.png"}
                      height={80}
                      width={160}
                      alt={item.type === "program" ? "Program" : "Event"}
                    />
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-700 line-clamp-3">
                    {item.type === "program" && item.program?.data.description ? (
                      <PrismicRichText field={item.program.data.description} />
                    ) : item.type === "event" && item.event?.data.details ? (
                      <PrismicRichText field={item.event.data.details} />
                    ) : (
                      "No description available"
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[#177402] font-medium">
                    <div>Read more</div>
                    <ArrowRight />
                  </div>
                </div>
              </Link>
            ))
          : // Fallback if no items are available
            [...Array(4)].map((_, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Image
                  src={"/images/pngs/placeholder-image.png"}
                  height={80}
                  width={160}
                  alt="Coalition"
                />
                <div>
                  <div>
                    WCA is a partnership of like minded organizations accross
                    africa looking to drive positive change in the live of
                    women, children and youth{" "}
                  </div>
                  <button className="flex items-center gap-2 mt-2 text-[#177402] font-medium">
                    <div>Read more</div>
                    <ArrowRight />
                  </button>
                </div>
              </div>
            ))}
      </div>
      <Link
        href={"/programs"}
        className="flex items-center gap-2 mt-2 text-[#177402] font-medium mb-2"
      >
        <div>View all</div> <ArrowRight />
      </Link>
    </CustomDropdown>
  );
};

export default ProgramsDropdownContent;
