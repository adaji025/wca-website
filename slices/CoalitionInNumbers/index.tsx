import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/bounded";

/**
 * Props for `CoalitionInNumbers`.
 */
export type CoalitionInNumbersProps =
  SliceComponentProps<Content.CoalitionInNumbersSlice>;

/**
 * Component for "CoalitionInNumbers" Slices.
 */
const CoalitionInNumbers: FC<CoalitionInNumbersProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#177402] min-h-[400px] flex justify-start items-center text-white"
    >
      <Bounded>
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
            <div className="text38">
              <PrismicRichText field={slice.primary.total_partner_value} />
            </div>
            <div className="font-medium">
              <PrismicRichText field={slice.primary.total_partner_text} />
            </div>
          </div>
          <div className="flex-1">
            <div className="text38">
              <PrismicRichText field={slice.primary.african_countries_value} />
            </div>
            <div className="font-medium">
              <PrismicRichText field={slice.primary.african_countries_text} />
            </div>
          </div>
          <div className="flex-1">
            <div className="text38">
              <PrismicRichText field={slice.primary.raised_value} />
            </div>
            <div className="font-medium">
              <PrismicRichText field={slice.primary.raised_text} />
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default CoalitionInNumbers;
