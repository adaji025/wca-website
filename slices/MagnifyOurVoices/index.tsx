import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import Bounded from "@/components/bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SquareArrowOutUpRight } from "lucide-react";

/**
 * Props for `MagnifyOurVoices`.
 */
export type MagnifyOurVoicesProps =
  SliceComponentProps<Content.MagnifyOurVoicesSlice>;

/**
 * Component for "MagnifyOurVoices" Slices.
 */
const MagnifyOurVoices: FC<MagnifyOurVoicesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="magnify-bg min-h-[576px] flex flex-col justify-between items-center text-wca-primary textcenter"
    >
      <Image
        src="/images/svgs/latest-divider.svg"
        height={2}
        width={400}
        className="w-full"
        alt="divider"
      />
      <Bounded>
        <div className="text-center w-full py-10">
          <div className="text38">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="max-w-[760px] mx-auto text26 text-black">
            <PrismicRichText field={slice.primary.text} />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {slice.primary.button1?.link_type && slice.primary.button1?.text && (
              <div className="bg-[#177402] w-full sm:w-fit justify-center text-white px-6 py-3 flex  items-center gap-2">
                <PrismicNextLink field={slice.primary.button1} />
                <SquareArrowOutUpRight className="w-3 h-3" />
              </div>
            )}
            {slice.primary.button2?.link_type && slice.primary.button2?.text && (
              <div className="bg-[#FBE5B6] w-full sm:w-fit justify-center text-wca-secondary px-6 py-3 flex items-center gap-2">
                <PrismicNextLink field={slice.primary.button2} />
                <SquareArrowOutUpRight className="w-3 h-3" />
              </div>
            )}
            {slice.primary.button3?.link_type && slice.primary.button3?.text && (
              <div className="bg-wca-primary w-full sm:w-fit justify-center text-white px-6 py-3 flex items-center gap-2">
                <PrismicNextLink field={slice.primary.button3} />
                <SquareArrowOutUpRight className="w-3 h-3" />
              </div>
            )}
          </div>

          <div className="mt-10 w-full flex-1 flex flex-wrap justify-center lg:justify-between items-center gap-10">
            <PrismicNextImage field={slice.primary.logo1} />
            <PrismicNextImage field={slice.primary.logo2} />
            <PrismicNextImage field={slice.primary.logo3} />
            <PrismicNextImage field={slice.primary.logo4} /><PrismicNextImage field={slice.primary.logo5} />
          </div>
        </div>
      </Bounded>
      <Image
        src="/images/svgs/latest-divider.svg"
        height={2}
        width={400}
        className="w-full"
        alt="divider"
      />
    </section>
  );
};

export default MagnifyOurVoices;
