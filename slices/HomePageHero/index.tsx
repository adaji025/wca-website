import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

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
    >
      <div className="flex">
        <div className="">
          <div>
            <div className="w-20 h-2.5 bg-[#561217]" />
            <span>{slice.primary.theme}</span>
          </div>

          <PrismicRichText field={slice.primary.hero_text} />
          <div className="flex">
            <PrismicNextLink field={slice.primary.primary_button} />
            <PrismicNextLink field={slice.primary.secondary_burron} />
            <PrismicNextLink field={slice.primary.tertiary_button} />
          </div>
        </div>
        <PrismicNextImage field={slice.primary.hero_image} />
      </div>
      <div className="flex">
        <PrismicNextImage field={slice.primary.sub_image_1} />
        <PrismicRichText field={slice.primary.even_and_campaign} />
        <PrismicRichText field={slice.primary.policy_advocay} />
      </div>
    </section>
  );
};

export default HomePageHero;
