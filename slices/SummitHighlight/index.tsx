import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/bounded";

/**
 * Props for `SummitHighlight`.
 */
export type SummitHighlightProps =
  SliceComponentProps<Content.SummitHighlightSlice>;

/**
 * Component for "SummitHighlight" Slices.
 */
const SummitHighlight: FC<SummitHighlightProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20"
    >
      <Bounded>
        <div className="flex">
          <div>
            <PrismicRichText field={slice.primary.title} />
            <PrismicRichText field={slice.primary.title2} />
          </div>
          <PrismicNextLink field={slice.primary.view_all} />
        </div>
        <div className="mt-10 flex gap-10">
          <div className="flex-1">
            <PrismicNextImage field={slice.primary.image1} />
            <PrismicRichText field={slice.primary.post_title} />
            <PrismicRichText field={slice.primary.post_description} />
            <PrismicNextLink field={slice.primary.see_all} />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-5">
            <PrismicNextImage field={slice.primary.image2} />
            <PrismicNextImage field={slice.primary.image3} />
            <PrismicNextImage field={slice.primary.image4} />
            <PrismicNextImage field={slice.primary.image5} />
            <PrismicNextImage field={slice.primary.image6} />
            <PrismicNextImage field={slice.primary.image7} />
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default SummitHighlight;
