"use client";

import React, { useState, useEffect } from "react";
import { apiFetch, mockData } from "@/utils/api";
import { Ship, Clock, Globe, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Countries() {
  const [countries, setCountries] = useState(mockData.countries);

  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await apiFetch("/countries/");
        if (data && data.length) setCountries(data);
      } catch (err) {
        console.log("Using local mock countries:", err);
      }
    }
    loadCountries();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="relative h-80 bg-slate-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90" />
        <div className="relative text-center text-white space-y-3 z-10 max-w-2xl px-4">
          <h1 className="text-4xl font-extrabold tracking-wide sm:text-5xl">Export Destinations</h1>
          <p className="text-slate-300 text-sm">
            Shipping weekly container loads of fresh agro produce from Indian ports to international hubs.
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((c) => (
            <div
              key={c.name}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Flag & Name */}
                <div className="flex items-center gap-3">
                  <span className="text-4xl shrink-0">{c.flag_emoji}</span>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight">{c.name}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold tracking-wider">Port Code: {c.country_code}</p>
                  </div>
                </div>
                {/* Description */}
                <p className="text-slate-500 text-xs leading-relaxed">
                  {c.description}
                </p>
              </div>

              {/* Shipping info */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-orange-500" /> Avg. Transit:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {c.country_code === "AE" ? "4 Days (Sea)" : c.country_code === "GB" ? "18 Days (Sea)" : "22-26 Days (Sea)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1"><Ship className="w-3.5 h-3.5 text-orange-500" /> Primary Port:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {c.country_code === "AE" ? "Jebel Ali, Dubai" : c.country_code === "US" ? "New York / Newark" : "London Gateway / Felixstowe"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trade terms and customs compliance advice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-slate-300 space-y-6 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="space-y-3 max-w-lg">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 text-[10px] font-extrabold tracking-widest uppercase">
              <ShieldAlert className="w-3.5 h-3.5" /> CUSTOMS & IMPORT GUIDES
            </span>
            <h2 className="text-2xl font-extrabold text-white">Import Terms & Documentation</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              We manage all Phytosanitary certificates, APEDA clearance, and custom documentation under standard Incoterms 2020.
            </p>
          </div>
          <Link
            href="/inquiry"
            className="saffron-gradient hover:shadow-orange-500/15 active:scale-95 transition-all text-white font-bold px-8 py-3.5 rounded-lg text-xs tracking-wider whitespace-nowrap"
          >
            Start Trade RFQ
          </Link>
        </div>
      </section>
    </div>
  );
}
