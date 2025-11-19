import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/bounded";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Props for `EventsMain`.
 */
export type EventsMainProps = SliceComponentProps<Content.EventsMainSlice>;

/**
 * Component for "EventsMain" Slices.
 */
const EventsMain: FC<EventsMainProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-10"
    >
      <Bounded>
        <div className="text68 text-wca-secondary text-center">
          <PrismicRichText field={slice.primary.page_title} />
        </div>
        <div className="flex justify-center items-center gap-2 font-medium text-wca-primary">
          <Link href={"/"}>Home</Link>
          <ChevronRight className="w-4 h-4" />
          <div className="text-[#177402] underline">Events</div>
        </div>
      </Bounded>
    </section>
  );
};

export default EventsMain;
