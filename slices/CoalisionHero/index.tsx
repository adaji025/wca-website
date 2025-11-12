import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Bounded from "@/components/bounded";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `CoalisionHero`.
 */
export type CoalisionHeroProps =
  SliceComponentProps<Content.CoalisionHeroSlice>;

/**
 * Component for "CoalisionHero" Slices.
 */
const CoalisionHero: FC<CoalisionHeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="text68 text-wca-secondary text-center pt-10">
        Our Coalition
      </div>
      <div className="flex justify-center items-center gap-2 font-medium">
        <div>Home</div>
        <ChevronRight className="w-4 h-4" />
        <div className="text-[#177402] underline">Coalition</div>
      </div>
      <div className="my-10">
        <Image
          src="/images/pngs/header-bg.png"
          height={138}
          width={1000}
          alt="wca header image"
          className="w-full"
        />
        <Bounded>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:flex-1 mt-10">
              <Image
                src="/images/pngs/divider.png"
                height={20}
                width={100}
                alt="divider"
              />
              <div className="text-wca-primary text26 mt-2">
                <PrismicRichText field={slice.primary.title} />
              </div>
              <div className="font-medium text-wca-gray mt-4 text-justify wrap-break-word">
                <PrismicRichText field={slice.primary.text} />
              </div>
            </div>
            <div className="flex-1 grid gap-6 grid-cols-2 lg:-translate-y-16">
              <PrismicNextImage field={slice.primary.image1} />
              <PrismicNextImage field={slice.primary.image2} />
              <PrismicNextImage field={slice.primary.image3} />
              <PrismicNextImage field={slice.primary.image4} />
            </div>
          </div>
        </Bounded>
      </div>
    </section>
  );
};

export default CoalisionHero;
