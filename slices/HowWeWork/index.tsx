import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/bounded";
import Image from "next/image";

/**
 * Props for `HowWeWork`.
 */
export type HowWeWorkProps = SliceComponentProps<Content.HowWeWorkSlice>;

/**
 * Component for "HowWeWork" Slices.
 */
const HowWeWork: FC<HowWeWorkProps> = ({ slice }) => {
  interface CardProps {
    image: Content.HowWeWorkSlice["primary"]["image1"] | null;
    text: string | null | undefined;
  }

  const Card: FC<CardProps> = ({ image, text }) => {
    return (
      <div className="card-overlay rounded-lg overflow-hidden h-[338px] relative">
        {image && (
          <PrismicNextImage
            field={image}
            className="w-full h-full object-cover"
          />
        )}
        <div className="card-overlay-content">
          <h3 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">
            {text}
          </h3>
        </div>
      </div>
    );
  };

  const cards = [
    { image: slice.primary.image1, text: slice.primary.image1_text },
    { image: slice.primary.image2, text: slice.primary.image2_text },
    { image: slice.primary.image3, text: slice.primary.image3_text },
    { image: slice.primary.image4, text: slice.primary.image4_text },
    { image: slice.primary.image5, text: slice.primary.image5_text },
  ].filter((card) => card.image);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Image
        src="/images/pngs/header-bg.png"
        height={138}
        width={1000}
        alt="wca header image"
        className="w-full"
      />
      <Bounded>
        <div className="mt-10 flex flex-col lg:flex-row gap-2">
          <div className="mb-8 max-w-[300px] w-full mt-10">
            <Image
              src="/images/svgs/latest-divider.svg"
              height={20}
              width={100}
              alt="divider"
            />
            {slice.primary.title && (
              <div className="text-[26px] text-wca-primary mt-4">
                <PrismicRichText field={slice.primary.title} />
              </div>
            )}
            {slice.primary.text && (
              <div className="text-wca-secondary font-bold text-[24px] md:text-[32px] lg:text-[38px] font-serif mt-2">
                <PrismicRichText field={slice.primary.text} />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:-translate-y-20">
            {cards.slice(0, 2).map((card, index) => (
              <Card key={index} image={card.image} text={card.text || ""} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 lg:mt-[unset] lg:-translate-y-10 gap-10">
          {cards.slice(2).map((card, index) => (
            <Card key={index} image={card.image} text={card.text || ""} />
          ))}
        </div>
      </Bounded>
    </section>
  );
};

export default HowWeWork;
