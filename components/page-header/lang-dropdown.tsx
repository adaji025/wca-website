import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
const LangDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center z-20 gap-1 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors outline-none">
        Coalition
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Coalition Members</DropdownMenuItem>
        <DropdownMenuItem>Our Mission</DropdownMenuItem>
        <DropdownMenuItem>Partners</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangDropdown;
