import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/**
 * Props for `HomePageHero`.
 */
export type HomePageHeroProps = SliceComponentProps<Content.HomePageHeroSlice>;

/**
 * Component for "HomePageHero" Slices.
 */
const HomePageHero: FC<HomePageHeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-5"
    >
      {/* <Bounded> */}
      <div className="app-width">
        <div className="flex flex-col lg:flex-row">
          <div className="">
            <div>
              <div className="w-20 h-2.5 bg-wca-primary" />
              <span className="text-[26px] font-medium font-sans">
                {slice.primary.theme}
              </span>
            </div>

            <div className="font-bold text-[64px] text-wca-secondary font-serif">
              <PrismicRichText field={slice.primary.hero_text} />
            </div>
            <div className="flex">
              <PrismicNextLink field={slice.primary.primary_button} />
              <PrismicNextLink field={slice.primary.secondary_burron} />
              <PrismicNextLink field={slice.primary.tertiary_button} />
            </div>
          </div>
          <PrismicNextImage field={slice.primary.hero_image} className="w-full" />
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-20">
          <PrismicNextImage field={slice.primary.sub_image_1} className="w-full" />
          <PrismicNextImage field={slice.primary.sub_image_2} className="w-full" />
          <div className="bg-[#F7F7F7] flex">
            <div className="flex flex-col justify-between">
              <div className="text-[26px] pt-3 px-5">Latest</div>
              <Image
                src="/images/svgs/latest-divider.svg"
                height={2}
                width={400}
                className="w-full"
                alt="divider"
              />
              <div className="p-5">
                <div>
                  <div className="bg-[#FEFF03] w-fit py-2 px-3 font-bold mb-2">
                    Event & Campaign
                  </div>
                  <PrismicRichText field={slice.primary.even_and_campaign} />
                </div>
                <div className="mt-5">
                  <div className="bg-[#FEFF03] w-fit py-2 px-3 font-bold mb-2">
                    Policy & Advocacy
                  </div>
                  <PrismicRichText field={slice.primary.policy_advocay} />
                </div>
              </div>
              <div className="flex justify-end p-5">
                <button className="flex items-center gap-2 font-medium text-[#177402]">
                  See All <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Bounded> */}
    </section>
  );
};

export default HomePageHero;
