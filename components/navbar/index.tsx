"use client";

import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import CoalitionDropdown from "./coalition-dropdown";
import ProgramsDropdown from "./programs-dropdown";
import Image from "next/image";
import { useProgramsAndEvents } from "./programs-mobile-dropdown";
import { useCoalition } from "./coalition-mobile-dropdown";
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items: programsAndEventsItems, isLoading: isLoadingPrograms } =
    useProgramsAndEvents();
  const { item: coalitionItem, isLoading: isLoadingCoalition } = useCoalition();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
  ];

  const dropdownItems = [
    {
      label: "Coalition",
      items: isLoadingCoalition
        ? ["Loading..."]
        : coalitionItem
          ? [coalitionItem.title]
          : ["Coalition Members"],
      href: "/coalition",
    },
    {
      label: "Programmes & Impact",
      items: isLoadingPrograms
        ? ["Loading..."]
        : programsAndEventsItems.length > 0
          ? programsAndEventsItems.map((item) => item.title)
          : ["Active Programs", "Impact Reports", "Case Studies"],
      href: "/programs",
    },
  ];

  const otherItems = [
    { label: "Events", href: "/events" },
    { label: "News & Stories", href: "/news" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="bg-white lg:border-t lg:mt-5 border-gray-200 app-width">
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
        <Image
          src="/images/svgs/logo.svg"
          height={60}
          width={60}
          alt="wca"
          className="z-20 lg:hidden"
        />
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
        <div className="hidden lg:flex items-center gap-4">
          <button className="h-full bg-green-700 hover:bg-green-800 text-white px-6 py-2 ">
            Get Involved
          </button>
          {/* <button className="text-gray-700 hover:text-gray-900 transition-colors p-2">
            <Search className="w-5 h-5" />
          </button> */}
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed inset-x-0 top-0 bg-white border-b border-gray-200 py-4 space-y-4 max-h-screen overflow-y-auto z-50 shadow-lg"
          >
            {/* Close Button */}
            <div className="flex justify-between px-4 pb-2">
              <Image
                src="/images/svgs/logo.svg"
                height={60}
                width={60}
                alt="wca"
                className="z-20"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="app-width">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors pb-2 px-2"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Dropdowns */}
              {dropdownItems.map((dropdown) => (
                <div key={dropdown.label} className="space-y-2 pt-2 px-2">
                  <Link
                    href={dropdown.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 font-medium text-sm"
                  >
                    {dropdown.label}
                  </Link>
                  <div className="pl-4 space-y-2 mt-2">
                    {dropdown.label === "Coalition" &&
                    !isLoadingCoalition &&
                    coalitionItem ? (
                      <Link
                        key={coalitionItem.id}
                        href={coalitionItem.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-left text-gray-600 hover:text-gray-900 text-sm transition-colors"
                      >
                        {coalitionItem.title}
                      </Link>
                    ) : dropdown.label === "Programmes & Impact" &&
                      !isLoadingPrograms &&
                      programsAndEventsItems.length > 0 ? (
                      programsAndEventsItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full text-left text-gray-600 hover:text-gray-900 text-sm transition-colors"
                        >
                          {item.title}
                        </Link>
                      ))
                    ) : (
                      dropdown.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full text-left text-gray-600 hover:text-gray-900 text-sm transition-colors"
                        >
                          {item}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              ))}

              {otherItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors p-2"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Get Involved Button */}
              <div className="px-2 pt-2">
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-sm"
                >
                  Get Involved
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
