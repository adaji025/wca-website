import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-bg z-0 text-white py-12 md:py-16">
      {/* Background pattern overlay */}
      {/* <div className="absolute inset-0 bg-wca-primary z-10" /> */}

      <div className="relative app-width z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left Section - Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start justify-center">
            <Image
              src="/images/svgs/logo.svg"
              height={316}
              width={310}
              alt="wca"
              className="z-20"
            />

            {/* Text beside logo on larger screens */}
            <div className="text-center md:text-left mt-4">
              <p className="italic text-lg text-amber-100">
                ... Amplify, Magnify, Engage!
              </p>
            </div>
          </div>

          {/* Right Section - Newsletter and Contact */}
          <div className="space-y-8">
            {/* Newsletter Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance">
                Join our newsletter
              </h2>
              <p className="text-gray-300 mb-6 text-sm md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-transparent border-2 border-white/80 text-white placeholder-gray-400 focus:outline-none focus:border-amber-300 transition"
                />
                <button className="px-6 py-3 bg-amber-200 text-[#5c1e1e] font-semibold hover:bg-amber-100 transition whitespace-nowrap">
                  Subscribe
                </button>
              </div>

              <p className="text-xs md:text-sm text-gray-400">
                By subscribing you agree to with our{" "}
                <a href="#" className="text-amber-200 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>

              <div className="space-y-3">
                {/* Phone */}
                <a
                  href="tel:+234906468392"
                  className="flex items-center gap-3 text-gray-300 hover:text-amber-200 transition group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center group-hover:bg-white/20 transition">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm md:text-base">
                    +234 906 468 3926
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@wca.africa"
                  className="flex items-center gap-3 text-gray-300 hover:text-amber-200 transition group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center group-hover:bg-white/20 transition">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm md:text-base">info@wca.africa</span>
                </a>

                {/* Address */}
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-300 hover:text-amber-200 transition group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center group-hover:bg-white/20 transition">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm md:text-base">
                    Plot 45B Daganga Crescent, Mabushi
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Social Media */}
        <div className="flex justify-center md:justify-end gap-6 pt-8 border-t border-white/10">
          <a
            href="#"
            className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-amber-200 hover:text-[#5c1e1e] transition"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-amber-200 hover:text-[#5c1e1e] transition"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-amber-200 hover:text-[#5c1e1e] transition"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
