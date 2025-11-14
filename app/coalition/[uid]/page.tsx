import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, asText } from "@prismicio/client";
import Image from "next/image";

import { createClient } from "@/prismicio";
import Bounded from "@/components/bounded";
import type { CoalitionDetailDocument } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ uid: string }>;
};

export default async function CoalitionDetailPage({ params }: Props) {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("coalition_detail", uid)
    .catch(() => notFound());

  return (
    <div className="bg-white">
      {/* Header Background */}
      <div className="mb-10">
        <div className="text68 text-wca-secondary text-center pt-10">
          {asText(page.data.country_name)}
        </div>
        <div className="flex justify-center items-center gap-2 font-medium">
          <Link href={"/"}>Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={"/coalition"}>Coalition</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={"#"} className="text-[#177402] underline">
            {asText(page.data.country_name)}
          </Link>
        </div>
      </div>

      {/* Partners List Section */}
      {page.data.partners_list && page.data.partners_list.length > 0 && (
        <div className="mt-12 mb-10">
          <div className="space-y-24">
            {page.data.partners_list.map((partner, index) => (
              <div key={index} className="overflow-hidden">
                <Image
                  src="/images/pngs/header-bg.png"
                  height={138}
                  width={1000}
                  alt="wca header image"
                  className="w-full"
                />
                <Bounded>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                    {/* Left Section - Content */}
                    <div className="flex-1">
                      <Image
                        src="/images/pngs/divider.png"
                        height={20}
                        width={100}
                        alt="divider"
                      />
                      {partner.title && (
                        <div className="mb-4 mt-2">
                          <h3 className="text-2xl md:text-3xl font-serif flex text-wca-secondary mb-2">
                            <span className="mr-2">{index + 1}.</span>
                            <PrismicRichText field={partner.title} />
                          </h3>
                        </div>
                      )}

                      {/* Partner Description */}
                      {partner.description && (
                        <div className="text-wca-gray text-base leading-relaxed mb-6">
                          <PrismicRichText field={partner.description} />
                        </div>
                      )}

                      {/* Contact Information */}
                      <div className="space-y-3">
                        {partner.phone_number && (
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <Phone className="w-5 h-5 text-wca-secondary" />
                            </div>
                            <div className="text-wca-secondary text-base">
                              <PrismicRichText field={partner.phone_number} />
                            </div>
                          </div>
                        )}

                        {partner.email_address && (
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <Mail className="w-5 h-5 text-wca-secondary" />
                            </div>
                            <div className="text-wca-secondary text-base">
                              <PrismicRichText field={partner.email_address} />
                            </div>
                          </div>
                        )}

                        {partner.house_addres && (
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-wca-secondary" />
                            </div>
                            <div className="text-wca-secondary text-base">
                              <PrismicRichText field={partner.house_addres} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Section - Content Image */}
                    <div className="flex flex-1 w-full items-center justify-center">
                      {partner.content_image?.url ? (
                        <PrismicNextImage
                          field={partner.content_image}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex bg-gray-300 flex-col min-h-[400px] items-center justify-center">
                          {/* Fallback - Green Circle with Peace Symbol */}
                          <div className="relative mb-6">
                            <div className="w-24 h-24 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                              <svg
                                className="w-14 h-14 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                              >
                                {/* Peace Symbol: Circle with vertical line and two downward lines */}
                                <circle cx="12" cy="12" r="9" />
                                <line x1="12" y1="3" x2="12" y2="12" />
                                <line x1="7" y1="17" x2="12" y2="12" />
                                <line x1="17" y1="17" x2="12" y2="12" />
                              </svg>
                            </div>
                          </div>
                          {/* Organization Name */}
                          {partner.title && (
                            <div className="text-center p-5">
                              <div className="text-green-600 font-bold text-lg md:text-xl uppercase tracking-wide">
                                <PrismicRichText field={partner.title} />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Bounded>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State for Partners */}
      {(!page.data.partners_list || page.data.partners_list.length === 0) && (
        <div className="mt-12 mb-10 text-center py-12 text-gray-500">
          <p className="text-lg">No partners listed for this country.</p>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("coalition_detail", uid)
    .catch(() => notFound());

  const countryName = asText(page.data.country_name) || "Coalition Detail";
  const partnersCount = page.data.partners || 0;

  return {
    title: `${countryName} - Coalition Detail`,
    description: `Coalition details for ${countryName} with ${partnersCount} partner${
      partnersCount !== 1 ? "s" : ""
    }`,
    openGraph: {
      title: `${countryName} - Coalition Detail`,
      description: `Coalition details for ${countryName}`,
      images: page.data.country_flag?.url
        ? [{ url: asImageSrc(page.data.country_flag) ?? "" }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("coalition_detail");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
