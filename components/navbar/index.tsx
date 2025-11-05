"use client";

import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoalitionDropdown from "./coalition-dropdown";
import ProgramsDropdown from "./programs-dropdown";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
  ];

  const dropdownItems = [
    {
      label: "Coalition",
      items: ["Coalition Members", "Our Mission", "Partners"],
    },
    {
      label: "Programmes & Impact",
      items: ["Active Programs", "Impact Reports", "Case Studies"],
    },
  ];

  const otherItems = [
    { label: "Events", href: "/events" },
    { label: "News & Stories", href: "/news" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-t mt-5 border-gray-200 app-width">
      <div className="flex items-center justify-between h-16">
        {/* Left Navigation Links - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-900 hover:text-gray-700 text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}

          {/* Coalition Dropdown */}
          <CoalitionDropdown />

          {/* Programmes & Impact Dropdown */}
          <ProgramsDropdown />

          {otherItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button - Show on small screens */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden h-full sm:block bg-green-700 hover:bg-green-800 text-white px-6 py-2 ">
            Get Involved
          </button>
          <button className="text-gray-700 hover:text-gray-900 transition-colors p-2">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors px-2"
            >
              {item.label}
            </a>
          ))}

          {/* Mobile Dropdowns */}
          {dropdownItems.map((dropdown) => (
            <div key={dropdown.label} className="space-y-2 px-2">
              <div className="text-gray-700 font-medium text-sm">
                {dropdown.label}
              </div>
              <div className="pl-4 space-y-2">
                {dropdown.items.map((item) => (
                  <button
                    key={item}
                    className="block w-full text-left text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {otherItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors px-2"
            >
              {item.label}
            </a>
          ))}

          {/* Mobile Get Involved Button */}
          <div className="px-2 pt-2">
            <Button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-sm">
              Get Involved
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
