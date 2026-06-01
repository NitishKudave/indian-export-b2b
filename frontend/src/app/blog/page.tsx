"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiFetch, mockData } from "@/utils/api";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>(mockData.blogs);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await apiFetch("/blogs/");
        if (data && data.length) setBlogs(data);
      } catch (err) {
        console.log("Using local mock blogs:", err);
      }
    }
    loadBlogs();
  }, []);

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
          <h1 className="text-4xl font-extrabold tracking-wide sm:text-5xl">Export News & Insights</h1>
          <p className="text-slate-300 text-sm">
            Read regulatory policy changes, seasonal crop forecasts, container shipment guides, and trade updates.
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((b) => (
            <div
              key={b.slug}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              <div>
                {/* Visual image banner */}
                <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={b.banner_image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"}
                    alt={b.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-slate-900/80 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> TRADE ARTICLE
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Meta stats */}
                  <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(b.created_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> By {b.author.split(" ")[0]}</span>
                  </div>

                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors leading-snug">
                    <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {b.content}
                  </p>
                </div>
              </div>

              {/* Read button */}
              <div className="p-6 sm:p-8 pt-0">
                <Link
                  href={`/blog/${b.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 group"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
