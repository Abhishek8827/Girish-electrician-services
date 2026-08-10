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
  return (
    <footer className="border-t border-white/10 bg-brand-black text-brand-gray">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          {/* Company Info */}
          <div className="md:col-span-3 lg:col-span-1">
            <a
              href="#top"
              className="flex items-center gap-2 font-bold text-brand-white"
            >
              <span className="rounded-md bg-brand-yellow p-1.5 text-brand-black">
                <MdFlashOn size={17} /> {/* Using MdFlashOn for the logo */}
              </span>
              {businessConfig.name}
            </a>
            <p className="mt-4 text-sm leading-6">{businessConfig.tagline}</p>
            <p className="mt-2 text-sm leading-6">
              Serving {businessConfig.serviceArea}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#services"
                  className="hover:text-brand-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="hover:text-brand-white transition-colors"
                >
                  Process
                </a>
              </li>
              <li>
                <a
                  href="#meet-girish"
                  className="hover:text-brand-white transition-colors"
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <MdPhone size={16} className="shrink-0 text-brand-yellow" />
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="font-bold text-base text-brand-white hover:text-brand-yellow transition-colors"
                >
                  {businessConfig.phone}
                </a>
              </li>
              {businessConfig.emergencyContact && (
                <li className="flex items-center gap-2.5">
                  <MdPhone size={16} className="shrink-0 text-red-400" />
                  <a
                    href={`tel:${businessConfig.emergencyContact}`}
                    className="text-red-300 hover:text-red-200 transition-colors"
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
                  className="hover:text-brand-white transition-colors"
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-white">
              Follow Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://instagram.com/REPLACE_WITH_YOUR_PROFILE" // Replace with your actual Instagram URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-brand-white transition-colors"
                >
                  <FaInstagram
                    size={16}
                    className="shrink-0 text-brand-yellow"
                  />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${businessConfig.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-brand-white transition-colors"
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
                  className="flex items-center gap-2.5 hover:text-brand-white transition-colors"
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
      <div className="border-t border-white/10 py-6 text-center text-sm">
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
      </div>
    </footer>
  );
}

export default Footer;
