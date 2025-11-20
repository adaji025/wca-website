import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/**
 * Props for `HomePageAbout`.
 */
export type HomePageAboutProps =
  SliceComponentProps<Content.HomePageAboutSlice>;

/**
 * Component for "HomePageAbout" Slices.
 */
const HomePageAbout: FC<HomePageAboutProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Image
        src="/images/pngs/header-bg.png"
        height={138}
        width={1000}
        alt="wca header image"
        className="w-full"
      />
      <div className="flex flex-col md:flex-row gap-20 app-width items-center">
        <div className="flex-1 mt-10 md:mt-[unset]">
          <Image
            src="/images/pngs/divider.png"
            height={40}
            width={120}
            alt="divider"
          />
          <div className="text-[26px] text-wca-primary mt-2">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="text-wca-secondary font-bold text-[24px] font-serif mb-4 md:text-[32px] lg:text-[38px]">
            <PrismicRichText field={slice.primary.header_text} />
          </div>
          <div className="font-medium leading-6 text-justify">
            <PrismicRichText field={slice.primary.text} />
          </div>
          <button className="flex items-center gap-2 mt-6 text-[#177402] font-medium">
            <PrismicNextLink field={slice.primary.see_more} />
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="md:-translate-10 flex-1">
          <PrismicNextImage field={slice.primary.image} className="w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default HomePageAbout;
