"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import { Globe, Menu, X, Landmark, DollarSign } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Certifications", href: "/certifications" },
    { name: "Global Reach", href: "/countries" },
    { name: "Packaging", href: "/packaging" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-slate-900/95 text-white shadow-lg backdrop-blur-md border-b border-slate-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-lg saffron-gradient flex items-center justify-center font-bold text-base text-white shadow-md transform group-hover:scale-105 transition-transform">
              O
            </div>
            <div>
              <span className="font-extrabold text-[15px] tracking-wide block text-white">
                ORBINEXGLOBAL
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-orange-400 block -mt-0.5 font-semibold">
                Export Company
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm tracking-wide transition-colors py-2 ${
                    isActive
                      ? "text-orange-400"
                      : "text-slate-300 hover:text-orange-400"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 saffron-gradient rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Currency Select */}
            <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700 rounded-lg px-2.5 py-1.5">
              <Globe className="w-4 h-4 text-orange-400" />
              <select
                id="currency-desktop"
                name="currency-desktop"
                aria-label="Select currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
                <option value="INR" className="bg-slate-900 text-white">INR (₹)</option>
                <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
                <option value="AED" className="bg-slate-900 text-white">AED (د.إ)</option>
                <option value="GBP" className="bg-slate-900 text-white">GBP (£)</option>
                <option value="SAR" className="bg-slate-900 text-white">SAR (ر.س)</option>
                <option value="RUB" className="bg-slate-900 text-white">RUB (₽)</option>
                <option value="AUD" className="bg-slate-900 text-white">AUD (A$)</option>
                <option value="CAD" className="bg-slate-900 text-white">CAD (C$)</option>
                <option value="SGD" className="bg-slate-900 text-white">SGD (S$)</option>
                <option value="JPY" className="bg-slate-900 text-white">JPY (¥)</option>
                <option value="CNY" className="bg-slate-900 text-white">CNY (¥)</option>
                <option value="ZAR" className="bg-slate-900 text-white">ZAR (R)</option>
                <option value="MYR" className="bg-slate-900 text-white">MYR (RM)</option>
                <option value="THB" className="bg-slate-900 text-white">THB (฿)</option>
              </select>
            </div>

            {/* Quick RFQ button */}
            <Link
              href="/inquiry"
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-sm font-semibold text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-orange-500/20"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden gap-3">
            <select
              id="currency-mobile"
              name="currency-mobile"
              aria-label="Select currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-slate-800/80 text-xs border border-slate-700 font-semibold text-white rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="AED">AED</option>
              <option value="GBP">GBP</option>
              <option value="SAR">SAR</option>
              <option value="RUB">RUB</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
              <option value="SGD">SGD</option>
              <option value="JPY">JPY</option>
              <option value="CNY">CNY</option>
              <option value="ZAR">ZAR</option>
              <option value="MYR">MYR</option>
              <option value="THB">THB</option>
            </select>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-orange-400 focus:outline-none"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 text-white transition-all backdrop-blur-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-lg text-base font-semibold ${
                  pathname === link.href
                    ? "bg-orange-500/10 text-orange-400"
                    : "hover:bg-slate-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3 px-3">
              <Link
                href="/inquiry"
                onClick={() => setIsOpen(false)}
                className="w-full text-center saffron-gradient text-white py-3 rounded-lg font-bold shadow-md"
              >
                Request B2B Quotation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
