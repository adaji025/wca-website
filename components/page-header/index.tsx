import Image from "next/image";
import LangDropdown from "./lang-dropdown";

const PageHeaderComp = () => {
  return (
    <div className='h-[138px] text-wca-secondary bg-[url("/images/pngs/header-bg.png")] bg-cover bg-center bg-no-repeat relative'>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[#FBE5B6]/70 z-10" />
      <div className="flex h-full justify-center lg:justify-between items-center app-width z-20">
        <Image
          src="/images/svgs/logo.svg"
          height={90}
          width={90}
          alt="wca"
          className="z-20 hidden lg:inline"
        />
        <div className="z-20">
          <div className="text-center font-bold text26">
            WCA SUMMIT OCTOBER 2025 (KIGALI, RWANDA)
          </div>
          <div className="flex gap-4 justify-center">
            <div className="text-center">
              <div className="font-bold text26">Days</div>
              <div>78</div>
            </div>
            <div className="text-center">
              <div className="font-bold text26">Hours</div>
              <div>78</div>
            </div>
            <div className="text-center">
              <div className="font-bold text26">Minutes</div>
              <div>78</div>
            </div>
            <div className="text-center">
              <div className="font-bold text26">Seconds</div>
              <div>78</div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block z-20">
          <LangDropdown />
        </div>
      </div>
    </div>
  );
};

export default PageHeaderComp;
