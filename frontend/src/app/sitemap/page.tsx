import React from "react";
import Link from "next/link";
import { 
  Map, Home, ShoppingBag, Info, Globe, Package, 
  Image, PenSquare, Phone, FileText, ShieldCheck, 
  ArrowRight, ArrowLeft 
} from "lucide-react";

export const metadata = {
  title: "Sitemap | Orbinexglobal",
  description:
    "Complete sitemap for Orbinexglobal website — navigate all pages including product catalog, export countries, certifications, blog articles, and trade inquiry.",
};

const sections = [
  {
    title: "Main Pages",
    icon: Home,
    color: "orange",
    pages: [
      { label: "Home — Export Overview & Featured Products", href: "/", desc: "Hero banner, product divisions, featured crops, testimonials, inquiry form" },
      { label: "About Us — Company Profile", href: "/about", desc: "Our story, founding team, farm sourcing network, export timeline" },
      { label: "Contact Us", href: "/contact", desc: "Trade desk phone, email, WhatsApp, office address, Google Maps" },
      { label: "Submit Trade Inquiry (RFQ)", href: "/inquiry", desc: "B2B bulk quotation request form with product, MOQ, and shipping details" },
    ],
  },
  {
    title: "Product Catalog",
    icon: ShoppingBag,
    color: "green",
    pages: [
      { label: "All Export Products", href: "/products", desc: "Browse complete agricultural produce and packaging catalog" },
      { label: "Fresh Vegetables — Onion, Potato, Tomato", href: "/products?category=fresh-vegetables", desc: "Premium export-grade Indian vegetables with pricing" },
      { label: "Fresh Fruits — Mango, Pomegranate, Grapes", href: "/products?category=fresh-fruits", desc: "Seasonal Indian fruits for UAE, UK, Europe markets" },
      { label: "Dry Fruits — Cashews, Almonds, Raisins", href: "/products?category=fresh-dry-fruits", desc: "High-quality dry fruits processed in hygienic facilities" },
      { label: "Packaging Boxes — Corrugated Export Cartons", href: "/products?category=packaging-boxes", desc: "Custom B2B packaging solutions for exporters" },
    ],
  },
  {
    title: "Export Information",
    icon: Globe,
    color: "blue",
    pages: [
      { label: "Export Destinations & Country Guide", href: "/countries", desc: "UAE, UK, USA, Canada, Australia and 30+ export markets" },
      { label: "Quality Certifications", href: "/certifications", desc: "APEDA, FSSAI, Organic India, SGS, ISO certification details" },
      { label: "Packaging Solutions", href: "/packaging", desc: "Export-grade corrugated cartons, reefer containers, vacuum bags" },
      { label: "Global Reach", href: "/about#global", desc: "Our export reach, trading volumes, and partner networks" },
    ],
  },
  {
    title: "Media & Content",
    icon: Image,
    color: "purple",
    pages: [
      { label: "Infrastructure Gallery", href: "/gallery", desc: "Photos of our farm sourcing, cold chain, and processing facilities" },
      { label: "Blog & Export Insights", href: "/blog", desc: "Trade guides, market insights, export regulations, and agri news" },
    ],
  },
  {
    title: "Legal & Compliance",
    icon: FileText,
    color: "slate",
    pages: [
      { label: "Privacy Policy", href: "/privacy", desc: "How we collect, use, and protect your business data" },
      { label: "Trade Terms & Conditions", href: "/terms", desc: "MOQ, payment terms, incoterms, shipping, dispute resolution" },
      { label: "Sitemap", href: "/sitemap", desc: "Full index of all pages on this website" },
    ],
  },
];

const colorMap: Record<string, string> = {
  orange: "bg-orange-500/10 border-orange-500/20 text-orange-500",
  green: "bg-green-500/10 border-green-500/20 text-green-500",
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-500",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-500",
  slate: "bg-slate-500/10 border-slate-500/20 text-slate-400",
};

export default function SitemapPage() {
  const totalPages = sections.reduce((sum, s) => sum + s.pages.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors text-xs font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <Map className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Website Sitemap
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                Orbinexglobal · {totalPages} pages · Complete navigation index
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { label: "Total Pages", value: `${totalPages}` },
              { label: "Product Categories", value: "4" },
              { label: "Export Countries", value: "30+" },
              { label: "Last Updated", value: "May 2026" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-orange-400">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sitemap Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {sections.map((section) => {
          const IconComponent = section.icon;
          const colorClass = colorMap[section.color] || colorMap.slate;
          return (
            <div
              key={section.title}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm"
            >
              {/* Section header */}
              <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${colorClass}`}>
                  <IconComponent className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {section.pages.length} page{section.pages.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Pages list */}
              <div className="divide-y divide-slate-50 dark:divide-slate-800">
                {section.pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="flex items-start justify-between gap-4 px-8 py-4 hover:bg-orange-50 dark:hover:bg-orange-500/5 transition-colors group"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-orange-500 transition-colors">
                        {page.label}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">{page.desc}</p>
                      <span className="inline-block text-[10px] font-mono text-slate-400 dark:text-slate-600 mt-0.5">
                        orbinexglobal.com{page.href}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-orange-400 transition-colors shrink-0 mt-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* XML Sitemap link */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-base mb-1">XML Sitemap (for Search Engines)</h3>
            <p className="text-slate-400 text-xs">
              Machine-readable XML sitemap for Google, Bing, and other search engine crawlers.
            </p>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-bold px-5 py-2.5 rounded-lg text-xs shrink-0"
          >
            View sitemap.xml <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Footer nav */}
        <div className="flex flex-wrap gap-4 justify-center text-xs text-slate-400">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span className="text-slate-700">·</span>
          <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
          <span className="text-slate-700">·</span>
          <Link href="/terms" className="hover:text-orange-500 transition-colors">Trade Terms & Conditions</Link>
          <span className="text-slate-700">·</span>
          <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
        </div>
      </div>
    </div>
  );
}
