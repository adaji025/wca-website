import Image from "next/image";
import LangDropdown from "./lang-dropdown";
import CountdownTimer from "./countdown";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

const PageHeaderComp = async () => {
  const client = createClient();
  const headerData = await client.getSingle("website_page_header").catch(() => null);

  // Extract data with fallbacks
  const logo = headerData?.data?.logo;
  const headerText = headerData?.data?.header_text;
  const days = headerData?.data?.days ?? 0;
  const hours = headerData?.data?.hour ?? 0;
  const minutes = headerData?.data?.minute ?? 0;
  const seconds = headerData?.data?.seconds ?? 0;

  return (
    <div className='h-[138px] text-wca-secondary bg-[url("/images/pngs/header-bg.png")] bg-cover bg-center bg-no-repeat relative'>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[#FBE5B6]/70 z-10" />
      <div className="flex h-full justify-center lg:justify-between items-center app-width z-20">
        {logo?.url ? (
          <PrismicNextImage
            field={logo}
            height={90}
            width={90}
            className="z-20 hidden lg:inline"
          />
        ) : (
          <Image
            src="/images/svgs/logo.svg"
            height={90}
            width={90}
            alt="wca"
            className="z-20 hidden lg:inline"
          />
        )}
        <div className="z-20">
          {headerText ? (
            <div className="text-center font-bold text26">
              <PrismicRichText field={headerText} />
            </div>
          ) : (
            <div className="text-center font-bold text26">
              WCA SUMMIT OCTOBER 2025 (KIGALI, RWANDA)
            </div>
          )}
          <CountdownTimer
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        </div>
        <div className="hidden lg:block z-20">
          <LangDropdown />
        </div>
      </div>
    </div>
  );
};

export default PageHeaderComp;
