import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
      {/* Jagged Field Vector Top Border (Matches Theme Color) */}
      <div 
        className="absolute w-full h-10 sm:h-16 left-0 top-0 -translate-y-[99%] z-10 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,100 L0,50 L5,80 L10,40 L15,90 L20,30 L25,70 L30,10 L35,80 L40,40 L45,90 L50,20 L55,60 L60,30 L65,80 L70,10 L75,70 L80,40 L85,90 L90,20 L95,80 L100,50 L100,100 Z' fill='%23020617'/%3E%3C/svg%3E")`, 
          backgroundSize: '150px 100%', 
          backgroundRepeat: 'repeat-x' 
        }}
      ></div>

      {/* Fresh Fruits & Vegetables Graphic resting on edge */}
      <div className="absolute right-4 sm:right-10 lg:right-24 bottom-full translate-y-[35%] z-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600" 
          alt="Fresh Farm Fruits" 
          className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-cover rounded-full border-[6px] border-slate-950 shadow-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column - Brand & About */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-wide text-white">ORBINEX</span>
                <span className="text-orange-400 font-bold text-sm tracking-[0.2em]">EXPORT GLOBAL</span>
              </div>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The main objective of this initiative is to connect global importers with premium Indian farms on a single 24x7 digital platform & help streamline the transparent process of posting and viewing B2B offers.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:scale-110 transition-all">
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:scale-110 transition-all">
                <Twitter className="w-4 h-4 fill-current" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:scale-110 transition-all">
                <Linkedin className="w-4 h-4 fill-current" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:scale-110 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:scale-110 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-orange-400 transition-colors">Browse Export Catalog</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400 transition-colors">Submit Buyer's Enquiry</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="md:col-span-4 lg:col-span-3 pt-0 md:pt-12">
             <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/certifications" className="hover:text-orange-400 transition-colors">Browse Certifications</Link></li>
              <li><Link href="/packaging" className="hover:text-orange-400 transition-colors">Packaging Guidelines</Link></li>
              <li><Link href="/gallery" className="hover:text-orange-400 transition-colors">Logistics Network</Link></li>
            </ul>
          </div>

          {/* Helpdesk */}
          <div className="md:col-span-12 lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-6">Helpdesk</h3>
            <div className="text-sm text-slate-400 space-y-2">
              <a href="mailto:trade@orbinexglobal.com" className="hover:text-orange-400 transition-colors block">
                trade[at]orbinex[dot]com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Orbinexglobal, All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
