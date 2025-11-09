import Image from "next/image";
import CustomDropdown from "./custom-dropdown";
import { ArrowRight } from "../svg";

const ProgramsDropdown = () => {
  return (
    <CustomDropdown trigger="Programmes & Impact">
      <div className="grid grid-cols-2 gap-4 py-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Image
              src={"/images/pngs/placeholder-image.png"}
              height={80}
              width={160}
              alt="Coalition"
            />
            <div>
              <div>
                WCA is a partnership of like minded organizations accross africa
                looking to drive positive change in the live of women, children
                and youth{" "}
              </div>
              <button className="flex items-center gap-2 mt-2 text-[#177402] font-medium">
                <div>Read more</div>
                <ArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </CustomDropdown>
  );
};

export default ProgramsDropdown;
