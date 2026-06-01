import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Milestone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg saffron-gradient flex items-center justify-center font-bold text-base text-white">
                O
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-wider text-white block">
                  ORBINEXGLOBAL
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-orange-400 block -mt-1 font-semibold">
                  Export Company
                </span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs">
              Orbinexglobal is a premier Indian agricultural exporter and packaging specialist. We connect global importers to premium grade Indian farms and supply chain infrastructures.
            </p>
            {/* Certifications badges */}
            <div className="flex items-center gap-3 pt-2">
              <div className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[10px] font-bold text-orange-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> APEDA REGISTERED
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[10px] font-bold text-green-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> FSSAI COMPLIANT
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Company Profile</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">Browse Export Catalog</Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-white transition-colors">Quality Certifications</Link>
              </li>
              <li>
                <Link href="/countries" className="hover:text-white transition-colors">Export Destinations</Link>
              </li>
              <li>
                <Link href="/packaging" className="hover:text-white transition-colors">Packaging Solutions</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Infrastructure Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide">Agro Products</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products?category=fresh-vegetables" className="hover:text-white transition-colors">Fresh Vegetables (Onion, Potato)</Link>
              </li>
              <li>
                <Link href="/products?category=fresh-fruits" className="hover:text-white transition-colors">Fresh Fruits (Mango, Pomegranate)</Link>
              </li>
              <li>
                <Link href="/products?category=fresh-dry-fruits" className="hover:text-white transition-colors">Dry Fruits (Cashews, Almonds)</Link>
              </li>
              <li>
                <Link href="/products?category=packaging-boxes" className="hover:text-white transition-colors">Export Corrugated Cartons</Link>
              </li>
              <li>
                <Link href="/packaging" className="hover:text-white transition-colors">Cold Chain Pack Sizes</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide">Global Head Office</h3>
            <ul className="space-y-3 text-xs leading-relaxed">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  Plot No. 45, Agro Processing Zone,
                  MIDC Area, Nashik - 422010,
                  Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="tel:+912532456789" className="hover:text-white">+91 253 245 6789</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:trade@orbinexglobal.com" className="hover:text-white">trade@orbinexglobal.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Milestone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Trade Terms: FOB, CIF, CNF, DDP</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Orbinexglobal. All Rights Reserved. Designed for Export Quality Standards.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Trade Terms & Conditions</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
