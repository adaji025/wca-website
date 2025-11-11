import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/bounded";
import Image from "next/image";

/**
 * Props for `Executives`.
 */
export type ExecutivesProps = SliceComponentProps<Content.ExecutivesSlice>;

/**
 * Component for "Executives" Slices.
 */
const Executives: FC<ExecutivesProps> = ({ slice }) => {
  const executives = slice.primary.items || [];
  const countryReps = slice.primary.country_reps || [];
  const stateReps = slice.primary.state_reps || [];

  // Team Member Card Component
  const TeamCard = ({
    image,
    name,
    title,
  }: {
    image: any;
    name: any;
    title: any;
  }) => (
    <div className="flex flex-col items-center text-center">
      {/* Circular Image */}
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center overflow-hidden">
        {image?.url ? (
          <PrismicNextImage
            field={image}
            className="w-full h-full object-cover rounded-full"
            alt={name || "Team member"}
          />
        ) : (
          <div className="w-12 h-12 bg-gray-500 rounded flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8z" />
            </svg>
          </div>
        )}
      </div>
      {/* Name */}
      {name && (
        <div className="text26 text-wca-primary font-sans mb-1">
          <PrismicRichText field={name} />
        </div>
      )}
      {/* Title */}
      {title && (
        <div className=" text-sm font-sans text-wca-secondary font-medium">
          <PrismicRichText field={title} />
        </div>
      )}
    </div>
  );

  // Section Component
  const TeamSection = ({
    title,
    members,
  }: {
    title: string;
    members: any[];
  }) => {
    if (members.length === 0) return null;

    return (
      <div className="mb-12">
        {/* Yellow Bar with Section Title */}
        <div className="bg-yellow-400 py-3 px-6 mb-8 text-center font-bold">
          <h3 className=" font-sans text-lg font-semibold">{title}</h3>
        </div>
        {/* Grid of Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {members.map((member, index) => (
            <TeamCard
              key={index}
              image={member.image}
              name={member.name}
              title={member.title}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-2"
    >
      <Image
        src="/images/svgs/latest-divider.svg"
        height={2}
        width={400}
        className="w-full"
        alt="divider"
      />
      <Bounded>
        {/* Header with colored squares */}
        <div className="mb-6 mt-20">
          <div className="flex flex-col items-center text-center justify-center gap-2 mb-4">
            <Image
              src="/images/pngs/divider.png"
              height={20}
              width={140}
              alt="divider"
              className="translate-x-8"
            />
            {slice.primary.title && (
              <div className="text26 text-center text-wca-gray font-sans">
                <PrismicRichText field={slice.primary.title} />
              </div>
            )}
          </div>

          {/* Main Title */}
          {slice.primary.sub_title && (
            <div className="text38 text-center font-serif mb-10">
              <PrismicRichText field={slice.primary.sub_title} />
            </div>
          )}

        </div>

        {/* Team Sections */}
        <TeamSection title="Executive" members={executives} />
        <TeamSection title="Country Representatives" members={countryReps} />
        <TeamSection title="State Representatives" members={stateReps} />
      </Bounded>
    </section>
  );
};

export default Executives;
