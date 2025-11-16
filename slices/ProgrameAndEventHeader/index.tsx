import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/bounded";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * Props for `ProgrameAndEventHeader`.
 */
export type ProgrameAndEventHeaderProps =
  SliceComponentProps<Content.ProgrameAndEventHeaderSlice>;

/**
 * Component for "ProgrameAndEventHeader" Slices.
 */
const ProgrameAndEventHeader: FC<ProgrameAndEventHeaderProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <div className="text68 text-wca-secondary text-center">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="flex justify-center text-wca-primary items-center gap-2 font-medium mb-14">
          <Link href={"/"}>Home</Link>
          <ChevronRight className="w-4 h-4" />
          <div className="text-[#177402] underline">Programs & Events</div>
        </div>
      </Bounded>
    </section>
  );
};

export default ProgrameAndEventHeader;
