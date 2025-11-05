import Image from "next/image";
import LangDropdown from "./lang-dropdown";

const PageHeaderComp = () => {
  return (
    <div className='h-[138px] text-[#313131] bg-[url("/images/pngs/header-bg.png")] bg-cover bg-center bg-no-repeat relative'>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[#FBE5B6]/70 z-10" />
      <div className="flex h-full justify-between items-center app-width z-20">
        <Image
          src="/images/svgs/logo.svg"
          height={90}
          width={90}
          alt="wca"
          className="z-20"
        />
        <div className="z-20">
          <div className="text-center font-bold text-[26px]">
            WCA SUMMIT OCTOBER 2025 (KIGALI, RWANDA)
          </div>
          <div className="flex gap-4 justify-center">
            <div className="text-center">
              <div className="font-bold text-[26px]">Days</div>
              <div>78</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-[26px]">Hours</div>
              <div>78</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-[26px]">Minutes</div>
              <div>78</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-[26px]">Seconds</div>
              <div>78</div>
            </div>
          </div>
        </div>
        <LangDropdown />
      </div>
    </div>
  );
};

export default PageHeaderComp;
