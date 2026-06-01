"use client";

import React, { useState, useEffect } from "react";
import { apiFetch, mockData } from "@/utils/api";
import { ShieldCheck, CheckCircle2, Award, ClipboardCheck } from "lucide-react";

export default function Certifications() {
  const [certs, setCerts] = useState(mockData.certifications);

  useEffect(() => {
    async function loadCerts() {
      try {
        const data = await apiFetch("/certifications/");
        if (data && data.length) setCerts(data);
      } catch (err) {
        console.log("Using local mock certifications:", err);
      }
    }
    loadCerts();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="relative h-80 bg-slate-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90" />
        <div className="relative text-center text-white space-y-3 z-10 max-w-2xl px-4">
          <h1 className="text-4xl font-extrabold tracking-wide sm:text-5xl">Export Quality Certifications</h1>
          <p className="text-slate-300 text-sm">
            We adhere to strict international food safety, phytosanitary, and B2B trade compliance audits.
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certs.map((c) => (
            <div
              key={c.name}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Badge Icon / Logo */}
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 shrink-0">
                <Award className="w-8 h-8" />
              </div>
              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">{c.name}</h3>
                <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider bg-orange-500/5 px-2.5 py-1 rounded inline-block">
                  Auth: {c.certificate_authority}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance standards statement */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-slate-300 space-y-6 text-center">
          <ClipboardCheck className="w-12 h-12 text-orange-400 mx-auto animate-pulse" />
          <h2 className="text-2xl font-extrabold text-white">Customs Pre-Shipment Inspection</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            All agricultural shipments from Orbinexglobal are inspected at our pack houses by SGS, Bureau Veritas, or Intertek based on the importer's specific parameters. We provide formal Phytosanitary Certificates issued by the Ministry of Agriculture of India, along with Certificate of Origin documents.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-white">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Residue Free Checked</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Non-GMO Declared</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Grade Graded</span>
          </div>
        </div>
      </section>
    </div>
  );
}
