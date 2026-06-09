"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import { apiFetch, mockData } from "@/utils/api";
import { 
  ArrowRight, ShieldCheck, Ship, Box, Tractor, 
  MapPin, CheckCircle2, User, PhoneCall, Star, ChevronLeft, ChevronRight 
} from "lucide-react";

export default function HomeClient({ 
  initialCategories, 
  initialProducts, 
  initialBanners, 
  initialTestimonials 
}: { 
  initialCategories: any[], 
  initialProducts: any[], 
  initialBanners: any[], 
  initialTestimonials: any[] 
}) {
  const { formatPrice } = useCurrency();
  const [categories] = useState<any[]>(initialCategories || []);
  const [products] = useState<any[]>(initialProducts || []);
  const [banners] = useState<any[]>(initialBanners || []);
  const [testimonials] = useState<any[]>(initialTestimonials || []);
  
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    target_product: "",
    quantity: "",
    shipping_terms: "FOB",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  // Auto-slide hero banner
  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      await apiFetch("/inquiries/", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setFormStatus("success");
      setFormMessage("Your trade inquiry has been submitted. Our export manager will contact you within 12 hours.");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        target_product: "",
        quantity: "",
        shipping_terms: "FOB",
      });
    } catch (err: any) {
      setFormStatus("error");
      setFormMessage(err.message || "Failed to submit inquiry. Please try again.");
    }
  };

  const bgImages = [
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1200", // Port cargo
    "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=1200", // Boxes
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"  // Market spices
  ];

  return (
    <div className="space-y-24 pb-12">
      {/* 1. HERO CAROUSEL */}
      <section className="relative h-[650px] overflow-hidden bg-slate-950">
        {banners.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
              style={{ backgroundImage: `url(${slide.image_url || bgImages[idx % bgImages.length]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            
            {/* Hero content */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl space-y-6 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white tracking-widest uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" /> APEDA & FSSAI CERTIFIED
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                  {slide.title}
                </h1>
                <p className="text-slate-300 text-base sm:text-lg">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  {slide.link && (
                    <Link
                      href={slide.link}
                      className="saffron-gradient text-white font-bold px-8 py-3.5 rounded-lg shadow-md hover:shadow-orange-500/20 active:scale-95 transition-all text-sm flex items-center gap-2"
                    >
                      Explore <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                  <Link
                    href="/inquiry"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-lg active:scale-95 transition-all text-sm"
                  >
                    Request Quote (RFQ)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel controls */}
        {banners.length > 0 && (
          <div className="absolute bottom-6 right-6 z-20 flex gap-2">
            <button
              onClick={() => setCurrentSlide((currentSlide - 1 + banners.length) % banners.length)}
              className="w-10 h-10 rounded-full border border-white/20 bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((currentSlide + 1) % banners.length)}
              className="w-10 h-10 rounded-full border border-white/20 bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>

      {/* 2. VALUE PROPOSITION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
              <Tractor className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Direct Farm Sourcing</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              We source directly from farmer clusters across Nashik, Gujarat, and Solapur to ensure maximum quality and competitive B2B prices.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Export-Ready Packaging</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Customized corrugated carton boxes and vacuum bags designed to withstand long voyages and preserve moisture.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Ship className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Cold Chain & Logistics</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Weekly reefer container shipments to UAE, UK, and Europe with full phytosanitary certificates and custom clearances.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Export Product Divisions
          </h2>
          <p className="text-slate-500 text-sm">
            Strictly graded B2B export catalog covering agricultural produce and shipping solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 block"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image_url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <h3 className="font-bold text-xl group-hover:text-orange-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-slate-300 text-xs line-clamp-2">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-400 pt-1">
                  View Catalog <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS WITH CURRENCY CONVERSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Featured Export Crops</h2>
            <p className="text-slate-500 text-sm">Current wholesale reference prices (switch currency in header)</p>
          </div>
          <Link
            href="/products"
            className="text-orange-500 hover:text-orange-600 font-bold text-sm flex items-center gap-1 group self-start"
          >
            All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col group"
            >
              {/* Product Image */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={prod.primary_image_url || "/placeholder-crop.jpg"}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded backdrop-blur-sm">
                  {prod.origin.split(",")[0]}
                </span>
              </div>

              {/* Product Meta */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-green-600 dark:text-green-400 font-bold">
                    {prod.category_name}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white hover:text-orange-500 transition-colors text-base">
                    <Link href={`/products/${prod.slug}`}>{prod.name}</Link>
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-2">{prod.description}</p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Reference Price */}
                  <div className="flex justify-between items-baseline border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span className="text-xs text-slate-400">Ref. Price:</span>
                    <span className="font-extrabold text-slate-900 dark:text-white text-base" suppressHydrationWarning>
                      {formatPrice(prod.base_price_inr, prod.price_unit)}
                    </span>
                  </div>
                  {/* MOQ */}
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">MOQ:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{prod.moq}</span>
                  </div>

                  <Link
                    href={`/products/${prod.slug}`}
                    className="w-full text-center border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-900 hover:text-white transition-all py-2 rounded-lg text-xs font-bold block"
                  >
                    View Specifications
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE EXPORT COUNTRIES MAP VISUAL */}
      <section className="bg-slate-900 text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-orange-400 text-xs font-extrabold tracking-widest uppercase block">
              GLOBAL EXPORT FOOTPRINT
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-white">
              Orbinexglobal Destination Ports
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              We maintain direct sea and air freight channels from India to key regional distribution terminals. Our trade logistics network guarantees customs clearance compliance across international borders.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Dubai Port (DP World) - 4 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Port of London - 18 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Port of New York - 24 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Jeddah Port - 6 Days</span>
              </div>
            </div>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors font-bold px-6 py-3 rounded-lg text-xs tracking-wider"
            >
              See Logistics Channels <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive CSS World Map representation */}
          <div className="relative h-96 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-center p-6">
            {/* Simple global map grid fallback */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            
            {/* Visual hub links */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Origin: India */}
              <div className="absolute top-[60%] left-[55%] flex flex-col items-center">
                <span className="w-4 h-4 rounded-full bg-orange-500 animate-ping absolute" />
                <span className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-white relative z-10" />
                <span className="text-[10px] font-bold text-orange-400 mt-1 bg-slate-900/80 px-1.5 py-0.5 rounded">INDIA (Nashik Hub)</span>
              </div>

              {/* UAE */}
              <div className="absolute top-[52%] left-[38%] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-green-500" />
                <span className="text-[9px] font-medium text-slate-400">UAE 🇦🇪</span>
              </div>

              {/* UK */}
              <div className="absolute top-[28%] left-[22%] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-green-500" />
                <span className="text-[9px] font-medium text-slate-400">UK 🇬🇧</span>
              </div>

              {/* USA */}
              <div className="absolute top-[32%] left-[10%] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-green-500" />
                <span className="text-[9px] font-medium text-slate-400">USA 🇺🇸</span>
              </div>

              {/* Australia */}
              <div className="absolute top-[80%] left-[85%] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-green-500" />
                <span className="text-[9px] font-medium text-slate-400">Australia 🇦🇺</span>
              </div>
              
              {/* Connecting lines illustration */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" stroke="#f97316" strokeWidth="1.5" strokeDasharray="5,5" fill="none">
                {/* Lines from India (55%, 60%) to others */}
                <path d="M 190,210 Q 150,190 130,185" /> {/* UAE */}
                <path d="M 190,210 Q 120,130 80,105" />  {/* UK */}
                <path d="M 190,210 Q 100,120 40,115" />  {/* USA */}
                <path d="M 190,210 Q 240,240 290,270" /> {/* Australia */}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS & B2B REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Importers Testimonials</h2>
          <p className="text-slate-500 text-sm">Feedback from our long-term wholesale and distributor partners.</p>
        </div>

        <div className="max-w-4xl mx-auto relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className={`space-y-6 transition-opacity duration-500 ${
                idx === activeTestimonial ? "block" : "hidden"
              }`}
            >
              <div className="flex gap-1 text-orange-400 justify-center sm:justify-start">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed text-center sm:text-left">
                "{test.review}"
              </blockquote>
              <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 font-bold shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{test.author_name}</h4>
                  <p className="text-slate-500 text-xs">{test.company} • <span className="text-orange-500 font-semibold">{test.role}</span></p>
                </div>
              </div>
            </div>
          ))}

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === activeTestimonial ? "w-8 bg-orange-500" : "bg-slate-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. QUICK INQUIRY FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Info side */}
          <div className="p-8 sm:p-12 lg:p-16 space-y-6 flex flex-col justify-between hero-gradient text-white">
            <div className="space-y-4">
              <span className="text-orange-400 text-xs font-extrabold tracking-widest uppercase block">
                B2B TRADE INQUIRY
              </span>
              <h2 className="text-3xl font-extrabold sm:text-4xl text-white">
                Request a Bulk Quotation
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                Get premium FOB/CIF quotes for fresh vegetables, fruits, dry fruits, and custom packing boxes. Our import-export trade desk will response to you with detailed pricing breakdowns and container timelines.
              </p>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-orange-400">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Urgent Bulk Inquiry?</p>
                  <p className="text-[11px]">+91 253 245 6789 / trade@orbinexglobal.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="p-8 sm:p-12 lg:p-16 bg-slate-950 text-slate-300">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="full_name" className="text-xs font-semibold text-slate-400">Full Name *</label>
                  <input
                    id="full_name"
                    type="text"
                    name="full_name"
                    autoComplete="name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-400">Business Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. importer@company.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs font-semibold text-slate-400">Phone Number (with Code) *</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. +971 50 123 4567"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="company" className="text-xs font-semibold text-slate-400">Company Name</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Amana Fresh Trading LLC"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label htmlFor="target_product" className="text-xs font-semibold text-slate-400">Target Product</label>
                  <select
                    id="target_product"
                    name="target_product"
                    autoComplete="off"
                    value={formData.target_product}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="">General Inquiry / Catalog Request</option>
                    <option value="1">Fresh Red Onion</option>
                    <option value="2">Fresh Jyoti Potato</option>
                    <option value="3">Alphonso Mango</option>
                    <option value="4">Bhagwa Pomegranate</option>
                    <option value="5">W320 Cashews</option>
                    <option value="6">Corrugated Export Boxes</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="quantity" className="text-xs font-semibold text-slate-400">Quantity Required</label>
                  <input
                    id="quantity"
                    type="text"
                    name="quantity"
                    autoComplete="off"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g. 15 MT"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-semibold text-slate-400">Inquiry Message *</label>
                <textarea
                  id="message"
                  name="message"
                  autoComplete="off"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Detail your size grading, packaging, destination port, and delivery term requirements (FOB/CIF)..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full saffron-gradient hover:shadow-orange-500/10 active:scale-95 transition-all text-white font-bold py-3.5 rounded-lg text-xs tracking-wider"
              >
                {formStatus === "submitting" ? "SENDING REQUEST..." : "SUBMIT TRADE REQUEST"}
              </button>

              {formStatus === "success" && (
                <p className="text-green-400 text-xs font-medium bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                  {formMessage}
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                  {formMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
