import HomeClient from "./HomeClient";
import { mockData } from "@/utils/api";

// Define the base URL for fetching data server-side
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://indian-export-b2b.onrender.com/api';

async function fetchFromApi(endpoint: string) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { 
      next: { revalidate: 60 } // Cache data for 60 seconds (Incremental Static Regeneration)
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error(`Failed to fetch ${endpoint} on server:`, e);
    return [];
  }
}

export default async function Home() {
  // Fetch all data in parallel on the server
  let [categories, products, banners, testimonials] = await Promise.all([
    fetchFromApi("/categories/"),
    fetchFromApi("/products/"),
    fetchFromApi("/banners/"),
    fetchFromApi("/testimonials/")
  ]);

  if (!categories || categories.length === 0) categories = mockData.categories;
  if (!products || products.length === 0) products = mockData.products;
  if (!banners || banners.length === 0) banners = mockData.banners;
  if (!testimonials || testimonials.length === 0) testimonials = mockData.testimonials;

  return (
    <HomeClient 
      initialCategories={categories || []}
      initialProducts={products ? products.slice(0, 4) : []}
      initialBanners={banners || []}
      initialTestimonials={testimonials || []}
    />
  );
}
