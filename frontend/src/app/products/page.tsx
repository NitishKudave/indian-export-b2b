"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import { apiFetch, mockData } from "@/utils/api";
import { Search, SlidersHorizontal, ArrowRight, Ship, Landmark } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const { formatPrice } = useCurrency();
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Sync category state with search query param
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const cats = await apiFetch("/categories/");
        const prods = await apiFetch("/products/");
        if (cats && cats.length) setCategories(cats);
        if (prods && prods.length) setProducts(prods);
      } catch (err) {
        console.log("Using local mock products:", err);
        setCategories(mockData.categories);
        setProducts(mockData.products);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = 
      prod.name.toLowerCase().includes(search.toLowerCase()) ||
      prod.description.toLowerCase().includes(search.toLowerCase());
    
    // Category mapping matching (either category ID or category slug)
    const matchesCategory = 
      !selectedCategory || 
      prod.category_name.toLowerCase().replace(/ /g, "-") === selectedCategory ||
      (typeof prod.category === "object" && prod.category?.slug === selectedCategory);
      
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-wide sm:text-4xl">
          Orbinexglobal Catalog
        </h1>
        <p className="text-slate-500 text-xs max-w-2xl">
          Browse our certified grade-A agricultural crops and cold chain packaging boxes. Adjust price parameters globally inside the navigation bar.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === ""
                ? "bg-orange-500 text-white shadow"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => {
            const slug = cat.slug || cat.name.toLowerCase().replace(/ /g, "-");
            const isSelected = selectedCategory === slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(slug)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-orange-500 text-white shadow"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop or grade..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Grid listing */}
      {loading ? (
        <div className="text-center py-20 text-xs text-slate-400">Loading catalog from server...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <SlidersHorizontal className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <p className="font-bold text-slate-900 dark:text-white">No products found</p>
          <p className="text-slate-500 text-xs mt-1">Try resetting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={prod.primary_image_url || "/placeholder-crop.jpg"}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-slate-900/85 text-orange-400 text-[10px] font-extrabold px-2.5 py-1 rounded backdrop-blur-sm tracking-wide">
                    {prod.origin.split(",")[0]}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-green-600 dark:text-green-400 font-bold">
                    {prod.category_name}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white hover:text-orange-500 transition-colors text-base line-clamp-1">
                    <Link href={`/products/${prod.slug}`}>{prod.name}</Link>
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* B2B Specs & Pricing footer */}
              <div className="p-6 pt-0 space-y-4">
                <div className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] text-slate-400">Ref. Price:</span>
                    <span className="font-extrabold text-slate-900 dark:text-white text-base">
                      {formatPrice(prod.base_price_inr, prod.price_unit)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">MOQ:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {prod.moq}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all py-2.5 rounded-lg"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/inquiry?product=${prod.id}`}
                    className="saffron-gradient text-white hover:shadow-orange-500/10 active:scale-95 transition-all py-2.5 rounded-lg shadow-sm"
                  >
                    RFQ Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs text-slate-400">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
