import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/bounded";

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
      <div className="max-w-[1200px] mx-auto">

        <div className="flex">
          <div className="">
            <div>
              <div className="w-20 h-2.5 bg-[#561217]" />
              <span className="text-[26px] font-medium font-sans">
                {slice.primary.theme}
              </span>
            </div>

            <div className="font-bold text-[64px] text-[#313131] font-serif">
              <PrismicRichText field={slice.primary.hero_text} />
            </div>
            <div className="flex">
              <PrismicNextLink field={slice.primary.primary_button} />
              <PrismicNextLink field={slice.primary.secondary_burron} />
              <PrismicNextLink field={slice.primary.tertiary_button} />
            </div>
          </div>
          <PrismicNextImage field={slice.primary.hero_image} />
        </div>
        <div className="flex gap-5 mt-20">
          <PrismicNextImage field={slice.primary.sub_image_1} />
          <PrismicNextImage field={slice.primary.sub_image_2} />
          <div>
            <PrismicRichText field={slice.primary.even_and_campaign} />
            <PrismicRichText field={slice.primary.policy_advocay} />
          </div>
        </div>
      </div>
      {/* </Bounded> */}
    </section>
  );
};

export default HomePageHero;
