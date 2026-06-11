import React from "react";
import { ShieldCheck, Users, Landmark, Ship, Target, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-24 pb-20">
      {/* Banner Header */}
      <section className="relative h-80 bg-slate-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90" />
        <div className="relative text-center text-white space-y-3 z-10 max-w-2xl px-4">
          <h1 className="text-4xl font-extrabold tracking-wide sm:text-5xl">About Orbinexglobal</h1>
          <p className="text-slate-300 text-sm">
            Bridging premium Indian agricultural farms to international wholesalers and importers since 2012.
          </p>
        </div>
      </section>

      {/* Intro section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-orange-500 text-xs font-extrabold tracking-widest uppercase block">
            OUR CORPORATE IDENTITY
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Pioneering Agricultural Trade Standards
          </h2>
          <p className="text-slate-500 text-xs leading-relaxed">
            Orbinexglobal started with a simple vision: to raise the standard of agricultural exports from India. Headquartered in Nashik, Maharashtra—the onion capital of India—we have grown into a multi-divisional export house managing supply chains for fresh vegetables, tropical fruits, premium dry fruits, and industrial packaging carton boxes.
          </p>
          <p className="text-slate-500 text-xs leading-relaxed">
            We work directly with certified grower groups and farmers. By training local farming clusters in export grading, soil hygiene, and cold-chain compliance, we guarantee our buyers receive products that pass stringent European and GCC import health audits.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">100% Traceability</p>
                <p className="text-slate-400 text-[11px]">Track product origin from seed to port.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Cold Chain Excellence</p>
                <p className="text-slate-400 text-[11px]">Controlled humidity reefer shipping.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual representation */}
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800')` }}
          />
        </div>
      </section>

      {/* Corporate pillars */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Our Core Operations</h2>
            <p className="text-slate-400 text-sm">Empowering transparency and quality in B2B supply chains.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Ethical Sourcing</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Fairtrade purchasing models. We support farmers with technical agrarian resources and advance credit contracts, ensuring crop supply stability.
              </p>
            </div>
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Phytosanitary Rigor</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Every crop batch is tested for chemical residue and insect presence in NABL accredited labs before obtaining government export certificates.
              </p>
            </div>
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Ship className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Global Customs Control</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Complete handle over logistics: APEDA filings, custom clearances, bill of lading, certificate of origin, and custom terminal approvals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Leadership Team</h2>
          <p className="text-slate-500 text-sm">The trade professionals steering Orbinexglobal's global logistics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {/* Supriya */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm p-6 text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center font-bold text-2xl text-slate-700 mx-auto">
              SM
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Supriya Mahajan</h3>
              <p className="text-orange-500 text-xs font-semibold">Founder & Managing Director</p>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              With 15+ years in agricultural global trade, Supriya oversees grower cluster contracts and strategic retail partnerships in the GCC and Europe.
            </p>
          </div>

          {/* Ashwini */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm p-6 text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center font-bold text-2xl text-slate-700 mx-auto">
              AM
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Ashwini Mahajan</h3>
              <p className="text-orange-500 text-xs font-semibold">Chief Logistics Officer</p>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              A cold chain transportation specialist, Ashwini monitors custom clearances, port coordination, and maritime schedules for daily shipments.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
