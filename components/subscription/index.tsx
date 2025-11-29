"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface EmailDownloadModalProps {
  onClose?: () => void;
  isOpen?: boolean;
}

export function EmailDownloadModal({
  onClose,
  isOpen = true,
}: EmailDownloadModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading] = useState(false);

  if (!isOpen) return null;
  const handleDownload = () => {
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#F38218] rounded-lg p-12 w-full max-w-md relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Ccircle cx='20' cy='20' r='15'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-wca-primary hover:bg-orange-800 text-white rounded-lg p-2 z-10 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-black mb-8 font-sans">
            Enter email to download
          </h2>

          <div className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-black bg-transparent text-black placeholder:text-black/50 font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700"
              required
            />

            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              onClick={handleDownload}
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 disabled:bg-gray-600/50 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-3 px-6 transition-colors font-sans"
            >
              {isLoading ? "Downloading..." : "Download"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
