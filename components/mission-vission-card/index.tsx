import { FC, ReactNode } from "react";
import { PrismicRichText } from "@prismicio/react";
import { RichTextField } from "@prismicio/client";
import { Target } from "lucide-react";

interface MissionVisionCardProps {
  title: string;
  content: RichTextField;
  icon?: ReactNode;
  bgColor?: string;
}

const MissionVisionCard: FC<MissionVisionCardProps> = ({
  title,
  content,
  icon,
  bgColor = "bg-[#F38218]", // Orange background from the image
}) => {
  return (
    <div className={`${bgColor} p-5 xl:p-8 text-white`}>
      <div className="flex items-center gap-4 mb-4">
        {icon || (
          <div className="shrink-0">
            <Target className="w-8 h-8 text-gray-800" />
          </div>
        )}
        <h3 className="text26 font-bold">{title}</h3>
      </div>
      <div className="flex-1">
        <div className="text-base leading-relaxed">
          <PrismicRichText field={content} />
        </div>
      </div>
    </div>
  );
};

export default MissionVisionCard;
