"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    acceptTerms: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-wca-secondary mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wca-primary focus:border-transparent"
          required
        />
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-wca-secondary mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wca-primary focus:border-transparent"
          required
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-wca-secondary mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={5}
          placeholder="Type your message..."
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wca-primary focus:border-transparent resize-none"
          required
        />
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          checked={formData.acceptTerms}
          onChange={(e) =>
            setFormData({ ...formData, acceptTerms: e.target.checked })
          }
          className="w-4 h-4 border-gray-300 focus:ring-wca-primary cursor-pointer accent-wca-primary checked:bg-wca-primary checked:border-wca-primary"
          style={{
            accentColor: "#561217",
          }}
          required
        />
        <label
          htmlFor="terms"
          className="text-sm text-wca-secondary cursor-pointer"
        >
          I accept the Terms
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-[#177402] hover:bg-[#156302] text-white py-3 h-[52px] rounded-none font-medium transition-colors"
      >
        Submit
      </Button>
    </form>
  );
}
