"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiFetch, mockData } from "@/utils/api";
import { ArrowLeft, Calendar, User, BookOpen, AlertCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetail(props: PageProps) {
  const resolvedParams = React.use(props.params);
  const slug = resolvedParams.slug;

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        setLoading(true);
        const data = await apiFetch(`/blogs/${slug}/`);
        if (data) setBlog(data);
      } catch (err) {
        console.log("Looking up local fallback blog for:", slug);
        const fallback = mockData.blogs.find((b) => b.slug === slug);
        if (fallback) setBlog(fallback);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-slate-400">
        Loading article text...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-orange-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Article not found</h2>
        <Link href="/blog" className="text-orange-500 hover:underline text-sm font-semibold flex items-center gap-1 justify-center">
          <ArrowLeft className="w-4 h-4" /> Return to blog listing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-orange-500 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO ALL ARTICLES
        </Link>
      </div>

      {/* Main Content */}
      <article className="space-y-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm">
        {/* Banner image */}
        <div className="h-96 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
          <img
            src={blog.banner_image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Meta */}
        <div className="space-y-4 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.created_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Author: {blog.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {blog.title}
          </h1>
        </div>

        {/* Text */}
        <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
          {blog.content}
        </div>
      </article>
    </div>
  );
}
