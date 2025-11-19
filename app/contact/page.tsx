import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import ContactForm from "@/components/contact/contact-form";
import Image from "next/image";
import Bounded from "@/components/bounded";
import Link from "next/link";

export default async function ContactPage() {
  const client = createClient();
  const page = await client.getSingle("cantact").catch(() => notFound());

  // Filter out slices that don't have components registered
  const availableSliceTypes = Object.keys(components);
  const allSlices = page.data.slices || [];
  const filteredSlices = allSlices.filter((slice: any) =>
    availableSliceTypes.includes(slice.slice_type)
  );

  // Get contact information from Prismic or use defaults
  const phoneNumber = page.data.phone_number
    ? asText(page.data.phone_number)
    : "+234 906 468 3926";
  const emailAddress = page.data.email_address
    ? asText(page.data.email_address)
    : "info@wca.africa";
  const address = page.data.house
    ? asText(page.data.house)
    : "Plot 45B Daganga Crescent, Mabushi";
  const pageTitle = page.data.page_title
    ? asText(page.data.page_title)
    : "Plot 45B Daganga Crescent, Mabushi";

  return (
    <>
      <SliceZone slices={filteredSlices} components={components} />
      <Bounded>
        <div className="text68 text-wca-secondary text-center">{pageTitle}</div>
        <div className="flex justify-center items-center gap-2 font-medium text-wca-primary">
          <Link href={"/"}>Home</Link>
          <ChevronRight className="w-4 h-4" />
          <div className="text-[#177402] underline">{pageTitle}</div>
        </div>
      </Bounded>
      {/* Decorative Header Section with Pattern Background */}
      <Image
        src="/images/pngs/header-bg.png"
        height={138}
        width={1000}
        alt="wca header image"
        className="w-full mt-10"
      />

      {/* Main Content Section */}
      <Bounded>
        <div className="py-12">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Section - Map Placeholder */}
            <div className="bg-gray-100 h-[600px] flex items-center justify-center relative">
              <MapPin className="w-16 h-16 text-gray-500" />
            </div>

            {/* Right Section - Contact Information and Form */}
            <div className="bg-white">
              {/* Title Section */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-wca-primary mb-3">
                  {pageTitle}
                </h1>
                <h2 className="text-3xl lg:text-4xl font-serif text-wca-secondary mb-6">
                  Want to speak to us?
                </h2>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-wca-primary shrink-0" />
                  <span className="text-wca-secondary">{phoneNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-wca-primary shrink-0" />
                  <span className="text-wca-secondary">{emailAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-wca-primary shrink-0" />
                  <span className="text-wca-secondary">{address}</span>
                </div>
              </div>

              {/* Introductory Text */}
              <p className="text-wca-gray mb-8">
                Want to partner with us or become a member? Send us a message
                and we will get back to you in 24 hours.
              </p>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </div>
      </Bounded>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("cantact").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
