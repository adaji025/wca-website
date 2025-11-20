"use client";
import { FC, useEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ShareIcon } from "@/components/svg";
import AOS from "aos";

/**
 * Props for `HomePageHero`.
 */
export type HomePageHeroProps = SliceComponentProps<Content.HomePageHeroSlice>;

/**
 * Component for "HomePageHero" Slices.
 */
const HomePageHero: FC<HomePageHeroProps> = ({ slice }) => {
  useEffect(() => {
    AOS.init({
      // Optional: Configure global settings here
      duration: 800, // Example: animation duration
      once: true, // Example: animate only once
    });
  }, []);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-5"
    >
      {/* <Bounded> */}
      <div className="app-width">
        <div className="flex flex-col lg:flex-row overflow-hdden">
          <div className="w-full">
            <div>
              <div
                className="w-20 h-2.5 bg-wca-primary"
                data-aos="fade-right"
              />
              <span className="text-[26px] font-medium font-sans">
                {slice.primary.theme}
              </span>
            </div>

            <div
              className="font-bold text68 text-wca-secondary font-serif"
              data-aos="zoom-in"
            >
              <PrismicRichText field={slice.primary.hero_text} />
            </div>
            <div className="hidden sm:flex flex-col sm:flex-row sm:flex-wrap items-center gap-4 mt-5">
              <div className="w-full justify-center sm:w-fit bg-[#177402] text-white px-3 py-2 flex items-center gap-2">
                <PrismicNextLink field={slice.primary.primary_button} />
                <ShareIcon />
              </div>
              <div className="w-full sm:w-fit bg-[#FBE5B6] text-wca-primary px-3 py-2 flex justify-center items-center gap-2">
                <PrismicNextLink field={slice.primary.secondary_burron} />
              </div>
              <div className="flex gap-2 underline text-[#177402] justify-center items-center">
                <PrismicNextLink field={slice.primary.tertiary_button} />
                <ArrowRight />
              </div>
            </div>
          </div>
          <PrismicNextImage
            field={slice.primary.hero_image}
            className="w-full mt-4 lg:mt-[unset]"
            data-aos="zoom-in-right"
          />

          <div className="sm:hidden flex-col sm:flex-row sm:flex-wrap items-center gap-4 mt-5">
            <div className="w-full justify-center my-4 sm:w-fit bg-[#177402] text-white px-3 py-2 flex items-center gap-2">
              <PrismicNextLink field={slice.primary.primary_button} />
              <ShareIcon />
            </div>
            <div className="w-full my-5 sm:w-fit bg-[#FBE5B6] text-wca-primary px-3 py-2 flex justify-center items-center gap-2">
              <PrismicNextLink field={slice.primary.secondary_burron} />
            </div>
            <div className="flex gap-2 underline text-[#177402] justify-center items-center">
              <PrismicNextLink field={slice.primary.tertiary_button} />
              <ArrowRight />
            </div>
          </div>
        </div>
        <div className="grid xl:-translate-x-20 lg:grid-cols-3 md:grid-cols-2 gap-5 mt-20 mb-20">
          <div data-aos="fade-down" data-aos-duration="1000" className="w-full">
            <PrismicNextImage
              field={slice.primary.sub_image_1}
              className="w-full h-full object-cover order-2 sm:order-1"
            />
          </div>
          <div data-aos="fade-up" data-aos-duration="1300" className="w-full">
            <PrismicNextImage
              field={slice.primary.sub_image_2}
              className="hidden lg:inline w-full h-full object-cover"
            />
          </div>
          <div data-aos="fade-down" className="bg-[#F7F7F7] flex order-1 sm:order-2">
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
                  <div className="text-sm">
                    <PrismicRichText field={slice.primary.even_and_campaign} />
                  </div>
                </div>
                <div className="mt-5">
                  <div className="bg-[#FEFF03] w-fit py-2 px-3 font-bold mb-2">
                    Policy & Advocacy
                  </div>
                  <div className="text-sm">
                    <PrismicRichText field={slice.primary.policy_advocay} />
                  </div>
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
