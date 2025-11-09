import Image from "next/image";
import CustomDropdown from "./custom-dropdown";
import { ArrowRight } from "../svg";

const CoalitionDropdown = () => {
  return (
    <CustomDropdown trigger="Coalition">
      <div className="flex py-4">
        <div className="flex gap-4 items-center">
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
        <div className="space-y-3 w-1/3">
          <button className="flex items-center gap-2 mt-2 text-[#177402] font-medium">
            <div>Explore Partnership by Region</div>
            <ArrowRight />
          </button>
          <button className="flex items-center gap-2 mt-2 text-[#177402] font-medium">
            <div>See all Partners</div>
            <ArrowRight />
          </button>
          <button className="flex items-center gap-2 mt-2 text-[#177402] font-medium">
            <div>Become a Partner</div>
            <ArrowRight />
          </button>
        </div>
      </div>
    </CustomDropdown>
  );
};

export default CoalitionDropdown;
