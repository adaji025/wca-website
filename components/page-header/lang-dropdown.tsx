import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
const LangDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center z-20 gap-1 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors outline-none">
        <Image
          src="/images/svgs/uk-flag.svg"
          alt="country flag"
          height={18}
          width={24}
        />
        <div className="text-wca-primary mt-1 uppercase font-medium">Lang</div>
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>French</DropdownMenuItem>
        <DropdownMenuItem>Spanish</DropdownMenuItem>
        <DropdownMenuItem>English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangDropdown;
