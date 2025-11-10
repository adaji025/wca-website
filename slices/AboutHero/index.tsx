import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/bounded";
import { ChevronRight, Eye, FileText, Lightbulb } from "lucide-react";
import Image from "next/image";
import MissionVisionCard from "@/components/mission-vission-card";
import { PrismicNextImage } from "@prismicio/next";
import {
  EyeIcon,
  MandateIcon,
  PhilosophyIcon,
  TargetIcon,
} from "@/components/svg";
// import MissionVisionCard from "@/components/mission-vission-card/mission-vision-card";

/**
 * Props for `AboutHero`.
 */
export type AboutHeroProps = SliceComponentProps<Content.AboutHeroSlice>;

/**
 * Component for "AboutHero" Slices.
 */
const AboutHero: FC<AboutHeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-20"
    >
      <Bounded>
        <div className="text68 text-wca-secondary text-center">
          <PrismicRichText field={slice.primary.page_header} />
        </div>
        <div className="flex justify-center items-center gap-2 font-medium">
          <div>Home</div>
          <ChevronRight className="w-4 h-4" />
          <div className="text-[#177402] underline">About Us</div>
        </div>
      </Bounded>
      <div className="my-10">
        <Image
          src="/images/pngs/header-bg.png"
          height={138}
          width={1000}
          alt="wca header image"
          className="w-full"
        />
      </div>
      <Bounded>
        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="lg:max-w-[400px] w-full">
            <Image
              src="/images/svgs/latest-divider.svg"
              height={20}
              width={100}
              alt="divider"
            />
            <div className="text-wca-primary text26">
              <PrismicRichText field={slice.primary.sub_title} />
            </div>
            <div className="text38 mt-2 text-wca-primary">
              <PrismicRichText field={slice.primary.title} />
            </div>
            <div className="mt-3 text-wca-gray text-justify">
              <PrismicRichText field={slice.primary.text} />
            </div>
          </div>
          {/* Mission, Vision, Mandate, Philosophy Cards */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 lg:-translate-y-20">
            {slice.primary.mission && (
              <MissionVisionCard
                title="Our Mission"
                content={slice.primary.mission}
                icon={<TargetIcon />}
              />
            )}
            {slice.primary.vission && (
              <MissionVisionCard
                title="Our Vision"
                content={slice.primary.vission}
                icon={<EyeIcon />}
              />
            )}
            {slice.primary.mandate && (
              <MissionVisionCard
                title="Our Mandate"
                content={slice.primary.mandate}
                icon={<MandateIcon />}
              />
            )}
            {slice.primary.philosophy && (
              <MissionVisionCard
                title="Our Philosophy"
                content={slice.primary.philosophy}
                icon={<PhilosophyIcon />}
              />
            )}
          </div>
        </div>
        <div className="lg:mt-[unset] my-10">
          <div className="text38 text-wca-secondary">
            <PrismicRichText field={slice.primary.text_2_title} />
          </div>
          <div className="text-wca-gray">
            <PrismicRichText field={slice.primary.text_2} />
          </div>
        </div>
      </Bounded>
      <div className="grid px-5 lg:px-[unset] lg:grid-cols-3 md:grid-cols-2  gap-5">
        <PrismicNextImage field={slice.primary.image3} className="w-full" />
        <PrismicNextImage field={slice.primary.image2} className="w-full" />
        <PrismicNextImage field={slice.primary.image3} className="w-full" />
      </div>
    </section>
  );
};

export default AboutHero;
