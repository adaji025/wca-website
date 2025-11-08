import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/bounded";

/**
 * Props for `Impact`.
 */
export type ImpactProps = SliceComponentProps<Content.ImpactSlice>;

/**
 * Component for "Impact" Slices.
 */
const Impact: FC<ImpactProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="impact-bg min-h-[400px] flex justify-start items-center text-white"
    >
      <div className="app-width w-full">
        <div>
          <div className="text38 font-bold text-white/90">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="text-white/80">
            <PrismicRichText field={slice.primary.text} />
          </div>
        </div>
        <div className="flex justify-between gap-10 mt-10">
          <div className="flex-1">
            <span className="text38">{slice.primary.productivity_vlaue}<span className="text-xl">X</span></span>
            <PrismicRichText field={slice.primary.productivity_text} />
          </div>
          <div className="flex-1">
            <span className="text38">{slice.primary.investement_value}<span className="test-sm">%</span></span>
            <PrismicRichText field={slice.primary.investment_text} />
          </div>
          <div className="flex-1">
            <span className="text38">{slice.primary.customer_value}K<span className="text-s">+</span></span>
            <PrismicRichText field={slice.primary.customer_text} />
          </div>
          <div className="flex-1">
            <span className="text38">{slice.primary.review_value}<span className="text-s">+</span></span>
            <PrismicRichText field={slice.primary.review_text} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
