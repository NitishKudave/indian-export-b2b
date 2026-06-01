import React from "react";
import { Box, ShieldCheck, Scale, ThermometerSnowflake, FileSpreadsheet, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Packaging() {
  const boxSpecs = [
    { name: "3-Ply Open Top Mango Carton", gsm: "120 - 150 GSM Kraft", weight: "Max 5kg load", usage: "Alphonso Mango air shipments", features: "Ventilation holes, foam nest inserts" },
    { name: "5-Ply Heavy Duty Onion Box", gsm: "150 - 200 GSM Kraft", weight: "Max 10kg / 15kg load", usage: "Onion/Potato reefer containers", features: "High humidity resistance, staple free" },
    { name: "Double Wall Corrugated Master Carton", gsm: "180 - 250 GSM Kraft", weight: "Max 25kg load", usage: "Dry fruits bulk transit", features: "Corrosive proof, moisture barrier lined" },
    { name: "Cold-Chain Wax-Coated Carton", gsm: "200+ GSM Kraft", weight: "Max 8kg load", usage: "High relative humidity reefers", features: "Water repellent, structural integrity retention" }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="relative h-80 bg-slate-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90" />
        <div className="relative text-center text-white space-y-3 z-10 max-w-2xl px-4">
          <h1 className="text-4xl font-extrabold tracking-wide sm:text-5xl">B2B Packaging Solutions</h1>
          <p className="text-slate-300 text-sm">
            High durability corrugated cardboard cartons engineered specifically for sea voyages and cold chain systems.
          </p>
        </div>
      </section>

      {/* Intro section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-orange-500 text-xs font-extrabold tracking-widest uppercase block">
            PACKAGING DIVISION
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Custom Box Printing & Moisture Defense
          </h2>
          <p className="text-slate-500 text-xs leading-relaxed">
            Fresh produce is alive and breathes. Without properly designed packaging, humidity changes inside shipping containers cause box collapse and mold growth. At Orbinexglobal, we run our own packaging design division.
          </p>
          <p className="text-slate-500 text-xs leading-relaxed">
            We manufacture heavy-duty corrugated sheets utilizing high-bursting factor kraft paper. Our cartons include ventilation ducts to enable uniform cold airflow in reefer boxes, keeping fruits and vegetables firm.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-orange-500" /> High GSM Kraft Liner</span>
            <span className="flex items-center gap-1.5"><Scale className="w-4 h-4 text-orange-500" /> Bursting Factor Tested</span>
            <span className="flex items-center gap-1.5"><ThermometerSnowflake className="w-4 h-4 text-orange-500" /> Condensation Resistance</span>
            <span className="flex items-center gap-1.5"><FileSpreadsheet className="w-4 h-4 text-orange-500" /> Custom Logo Printing</span>
          </div>
        </div>

        {/* Visual card grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-sm space-y-6 text-white">
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-orange-400" />
            <h3 className="font-extrabold text-lg">Corrugated Box Specs</h3>
          </div>
          <div className="space-y-4">
            {boxSpecs.map((spec) => (
              <div
                key={spec.name}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs"
              >
                <div className="flex justify-between font-bold text-white text-sm">
                  <span>{spec.name}</span>
                  <span className="text-orange-400">{spec.gsm}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Application: {spec.usage}</span>
                  <span>Cap: {spec.weight}</span>
                </div>
                <p className="text-slate-500 text-[11px] italic">Features: {spec.features}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-slate-300 space-y-6 text-center">
          <h2 className="text-2xl font-extrabold text-white">Need Custom Sized Packaging?</h2>
          <p className="text-slate-400 text-xs leading-relaxed max-w-xl mx-auto">
            We manufacture box templates matching your specific retail dimensions. We provide custom brand logo printing, barcoding, and private labeling support for importers.
          </p>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-1 bg-orange-500 hover:bg-orange-600 transition-colors font-bold px-8 py-3.5 rounded-lg text-xs tracking-wider text-white"
          >
            Request Packaging Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
