"use client";

import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomDropdownProps {
  trigger: string;
  children: ReactNode;
}

const CustomDropdown = ({ trigger, children }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateDropdownPosition = useCallback(() => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const navbarMaxWidth = 1200;

    // Calculate navbar container position
    const navbarLeft = Math.max(0, (viewportWidth - navbarMaxWidth) / 2);
    const navbarRight = Math.min(viewportWidth, navbarMaxWidth + navbarLeft);

    // Start from navbar's left edge
    const left = navbarLeft;
    
    // End at navbar's right edge
    const right = viewportWidth - navbarRight;

    setDropdownStyle({
      left: `${left}px`,
      right: `${right}px`,
      top: `${triggerRect.bottom + 4}px`,
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", updateDropdownPosition);
      updateDropdownPosition();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, [isOpen, updateDropdownPosition]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors outline-none"
      >
        {trigger}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              ref={dropdownRef}
              style={dropdownStyle}
              className="fixed z-50 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-1"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="px-5"
                onClick={() => setIsOpen(false)}
              >
                {children}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;

