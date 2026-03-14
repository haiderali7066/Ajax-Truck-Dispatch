import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 bg-amber-400 flex items-center justify-center text-black font-bold text-sm"
                style={{ clipPath: "polygon(20% 0%,80% 0%,100% 50%,80% 100%,20% 100%,0% 50%)" }}
              >
                AX
              </div>
              <span className="font-display text-2xl tracking-[3px]">
                AJAX <span className="text-amber-400">DISPATCH</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional truck dispatch services helping owner-operators and carriers across the United States maximize revenue and reduce operational stress.
            </p>
            <div className="flex gap-3">
              {["FB", "LI", "TW"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-xs text-gray-400 hover:border-amber-400/40 hover:text-amber-400 cursor-pointer transition-all"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {["Load Searching", "Rate Negotiation", "Broker Communication", "Paperwork & Docs", "Route Planning", "Dedicated Dispatcher"].map((s) => (
                <li key={s} className="hover:text-amber-400 cursor-pointer transition-colors">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={15} className="text-amber-400 shrink-0" />
                <a href="tel:+18554794089" className="hover:text-amber-400 transition-colors">
                  +1 (855) 479-4089
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={15} className="text-amber-400 shrink-0" />
                <a href="mailto:info@ajaxdispatch.com" className="hover:text-amber-400 transition-colors">
                  info@ajaxdispatch.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin size={15} className="text-amber-400 shrink-0" />
                Wyoming, United States
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Clock size={15} className="text-amber-400 shrink-0" />
                Mon–Sat, 9AM–6PM EST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AJAX Dispatch. All rights reserved. Developed by Devntom Solutions
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
