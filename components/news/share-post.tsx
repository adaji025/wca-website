"use client";

import React, { useState } from "react";
import { Linkedin, Twitter, Link as LinkIcon, Check } from "lucide-react";

// Facebook icon SVG component
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface SharePostProps {
  url: string;
  title: string;
  description?: string;
}

export default function SharePost({ url, title, description = "" }: SharePostProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const text = description ? `${title} - ${description}` : title;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="mt-6 lg:-translate-y-16">
      <div className="text-base font-semibold text-wca-secondary mb-4">
        Share this Post
      </div>
      <div className="flex flex-wrap gap-3">
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="relative"
          // className="flex items-center gap-2 px-4 py-2 bg-wca-secondary text-white rounded-lg hover:bg-wca-secondary/90 transition-colors duration-200"
          aria-label="Copy link"
        >
          {copied ? (
            <div className="">
              {/* <Check className="w-5 h-5" /> */}
              <LinkIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Copied!</span>
            </div>
          ) : (
            <>
              <LinkIcon className="w-5 h-5" />
              {/* <span className="text-sm font-medium">Copy Link</span> */}
            </>
          )}
        </button>

        {/* LinkedIn Button */}
        <button
          onClick={shareToLinkedIn}
          // className="flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#005885] transition-colors duration-200"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
          {/* <span className="text-sm font-medium">LinkedIn</span> */}
        </button>

        {/* Twitter Button */}
        <button
          onClick={shareToTwitter}
          // className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#0d8bd9] transition-colors duration-200"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
          {/* <span className="text-sm font-medium">Twitter</span> */}
        </button>

        {/* Facebook Button */}
        <button
          onClick={shareToFacebook}
          // className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1565c0] transition-colors duration-200"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="w-5 h-5" />
          {/* <span className="text-sm font-medium">Facebook</span> */}
        </button>
      </div>
    </div>
  );
}

