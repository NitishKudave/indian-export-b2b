const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://indian-export-b2b.onrender.com/api";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("orbinex_token") : null;
  
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong");
  }

  return data;
}

// Fallback Mock Data in case the backend is offline or during static compilation build
export const mockData = {
  categories: [
    { id: 1, name: "Fresh Vegetables", slug: "fresh-vegetables", description: "Premium Nashik onions, potatoes, tomatoes, and chilies sourced directly from certified farms.", image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600" },
    { id: 2, name: "Fresh Fruits", slug: "fresh-fruits", description: "Juicy, handpicked tropical mangoes, pomegranates, and bananas sorted and graded to perfection.", image_url: "https://images.unsplash.com/photo-1610832958506-ee56336191d1?auto=format&fit=crop&q=80&w=600" },
    { id: 3, name: "Dry Fruits", slug: "fresh-dry-fruits", description: "Grade A cashews, almonds, and raisins processed in completely clean, hygienic packaging spaces.", image_url: "https://images.unsplash.com/photo-1596560548464-f01068e6020b?auto=format&fit=crop&q=80&w=600" },
    { id: 4, name: "Packaging Boxes", slug: "packaging-boxes", description: "Extra sturdy corrugated cardboard carton boxes designed for long-distance transit and cold chain air cargo.", image_url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600" }
  ],
  products: [
    {
      id: 1,
      category_name: "Fresh Vegetables",
      name: "Fresh Red Onion",
      slug: "fresh-red-onion",
      description: "Premium Nashik red onions. Selected, graded, and packed in mesh bags. Known for long shelf life and excellent flavor profile.",
      origin: "Nashik, Maharashtra, India",
      quality_grade: "A-Grade (35mm to 55mm+ size)",
      moq: "15 Metric Tons (1x20ft Reefer Container)",
      packaging_type: "25kg / 50kg Red Mesh Bags",
      shelf_life: "45 to 60 days under controlled ventilation",
      export_availability: true,
      base_price_inr: 32000.00,
      price_unit: "Metric Ton",
      primary_image_url: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=600",
      additional_images: ["https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600"],
      meta_title: "Fresh Red Onion Exporter India - Orbinexglobal",
      meta_description: "Premium Nashik red onions. Selected, graded, and packed in mesh bags. Sourced directly from farms for bulk shipping."
    },
    {
      id: 2,
      category_name: "Fresh Vegetables",
      name: "Fresh Jyoti Potato",
      slug: "fresh-jyoti-potato",
      description: "Premium fresh potatoes ideal for wholesalers, chips manufacturers, and retail supply chains. Free from greening and damage.",
      origin: "Gujarat & West Bengal, India",
      quality_grade: "Premium Grade (45mm+ size)",
      moq: "18 Metric Tons (1x20ft Container)",
      packaging_type: "50kg Jute/Mesh Bags",
      shelf_life: "90 days in cold storage",
      export_availability: true,
      base_price_inr: 22000.00,
      price_unit: "Metric Ton",
      primary_image_url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600",
      additional_images: [],
      meta_title: "Fresh Potato Exporter India - Orbinexglobal",
      meta_description: "Premium fresh potatoes ideal for wholesalers, chips manufacturers, and retail supply chains. Selected from Gujarat."
    },
    {
      id: 3,
      category_name: "Fresh Fruits",
      name: "Alphonso Mango",
      slug: "alphonso-mango",
      description: "The King of Mangoes. Nationally famous Alphonso mangoes, rich, creamy, tender texture and delicate sweet aroma.",
      origin: "Ratnagiri, Maharashtra, India",
      quality_grade: "A-Grade (250g to 300g per fruit)",
      moq: "2 Metric Tons (Air Cargo)",
      packaging_type: "Custom 1 Dozen / 2 Dozen Open-top Foam Nested Cartons",
      shelf_life: "10 to 14 days under 13°C temperature control",
      export_availability: true,
      base_price_inr: 180000.00,
      price_unit: "Metric Ton",
      primary_image_url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600",
      additional_images: [],
      meta_title: "Alphonso Mango Exporter India - Orbinexglobal",
      meta_description: "The King of Mangoes. Nationally famous Alphonso mangoes, rich, creamy, tender texture and delicate sweet aroma."
    },
    {
      id: 4,
      category_name: "Fresh Fruits",
      name: "Bhagwa Pomegranate",
      slug: "bhagwa-pomegranate",
      description: "Dark red Bhagwa pomegranates with soft seeds. Packed with antioxidants, highly demanded globally for fruit chains.",
      origin: "Solapur, Maharashtra, India",
      quality_grade: "Premium Export (80mm+ diameter, 300g+)",
      moq: "5 Metric Tons",
      packaging_type: "3.5kg / 4kg Corrugated Boxes",
      shelf_life: "45 days in 5°C relative humidity",
      export_availability: true,
      base_price_inr: 95000.00,
      price_unit: "Metric Ton",
      primary_image_url: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=600",
      additional_images: [],
      meta_title: "Bhagwa Pomegranate Exporter India - Orbinexglobal",
      meta_description: "Dark red Bhagwa pomegranates with soft seeds. Packed with antioxidants, highly demanded globally."
    },
    {
      id: 5,
      category_name: "Dry Fruits",
      name: "W320 Premium Cashew Nuts",
      slug: "w320-premium-cashew-nuts",
      description: "White Whole W320 Cashew kernels. Graded meticulously, vacuum packed to protect against insects and moisture.",
      origin: "Goa & Mangalore, India",
      quality_grade: "W320 (300-320 kernels per lb)",
      moq: "1 Metric Ton",
      packaging_type: "10kg Vacuum Pack Tin Boxes / Bags",
      shelf_life: "12 Months in cool dry place",
      export_availability: true,
      base_price_inr: 620000.00,
      price_unit: "Metric Ton",
      primary_image_url: "https://images.unsplash.com/photo-1600189020840-e9a18c4e0103?auto=format&fit=crop&q=80&w=600",
      additional_images: [],
      meta_title: "Premium Cashew Nuts Exporter India - Orbinexglobal",
      meta_description: "White Whole W320 Cashew kernels. Graded meticulously, vacuum packed to protect against insects."
    },
    {
      id: 6,
      category_name: "Packaging Boxes",
      name: "Corrugated Export Boxes",
      slug: "corrugated-export-boxes",
      description: "Custom-built 3-ply and 5-ply heavy duty corrugated cardboard boxes. Ideal for packing fruits and vegetables.",
      origin: "Orbinexglobal packaging division, India",
      quality_grade: "Heavy Duty 150 to 300 GSM kraft paper",
      moq: "5000 Pieces",
      packaging_type: "Strapped bundles of 50 or 100 flat sheets",
      shelf_life: "Indefinite if stored dry",
      export_availability: true,
      base_price_inr: 35.00,
      price_unit: "Piece",
      primary_image_url: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=600",
      additional_images: [],
      meta_title: "Corrugated Export Boxes - Orbinexglobal Packaging",
      meta_description: "Custom-built 3-ply and 5-ply heavy duty corrugated cardboard boxes. Ideal for packing fresh agro exports."
    }
  ],
  countries: [
    { name: "United Arab Emirates (UAE)", country_code: "AE", flag_emoji: "🇦🇪", description: "Primary hub for GCC distribution. Weekly shipments of vegetables and fresh fruits to Dubai." },
    { name: "United States of America (USA)", country_code: "US", flag_emoji: "🇺🇸", description: "Air cargo supply chains for premium dry fruits and specialty mango shipments." },
    { name: "United Kingdom (UK)", country_code: "GB", flag_emoji: "🇬🇧", description: "Daily logistics pipeline serving retail chains and supermarkets in London." },
    { name: "Saudi Arabia", country_code: "SA", flag_emoji: "🇸🇦", description: "Direct sea route supply of red onions, bananas, and corrugated packaging." },
    { name: "Australia", country_code: "AU", flag_emoji: "🇦🇺", description: "Strict phytosanitary standard-compliant organic grains and dry fruit exports." },
    { name: "Germany", country_code: "DE", flag_emoji: "🇩🇪", description: "European hub supplying certified vegetables and eco-friendly carton packaging." }
  ],
  certifications: [
    { name: "APEDA", certificate_authority: "Government Ministry registry certifying compliance of agri exports.", description: "Agricultural & Processed Food Products Export Development Authority of India.", logo_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150" },
    { name: "FSSAI", certificate_authority: "Food Safety and Standards Authority of India License.", description: "Certifies food processing quality and hygienic standards.", logo_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150" },
    { name: "ISO 22000:2018", certificate_authority: "Food Safety Management System Certification.", description: "Global ISO standard for risk assessment and safety protocols.", logo_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150" },
    { name: "HACCP", certificate_authority: "Hazard Analysis Critical Control Point.", description: "Systematic preventive approach to food safety biological hazards.", logo_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150" }
  ],
  testimonials: [
    { author_name: "Farhan Al-Mansoori", company: "Amana Fresh Trading LLC, Dubai", role: "Managing Director", review: "Orbinexglobal has been our primary supplier of Red Onions and Mangoes for 4 years. The quality consistency and cold-chain timing are highly commendable.", rating: 5 },
    { author_name: "Sarah Jenkins", company: "Global Foods Ltd, London", role: "Senior Procurement Specialist", review: "Impressive logistics coordination. Graded cashew nuts arrive vacuum-packed perfectly with complete safety documentation. Highly recommended.", rating: 5 },
    { author_name: "Amit Patel", company: "Patel Brothers Wholesale, Chicago", role: "Operations Manager", review: "We buy custom corrugated boxes and dry fruits in bulk. Outstanding customer service and clear communication throughout the shipping customs process.", rating: 5 }
  ],
  banners: [
    { title: "Premium Indian Agricultural Exporters", subtitle: "Sourcing direct from farms, shipping globally. High-grade Fresh Fruits, Vegetables, and Spices.", link: "/products" },
    { title: "Eco-Friendly B2B Packaging Solutions", subtitle: "High durability custom corrugated and carton boxes designed for sea logistics and cold chains.", link: "/packaging" },
    { title: "Global Export Reach & Logistics", subtitle: "Shipping weekly to GCC, USA, UK, and Europe with full phytosanitary clearance.", link: "/countries" }
  ],
  blogs: [
    { title: "Indian Onion Export Policy: What Importers Need to Know", slug: "indian-onion-export-policy", author: "Rajesh Sharma (Logistics Head)", content: "The agricultural sector in India is experiencing structural growth. Recent regulatory shifts from APEDA have streamlined vegetable sorting and export standards. For international wholesale buyers, India remains a premier hub due to competitive pricing and strong winter crops. Here we break down customs duty frameworks...", created_at: "2026-05-15T12:00:00Z" },
    { title: "Optimizing Packaging for Tropical Fruit Sea Freight", slug: "optimizing-packaging-fruit-freight", author: "Vikram Singh (Managing Director)", content: "Sea freighting fresh fruits like mangoes and pomegranates requires deep understanding of cold chain logistics and packaging engineering. Open-top foam-nested 3-ply kraft boxes prevent bruising and allow cross-ventilation, extending shelf life up to 45 days. In this blog, we review relative humidity and temperature standards...", created_at: "2026-05-20T14:30:00Z" }
  ]
};
