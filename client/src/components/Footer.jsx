import { Link } from "react-router-dom";
import {
  MdFlashOn,
  MdLocationOn,
  MdMailOutline,
  MdPhone,
} from "react-icons/md";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { businessConfig } from "../data/businessConfig";

function Footer() {
  const whatsappPhone = businessConfig.phone.replace(/[^0-9]/g, "");
  const telPhone = businessConfig.phone.replace(/[^0-9+]/g, "");
  return (
    <footer className="border-t border-black/10 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-brand-black dark:text-brand-gray">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {" "}
        {/* Increased section padding */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 lg:grid-cols-4">
          {" "}
          {/* Increased grid gap */}
          {/* Company Info */}
          <div className="md:col-span-3 lg:col-span-1">
            <a
              href="#top"
              className="flex items-center gap-2 font-bold text-gray-900 dark:text-brand-white"
            >
              <span className="rounded-md bg-brand-yellow p-1.5 text-brand-black">
                <MdFlashOn size={17} /> {/* Using MdFlashOn for the logo */}
              </span>
              {businessConfig.name}
            </a>
            <p className="mt-4 text-base leading-7">{businessConfig.tagline}</p>{" "}
            {/* Increased font size and line-height */}
            <p className="mt-2 text-base leading-7">
              {" "}
              {/* Increased font size and line-height */}
              Serving {businessConfig.serviceArea}
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-brand-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-base">
              {" "}
              {/* Increased font size */}
              <li>
                <a
                  href="#services"
                  className="transition-colors hover:text-gray-900 dark:hover:text-brand-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="transition-colors hover:text-gray-900 dark:hover:text-brand-white"
                >
                  Process
                </a>
              </li>
              <li>
                <a
                  href="#meet-girish"
                  className="transition-colors hover:text-gray-900 dark:hover:text-brand-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#request-service"
                  className="font-bold text-brand-yellow hover:text-brand-yellow-glow"
                >
                  Request Service
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-brand-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-base">
              {" "}
              {/* Increased font size */}
              <li className="flex items-center gap-2.5">
                <MdPhone size={16} className="shrink-0 text-brand-yellow" />
                <a
                  href={`tel:${telPhone}`}
                  className="text-base font-bold text-gray-900 transition-colors hover:text-brand-yellow dark:text-brand-white"
                >
                  {businessConfig.phone}
                </a>
              </li>
              {businessConfig.emergencyContact && (
                <li className="flex items-center gap-2.5">
                  <MdPhone
                    size={16}
                    className="shrink-0 text-red-600 dark:text-red-300"
                  />
                  <a
                    href={`tel:${businessConfig.emergencyContact}`}
                    className="text-red-600 transition-colors hover:text-red-700 dark:text-red-300 dark:hover:text-red-200"
                  >
                    Emergency: {businessConfig.emergencyContact}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <MdMailOutline
                  size={16}
                  className="shrink-0 text-brand-yellow"
                />
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="transition-colors hover:text-gray-900 dark:hover:text-brand-white"
                >
                  {businessConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MdLocationOn
                  size={16}
                  className="shrink-0 text-brand-yellow"
                />
                <span>{businessConfig.location}</span>
              </li>
            </ul>
          </div>
          {/* Social Media */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-brand-white">
              Follow Us
            </h3>
            <ul className="mt-4 space-y-3 text-base">
              {" "}
              {/* Increased font size */}
              {businessConfig.instagramUrl && (
                <li>
                  <a
                    href={businessConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 transition-colors hover:text-gray-900 dark:hover:text-brand-white"
                  >
                    <FaInstagram
                      size={16}
                      className="shrink-0 text-brand-yellow"
                    />
                    Instagram
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-gray-900 dark:hover:text-brand-white"
                >
                  <FaWhatsapp
                    size={16}
                    className="shrink-0 text-brand-yellow"
                  />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-gray-900 dark:hover:text-brand-white"
                >
                  <MdMailOutline
                    size={16}
                    className="shrink-0 text-brand-yellow"
                  />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-black/10 py-8 text-center text-base dark:border-white/10">
        {" "}
        {/* Increased padding and font size */}
        <p>
          © {new Date().getFullYear()} {businessConfig.name}. All rights
          reserved. |{" "}
          <Link
            to="/track-request"
            className="font-bold text-brand-yellow hover:text-brand-yellow-glow"
          >
            Track a Request
          </Link>
        </p>
        {businessConfig.developerName && businessConfig.developerUrl && (
          <p className="mt-4 text-sm text-gray-600 dark:text-brand-gray">
            Designed & Developed by{" "}
            <a
              href={businessConfig.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-800 transition-colors hover:text-brand-yellow dark:text-brand-white"
            >
              {businessConfig.developerName}
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}

export default Footer;
