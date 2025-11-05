import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const ProgramsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors outline-none">
        Programmes & Impact
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Active Programs</DropdownMenuItem>
        <DropdownMenuItem>Impact Reports</DropdownMenuItem>
        <DropdownMenuItem>Case Studies</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProgramsDropdown;
