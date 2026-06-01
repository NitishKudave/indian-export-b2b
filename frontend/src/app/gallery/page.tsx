import React from "react";
import { Camera, ShieldCheck, Factory, Sprout, Ship } from "lucide-react";

export default function Gallery() {
  const photos = [
    { title: "Onion Sizing & Sorting Line", category: "Warehouse Processing", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600", description: "Hygienic sorting and sizing red onions by diameter for export standards." },
    { title: "Wax Coated Carton Manufacturing", category: "Packaging Unit", image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=600", description: "Wax coating corrugated master sheets to withstand cold storage condensation." },
    { title: "Solapur Pomegranate Harvest", category: "Agro Farm cluster", image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=600", description: "Growers hand-grading Bhagwa pomegranates at our partner farm hubs." },
    { title: "Reefer Container Pre-cooling", category: "Logistics Hub", image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=600", description: "Pre-cooling reefer containers to 5°C before loading fruit pallets." },
    { title: "Alphonso Foam Padding Line", category: "Fruit Pack House", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600", description: " foam nest padding Alphonso mangoes individually to prevent bruising during transit." },
    { title: "Spices Dry Processing Unit", category: "Processing Plant", image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600", description: "Vibrating deck sorting and metal checking seeds and organic raw spices." }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="relative h-80 bg-slate-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90" />
        <div className="relative text-center text-white space-y-3 z-10 max-w-2xl px-4">
          <h1 className="text-4xl font-extrabold tracking-wide sm:text-5xl">Infrastructure Gallery</h1>
          <p className="text-slate-300 text-sm">
            Take a visual tour of our packaging facilities, temperature-controlled pack houses, and farm clusters.
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((p, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm group flex flex-col justify-between"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded backdrop-blur-sm">
                  {p.category}
                </span>
              </div>
              {/* Text */}
              <div className="p-6 space-y-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">{p.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust badges footer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 text-slate-600 dark:text-slate-400 text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 mx-auto">
            <Camera className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Facility Audits</h2>
          <p className="text-slate-500 text-xs leading-relaxed max-w-xl mx-auto">
            Our packing houses and warehouses in Nashik and Solapur are audited annually by SGS inspectors. We maintain a zero-infraction track record under government health rules.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5"><Factory className="w-4.5 h-4.5 text-orange-500" /> APEDA Packhouse Approved</span>
            <span className="flex items-center gap-1.5"><Sprout className="w-4.5 h-4.5 text-orange-500" /> Phytosanitary Clearance Ready</span>
            <span className="flex items-center gap-1.5"><Ship className="w-4.5 h-4.5 text-orange-500" /> Port-Link Logistics</span>
          </div>
        </div>
      </section>
    </div>
  );
}
