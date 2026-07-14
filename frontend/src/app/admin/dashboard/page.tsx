"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, mockData } from "@/utils/api";
import { 
  LayoutDashboard, ShoppingBag, Inbox, BookOpen, Image, MessageSquare, Award,
  Plus, Edit, Trash2, Mail, Phone, Info, Globe, ShieldAlert, LogOut, CheckCircle2,
  Calendar, User, DollarSign, Star, AlertCircle, Eye, ArrowRight, ShieldCheck, X, ToggleLeft, ToggleRight, Clock
} from "lucide-react";

type TabType = "overview" | "products" | "inquiries" | "blogs" | "banners" | "testimonials" | "certifications";

export default function AdminDashboard() {
  const router = useRouter();
  
  // Auth state
  const [adminUser, setAdminUser] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  // Lists state (with mock fallbacks initialized)
  const [stats, setStats] = useState<any>({
    total_inquiries: 3,
    new_inquiries: 1,
    total_products: 6,
    total_blogs: 2,
    recent_inquiries: []
  });
  const [products, setProducts] = useState<any[]>(mockData.products);
  const [categories, setCategories] = useState<any[]>(mockData.categories);
  const [inquiries, setInquiries] = useState<any[]>([
    { id: 1, full_name: "Farhan Al-Mansoori", email: "farhan@amana.ae", phone: "+971501234567", company: "Amana Fresh LLC", message: "Interested in 15 Metric Tons of Nashik Red Onions under FOB terms. Please share container availability.", target_product: 1, product_name: "Fresh Red Onion", quantity: "15 MT", shipping_terms: "FOB", destination_port: "Jebel Ali, Dubai", status: "new", created_at: new Date().toISOString() },
    { id: 2, full_name: "Sarah Jenkins", email: "sjenkins@globalfoods.uk", phone: "+447911123456", company: "Global Foods Ltd", message: "Need bulk price for W320 Cashew nuts packed in vacuum tins. Destination: London Gateway.", target_product: 5, product_name: "W320 Cashews", quantity: "2 MT", shipping_terms: "CIF", destination_port: "London Gateway", status: "contacted", created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, full_name: "Amit Patel", email: "apatel@patelbro.com", phone: "+17731234567", company: "Patel Brothers", message: "General inquiry for customized corrugated cartons printed with our company branding. MOQ and shipping times.", target_product: 6, product_name: "Corrugated Export Boxes", quantity: "10,000 Pcs", shipping_terms: "FOB", destination_port: "Newark Port", status: "completed", created_at: new Date(Date.now() - 172800000).toISOString() }
  ]);
  const [blogs, setBlogs] = useState<any[]>(mockData.blogs);
  const [banners, setBanners] = useState<any[]>(mockData.banners);
  const [testimonials, setTestimonials] = useState<any[]>(mockData.testimonials);
  const [certifications, setCertifications] = useState<any[]>(mockData.certifications);
  const [countries, setCountries] = useState<any[]>(mockData.countries);

  // Tab State
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [activeModalEntity, setActiveModalEntity] = useState<'product' | 'blog' | 'banner' | 'testimonial' | 'certification'>('product');
  const [editingId, setEditingId] = useState<any>(null);
  
  // Form submission states
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form states
  const [productForm, setProductForm] = useState({
    category: "",
    name: "",
    description: "",
    origin: "India",
    quality_grade: "A Grade (Premium Export Quality)",
    moq: "15 Metric Tons",
    packaging_type: "Mesh Bags / Corrugated Boxes",
    shelf_life: "45 Days",
    base_price_inr: "",
    price_unit: "Metric Ton",
    primary_image_url: ""
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    author: "Orbinexglobal Team",
    banner_image_url: ""
  });

  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    link: "/products",
    active: true,
    display_order: 0
  });

  const [testimonialForm, setTestimonialForm] = useState({
    author_name: "",
    company: "",
    role: "Wholesale Importer",
    review: "",
    rating: 5,
    profile_image_url: "",
    display_order: 0
  });

  const [certificationForm, setCertificationForm] = useState({
    name: "",
    logo_url: "",
    description: "",
    certificate_authority: "",
    display_order: 0
  });

  // Local currency formatter (INR base strictly for Admin back-office desk)
  const formatInrPrice = (price: any, unit: string) => {
    const num = parseFloat(price) || 0;
    return `₹${num.toLocaleString('en-IN')}${unit ? ` per ${unit}` : ""}`;
  };

  // Authenticate user on load
  useEffect(() => {
    const savedToken = localStorage.getItem("orbinex_token");
    const savedUser = localStorage.getItem("orbinex_username");
    
    if (!savedToken) {
      router.push("/admin/login");
    } else {
      setToken(savedToken);
      setAdminUser(savedUser || "Admin");
      setLoading(false);
    }
  }, [router]);

  // Load dashboard data
  useEffect(() => {
    if (loading) return;

    async function loadDashboardData() {
      try {
        const [statsData, inqs, prods, cats, blgs, bnrs, tests, certs, cntrs] = await Promise.all([
          apiFetch("/admin/stats/").catch(() => null),
          apiFetch("/inquiries/").catch(() => null),
          apiFetch("/products/").catch(() => null),
          apiFetch("/categories/").catch(() => null),
          apiFetch("/blogs/").catch(() => null),
          apiFetch("/banners/").catch(() => null),
          apiFetch("/testimonials/").catch(() => null),
          apiFetch("/certifications/").catch(() => null),
          apiFetch("/countries/").catch(() => null),
        ]);
        
        if (statsData) setStats(statsData);
        if (inqs) setInquiries(inqs);
        if (prods) setProducts(prods);
        if (cats) {
          setCategories(cats);
          setProductForm(prev => ({ ...prev, category: cats[0]?.id?.toString() || "" }));
        }
        if (blgs) setBlogs(blgs);
        if (bnrs) setBanners(bnrs);
        if (tests) setTestimonials(tests);
        if (certs) setCertifications(certs);
        if (cntrs) setCountries(cntrs);
      } catch (err) {
        console.log("Error loading dashboard data, using fallback lists:", err);
      }
    }
    loadDashboardData();
  }, [loading]);

  // Toggle/Logout Handlers
  const handleLogout = () => {
    localStorage.removeItem("orbinex_token");
    localStorage.removeItem("orbinex_username");
    router.push("/admin/login");
  };

  const handleUpdateInquiryStatus = async (id: number, newStatus: string) => {
    try {
      await apiFetch(`/inquiries/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    } catch (err) {
      console.log("Offline status update fallback:", id, newStatus);
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry permanently?")) return;
    try {
      await apiFetch(`/inquiries/${id}/`, { method: "DELETE" });
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    } catch (err) {
      console.log("Offline delete inquiry fallback:", id);
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    }
  };

  // Modal Open Forms Reset
  const openAddModal = (entity: typeof activeModalEntity) => {
    setActiveModalEntity(entity);
    setModalMode('add');
    setEditingId(null);
    setErrorMsg("");
    
    if (entity === 'product') {
      setSelectedFile(null);
      setProductForm({
        category: categories[0]?.id?.toString() || "",
        name: "",
        description: "",
        origin: "India",
        quality_grade: "A Grade (Premium Export Quality)",
        moq: "15 Metric Tons",
        packaging_type: "Mesh Bags / Corrugated Boxes",
        shelf_life: "45 Days",
        base_price_inr: "",
        price_unit: "Metric Ton",
        primary_image_url: ""
      });
    } else if (entity === 'blog') {
      setBlogForm({
        title: "",
        content: "",
        author: "Orbinexglobal Team",
        banner_image_url: ""
      });
    } else if (entity === 'banner') {
      setBannerForm({
        title: "",
        subtitle: "",
        image_url: "",
        link: "/products",
        active: true,
        display_order: 0
      });
    } else if (entity === 'testimonial') {
      setTestimonialForm({
        author_name: "",
        company: "",
        role: "Wholesale Importer",
        review: "",
        rating: 5,
        profile_image_url: "",
        display_order: 0
      });
    } else if (entity === 'certification') {
      setCertificationForm({
        name: "",
        logo_url: "",
        description: "",
        certificate_authority: "",
        display_order: 0
      });
    }
    setIsModalOpen(true);
  };

  const openEditModal = (entity: typeof activeModalEntity, item: any) => {
    setActiveModalEntity(entity);
    setModalMode('edit');
    setEditingId(item.id);
    setErrorMsg("");
    
    if (entity === 'product') {
      setSelectedFile(null);
      setProductForm({
        category: (item.category || "").toString(),
        name: item.name || "",
        description: item.description || "",
        origin: item.origin || "India",
        quality_grade: item.quality_grade || "",
        moq: item.moq || "",
        packaging_type: item.packaging_type || "",
        shelf_life: item.shelf_life || "",
        base_price_inr: (item.base_price_inr || "").toString(),
        price_unit: item.price_unit || "Metric Ton",
        primary_image_url: item.primary_image_url || ""
      });
    } else if (entity === 'blog') {
      setBlogForm({
        title: item.title || "",
        content: item.content || "",
        author: item.author || "Orbinexglobal Team",
        banner_image_url: item.banner_image_url || ""
      });
    } else if (entity === 'banner') {
      setBannerForm({
        title: item.title || "",
        subtitle: item.subtitle || "",
        image_url: item.image_url || "",
        link: item.link || "/products",
        active: item.active !== false,
        display_order: Number(item.display_order) || 0
      });
    } else if (entity === 'testimonial') {
      setTestimonialForm({
        author_name: item.author_name || "",
        company: item.company || "",
        role: item.role || "Wholesale Importer",
        review: item.review || "",
        rating: Number(item.rating) || 5,
        profile_image_url: item.profile_image_url || "",
        display_order: Number(item.display_order) || 0
      });
    } else if (entity === 'certification') {
      setCertificationForm({
        name: item.name || "",
        logo_url: item.logo_url || "",
        description: item.description || "",
        certificate_authority: item.certificate_authority || "",
        display_order: Number(item.display_order) || 0
      });
    }
    setIsModalOpen(true);
  };

  // CRUD Delete handlers
  const handleDeleteItem = async (entity: typeof activeModalEntity, id: any, uniqueSlugOrId: any) => {
    if (!confirm(`Are you sure you want to delete this ${entity} item permanently?`)) return;
    try {
      let endpoint = "";
      if (entity === 'product') endpoint = `/products/${uniqueSlugOrId}/`;
      else if (entity === 'blog') endpoint = `/blogs/${uniqueSlugOrId}/`;
      else if (entity === 'banner') endpoint = `/banners/${id}/`;
      else if (entity === 'testimonial') endpoint = `/testimonials/${id}/`;
      else if (entity === 'certification') endpoint = `/certifications/${id}/`;
      
      await apiFetch(endpoint, { method: "DELETE" });
      
      if (entity === 'product') setProducts(prev => prev.filter(p => p.id !== id));
      else if (entity === 'blog') setBlogs(prev => prev.filter(b => b.id !== id));
      else if (entity === 'banner') setBanners(prev => prev.filter(b => b.id !== id));
      else if (entity === 'testimonial') setTestimonials(prev => prev.filter(t => t.id !== id));
      else if (entity === 'certification') setCertifications(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.log(`Failed backend delete, applying offline fallback for ${entity}`);
      if (entity === 'product') setProducts(prev => prev.filter(p => p.id !== id));
      else if (entity === 'blog') setBlogs(prev => prev.filter(b => b.id !== id));
      else if (entity === 'banner') setBanners(prev => prev.filter(b => b.id !== id));
      else if (entity === 'testimonial') setTestimonials(prev => prev.filter(t => t.id !== id));
      else if (entity === 'certification') setCertifications(prev => prev.filter(c => c.id !== id));
    }
  };

  // Unified Form Submission Handler
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    
    try {
      let endpoint = "";
      let method = modalMode === 'add' ? 'POST' : 'PATCH';
      let submitBody: any;
      
      if (activeModalEntity === 'product') {
        // Use POST for both add and edit/update because of the multipart/form-data PATCH limitation in Django
        method = 'POST';
        endpoint = modalMode === 'add' ? '/products/' : `/products/${products.find(p => p.id === editingId)?.slug}/`;
        
        const formData = new FormData();
        formData.append("category", productForm.category);
        formData.append("name", productForm.name);
        formData.append("description", productForm.description);
        formData.append("origin", productForm.origin);
        formData.append("quality_grade", productForm.quality_grade);
        formData.append("moq", productForm.moq);
        formData.append("packaging_type", productForm.packaging_type);
        formData.append("shelf_life", productForm.shelf_life);
        formData.append("base_price_inr", (parseFloat(productForm.base_price_inr) || 0).toString());
        formData.append("price_unit", productForm.price_unit);
        formData.append("primary_image_url", productForm.primary_image_url || "");
        if (selectedFile) {
          formData.append("primary_image", selectedFile);
        }
        submitBody = formData;
      } else {
        let bodyData: any = {};
        if (activeModalEntity === 'blog') {
          endpoint = modalMode === 'add' ? '/blogs/' : `/blogs/${blogs.find(b => b.id === editingId)?.slug}/`;
          bodyData = blogForm;
        } else if (activeModalEntity === 'banner') {
          endpoint = modalMode === 'add' ? '/banners/' : `/banners/${editingId}/`;
          bodyData = { ...bannerForm, display_order: Number(bannerForm.display_order) };
        } else if (activeModalEntity === 'testimonial') {
          endpoint = modalMode === 'add' ? '/testimonials/' : `/testimonials/${editingId}/`;
          bodyData = { ...testimonialForm, rating: Number(testimonialForm.rating), display_order: Number(testimonialForm.display_order) };
        } else if (activeModalEntity === 'certification') {
          endpoint = modalMode === 'add' ? '/certifications/' : `/certifications/${editingId}/`;
          bodyData = { ...certificationForm, display_order: Number(certificationForm.display_order) };
        }
        submitBody = JSON.stringify(bodyData);
      }
      
      const data = await apiFetch(endpoint, {
        method,
        body: submitBody
      });
      
      if (activeModalEntity === 'product') {
        if (modalMode === 'add') setProducts(prev => [data, ...prev]);
        else setProducts(prev => prev.map(p => p.id === editingId ? data : p));
      } else if (activeModalEntity === 'blog') {
        if (modalMode === 'add') setBlogs(prev => [data, ...prev]);
        else setBlogs(prev => prev.map(b => b.id === editingId ? data : b));
      } else if (activeModalEntity === 'banner') {
        if (modalMode === 'add') setBanners(prev => [data, ...prev]);
        else setBanners(prev => prev.map(b => b.id === editingId ? data : b));
      } else if (activeModalEntity === 'testimonial') {
        if (modalMode === 'add') setTestimonials(prev => [data, ...prev]);
        else setTestimonials(prev => prev.map(t => t.id === editingId ? data : t));
      } else if (activeModalEntity === 'certification') {
        if (modalMode === 'add') setCertifications(prev => [data, ...prev]);
        else setCertifications(prev => prev.map(c => c.id === editingId ? data : c));
      }
      
      setIsModalOpen(false);
    } catch (err: any) {
      console.log("Submit failed, using local offline fallback logic:", err);
      // Offline fallback simulations
      if (activeModalEntity === 'product') {
        if (modalMode === 'add') {
          const newId = Math.max(0, ...products.map(p => p.id)) + 1;
          const fallback = {
            ...productForm,
            id: newId,
            slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            category_name: categories.find(c => c.id.toString() === productForm.category)?.name || "Vegetables",
            base_price_inr: parseFloat(productForm.base_price_inr) || 0,
            additional_images: []
          };
          setProducts(prev => [fallback, ...prev]);
        } else {
          setProducts(prev => prev.map(p => p.id === editingId ? {
            ...p,
            ...productForm,
            base_price_inr: parseFloat(productForm.base_price_inr) || 0
          } : p));
        }
      } else if (activeModalEntity === 'blog') {
        if (modalMode === 'add') {
          const newId = Math.max(0, ...blogs.map(b => b.id)) + 1;
          const fallback = {
            ...blogForm,
            id: newId,
            slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          setBlogs(prev => [fallback, ...prev]);
        } else {
          setBlogs(prev => prev.map(b => b.id === editingId ? {
            ...b,
            ...blogForm
          } : b));
        }
      } else if (activeModalEntity === 'banner') {
        if (modalMode === 'add') {
          const newId = Math.max(0, ...banners.map(b => b.id)) + 1;
          const fallback = { ...bannerForm, id: newId };
          setBanners(prev => [fallback, ...prev]);
        } else {
          setBanners(prev => prev.map(b => b.id === editingId ? { ...b, ...bannerForm } : b));
        }
      } else if (activeModalEntity === 'testimonial') {
        if (modalMode === 'add') {
          const newId = Math.max(0, ...testimonials.map(t => t.id)) + 1;
          const fallback = { ...testimonialForm, id: newId };
          setTestimonials(prev => [fallback, ...prev]);
        } else {
          setTestimonials(prev => prev.map(t => t.id === editingId ? { ...t, ...testimonialForm } : t));
        }
      } else if (activeModalEntity === 'certification') {
        if (modalMode === 'add') {
          const newId = Math.max(0, ...certifications.map(c => c.id)) + 1;
          const fallback = { ...certificationForm, id: newId };
          setCertifications(prev => [fallback, ...prev]);
        } else {
          setCertifications(prev => prev.map(c => c.id === editingId ? { ...c, ...certificationForm } : c));
        }
      }
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4 text-xs font-mono">
        <div className="w-12 h-12 rounded-2xl border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <span>Authenticating Dashboard Session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans">
      
      {/* 1. Left Executive Sidebar */}
      <aside className="w-full lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl saffron-gradient flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-orange-500/20">
            R
          </div>
          <div>
            <h2 className="font-extrabold text-sm tracking-wide text-white leading-none">Orbinexglobal</h2>
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Admin Desk v1.1</span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview Desk
          </button>
          
          <div className="pt-4 pb-1 text-[9px] uppercase font-bold text-slate-600 px-4 tracking-widest">
            Manage Catalog
          </div>

          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "products"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Products Catalog
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "inquiries"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4" /> Inquiries Inbox
            </div>
            {inquiries.filter(i => i.status === "new").length > 0 && (
              <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                {inquiries.filter(i => i.status === "new").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "blogs"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Blog Articles
          </button>

          <div className="pt-4 pb-1 text-[9px] uppercase font-bold text-slate-600 px-4 tracking-widest">
            Marketing & Website
          </div>

          <button
            onClick={() => setActiveTab("banners")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "banners"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            <Image className="w-4 h-4" /> Homepage Banners
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "testimonials"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Testimonial Reviews
          </button>

          <button
            onClick={() => setActiveTab("certifications")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "certifications"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            <Award className="w-4 h-4" /> Certifications
          </button>
        </nav>

        {/* Footer Utilities */}
        <div className="p-4 border-t border-slate-800 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Globe className="w-4 h-4" /> View Live Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all text-left"
          >
            <LogOut className="w-4 h-4" /> Sign Out Desk
          </button>
        </div>
      </aside>

      {/* 2. Main Administration Content */}
      <main className="flex-grow flex flex-col min-w-0 bg-slate-950">
        {/* Top Header Bar */}
        <header className="px-8 py-5 border-b border-slate-900 bg-slate-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div>
            <h1 className="text-xl font-extrabold text-white capitalize">{activeTab.replace(/([A-Z])/g, ' $1')} Management</h1>
            <p className="text-[10px] text-slate-500 font-mono mt-1">Logged in as: <span className="text-orange-400 font-bold">{adminUser}</span></p>
          </div>
          
          {/* Top Actions */}
          {activeTab !== "overview" && activeTab !== "inquiries" && (
            <button
              onClick={() => openAddModal(
                activeTab === "products" ? "product" :
                activeTab === "blogs" ? "blog" :
                activeTab === "banners" ? "banner" :
                activeTab === "testimonials" ? "testimonial" : "certification"
              )}
              className="flex items-center gap-2 saffron-gradient hover:shadow-orange-500/10 hover:scale-[1.02] active:scale-[0.98] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" /> Add New Item
            </button>
          )}
        </header>

        {/* Dashboard Panels */}
        <div className="flex-grow p-8 overflow-y-auto">
          
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 max-w-7xl">
              {/* Core Analytics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Inquiries</p>
                    <p className="text-2xl font-extrabold text-white mt-0.5">{inquiries.length}</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">New Inquiries</p>
                    <p className="text-2xl font-extrabold text-white mt-0.5">{inquiries.filter(i => i.status === "new").length}</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Pending</p>
                    <p className="text-2xl font-extrabold text-white mt-0.5">{inquiries.filter(i => i.status === "pending").length}</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Payment Received</p>
                    <p className="text-2xl font-extrabold text-white mt-0.5">{inquiries.filter(i => i.status === "payment_received").length}</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Active Products</p>
                    <p className="text-2xl font-extrabold text-white mt-0.5">{products.length}</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Certifications</p>
                    <p className="text-2xl font-extrabold text-white mt-0.5">{certifications.length}</p>
                  </div>
                </div>
              </div>

              {/* Grid split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Recent Inquiries List */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-sm text-white tracking-wide">Recent Active Inquiries</h3>
                    <button 
                      onClick={() => setActiveTab("inquiries")} 
                      className="text-orange-400 hover:text-orange-300 text-xs font-bold flex items-center gap-1"
                    >
                      View Inbox <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-xs text-white">{inq.full_name}</h4>
                            <span className="text-[10px] text-slate-500">{inq.company || "No Company"} • {inq.email}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${
                            inq.status === 'new' ? 'bg-red-500/5 text-red-400 border-red-500/10' :
                            inq.status === 'contacted' ? 'bg-orange-500/5 text-orange-400 border-orange-500/10' :
                            'bg-green-500/5 text-green-400 border-green-500/10'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 italic">
                          "{inq.message}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Info & Stats */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-extrabold text-sm text-white tracking-wide">System Operations</h3>
                    <div className="space-y-3.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Database Engine</span>
                        <span className="font-mono text-slate-300">SQLite 3</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">REST Framework</span>
                        <span className="font-mono text-slate-300">Django Custom</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">API Connection</span>
                        <span className="font-mono text-green-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span> Live/Ready
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-950 p-4.5 border border-slate-850 rounded-2xl text-center space-y-2">
                    <h4 className="font-bold text-xs text-orange-400">Need to update website?</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Use the sidebar menu to add or edit live products, blogs, slide banners, reviews and corporate certifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRODUCTS */}
          {activeTab === "products" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col group hover:border-slate-700 transition-all duration-300"
                >
                  {/* Image banner */}
                  <div className="h-44 w-full bg-slate-950 relative overflow-hidden shrink-0">
                    <img 
                      src={prod.primary_image_url || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600"} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-850 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-bold text-orange-400 uppercase">
                      {prod.category_name || "Agro Crop"}
                    </div>
                  </div>
                  
                  {/* Content details */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-base text-white tracking-wide">{prod.name}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                        {prod.description}
                      </p>
                      
                      {/* Specifications */}
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2 text-[10px] text-slate-500 font-mono">
                        <div>
                          <span className="block text-slate-600 font-bold uppercase text-[8px]">Origin</span>
                          {prod.origin.split(",")[0]}
                        </div>
                        <div>
                          <span className="block text-slate-600 font-bold uppercase text-[8px]">MOQ</span>
                          {prod.moq}
                        </div>
                        <div>
                          <span className="block text-slate-600 font-bold uppercase text-[8px]">Shelf Life</span>
                          {prod.shelf_life}
                        </div>
                        <div>
                          <span className="block text-slate-600 font-bold uppercase text-[8px]">Unit Price</span>
                          <span className="text-orange-400 font-bold">{formatInrPrice(prod.base_price_inr, prod.price_unit)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions panel */}
                    <div className="flex gap-3 pt-4 border-t border-slate-800/80">
                      <button
                        onClick={() => openEditModal('product', prod)}
                        className="flex-grow flex items-center justify-center gap-1.5 border border-slate-800 bg-slate-900 hover:bg-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 py-2.5 rounded-xl transition-all"
                      >
                        <Edit className="w-3.5 h-3.5 text-slate-400" /> Edit Specs
                      </button>
                      <button
                        onClick={() => handleDeleteItem('product', prod.id, prod.slug)}
                        className="px-3 flex items-center justify-center border border-transparent bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 py-2.5 rounded-xl transition-all"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm max-w-7xl">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold font-mono">
                      <th className="px-6 py-4">Sender / Company</th>
                      <th className="px-6 py-4">Product Details</th>
                      <th className="px-6 py-4">Quantity / Terms</th>
                      <th className="px-6 py-4">Destination Port</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-950/20 transition-colors">
                        {/* Name & Contact */}
                        <td className="px-6 py-4 space-y-1">
                          <p className="font-extrabold text-white text-xs">{inq.full_name}</p>
                          <p className="text-[10px] text-slate-500 font-bold">{inq.company || "General Inquiry"}</p>
                          <div className="flex flex-col gap-0.5 text-[10px] text-slate-400 pt-1 font-mono">
                            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-500" /> {inq.email}</span>
                            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-500" /> {inq.phone}</span>
                          </div>
                        </td>
                        {/* Message & Product */}
                        <td className="px-6 py-4 space-y-1.5 w-1/3">
                          <p className="font-extrabold text-orange-400 text-[10px] uppercase font-mono tracking-wider">{inq.product_name || "General Business Inquiry"}</p>
                          <p className="text-slate-400 text-xs leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-850/65 font-mono max-h-24 overflow-y-auto whitespace-pre-wrap">
                            {inq.message}
                          </p>
                        </td>
                        {/* Quantity & Terms */}
                        <td className="px-6 py-4 font-bold font-mono">
                          <p className="text-white text-xs">{inq.quantity || "Not specified"}</p>
                          <span className="text-[9px] font-bold text-green-400 bg-green-500/5 border border-green-500/10 px-2 py-0.5 rounded uppercase mt-1.5 inline-block">
                            {inq.shipping_terms || "N/A"}
                          </span>
                        </td>
                        {/* Destination Port */}
                        <td className="px-6 py-4 text-slate-400 font-medium font-mono">
                          {inq.destination_port || "N/A"}
                        </td>
                        {/* Status */}
                        <td className="px-6 py-4">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border bg-slate-950 focus:outline-none cursor-pointer font-mono ${
                              inq.status === "new"
                                ? "text-red-400 border-red-500/20"
                                : inq.status === "contacted"
                                ? "text-orange-400 border-orange-500/20"
                                : inq.status === "pending"
                                ? "text-yellow-400 border-yellow-500/20"
                                : inq.status === "payment_received"
                                ? "text-emerald-400 border-emerald-500/20"
                                : "text-green-400 border-green-500/20"
                            }`}
                          >
                            <option value="new">New/Unread</option>
                            <option value="contacted">Contacted</option>
                            <option value="pending">Pending</option>
                            <option value="payment_received">Payment Received</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        {/* Actions */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-lg border border-transparent hover:border-red-950/20 hover:bg-red-950/10"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-slate-500 font-mono text-xs">
                          No wholesale inquiries registered in database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: BLOGS */}
          {activeTab === "blogs" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col group hover:border-slate-700 transition-all duration-300"
                >
                  <div className="h-40 w-full bg-slate-950 relative overflow-hidden shrink-0">
                    <img 
                      src={b.banner_image_url || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"} 
                      alt={b.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-sm text-white tracking-wide line-clamp-2 leading-snug">{b.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                        {b.content}
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 font-mono border-t border-slate-850/50">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {b.author}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(b.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-3">
                      <button
                        onClick={() => openEditModal('blog', b)}
                        className="flex-grow flex items-center justify-center gap-1.5 border border-slate-850 bg-slate-950 hover:bg-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 py-2.5 rounded-xl transition-all"
                      >
                        <Edit className="w-3.5 h-3.5 text-slate-400" /> Edit Article
                      </button>
                      <button
                        onClick={() => handleDeleteItem('blog', b.id, b.slug)}
                        className="px-3 flex items-center justify-center border border-transparent bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 py-2.5 rounded-xl transition-all"
                        title="Delete Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: BANNERS */}
          {activeTab === "banners" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
              {banners.map((slide) => (
                <div
                  key={slide.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col group hover:border-slate-700 transition-all duration-300"
                >
                  <div className="h-36 w-full bg-slate-950 relative overflow-hidden shrink-0">
                    <img 
                      src={slide.image_url || "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=600"} 
                      alt={slide.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className={`absolute top-3 right-3 border backdrop-blur px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase font-mono ${
                      slide.active !== false 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-slate-900/90 text-slate-500 border-slate-800'
                    }`}>
                      {slide.active !== false ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm text-white tracking-wide line-clamp-1">{slide.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {slide.subtitle}
                      </p>
                      <div className="text-[10px] text-slate-500 font-mono space-y-0.5 pt-2">
                        <p>Link: <span className="text-orange-400 font-bold">{slide.link}</span></p>
                        <p>Display Order: <span className="text-white font-bold">{slide.display_order || 0}</span></p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-3 border-t border-slate-850/50">
                      <button
                        onClick={() => openEditModal('banner', slide)}
                        className="flex-grow flex items-center justify-center gap-1.5 border border-slate-850 bg-slate-950 hover:bg-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 py-2.5 rounded-xl transition-all"
                      >
                        <Edit className="w-3.5 h-3.5 text-slate-400" /> Edit Slide
                      </button>
                      <button
                        onClick={() => handleDeleteItem('banner', slide.id, slide.id)}
                        className="px-3 flex items-center justify-center border border-transparent bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 py-2.5 rounded-xl transition-all"
                        title="Delete Banner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all duration-300"
                >
                  <div className="space-y-3">
                    {/* Rating stars */}
                    <div className="flex gap-1 text-orange-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < test.rating ? 'fill-orange-500' : 'text-slate-700'}`} />
                      ))}
                    </div>
                    
                    <p className="text-slate-300 text-xs leading-relaxed italic">
                      "{test.review}"
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Author metadata */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-850/50">
                      <div className="w-10 h-10 rounded-full bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                        <img 
                          src={test.profile_image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"} 
                          alt={test.author_name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-white leading-none">{test.author_name}</h4>
                        <span className="text-[9px] text-slate-500 mt-1 block">{test.role} • {test.company}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal('testimonial', test)}
                        className="flex-grow flex items-center justify-center gap-1.5 border border-slate-850 bg-slate-950 hover:bg-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 py-2.5 rounded-xl transition-all"
                      >
                        <Edit className="w-3.5 h-3.5 text-slate-400" /> Edit Review
                      </button>
                      <button
                        onClick={() => handleDeleteItem('testimonial', test.id, test.id)}
                        className="px-3 flex items-center justify-center border border-transparent bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 py-2.5 rounded-xl transition-all"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: CERTIFICATIONS */}
          {activeTab === "certifications" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-4 hover:border-slate-700 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800 flex items-center justify-center text-slate-500">
                    {cert.logo_url ? (
                      <img src={cert.logo_url} alt={cert.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                    ) : (
                      <Award className="w-8 h-8 text-orange-500/70" />
                    )}
                  </div>
                  
                  <div className="space-y-1 flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-extrabold text-xs text-white truncate">{cert.name}</h4>
                      <span className="text-[8px] font-mono font-bold text-slate-600">Order: {cert.display_order || 0}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">{cert.certificate_authority}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-1 italic">{cert.description}</p>
                    
                    <div className="flex gap-2 pt-2.5">
                      <button
                        onClick={() => openEditModal('certification', cert)}
                        className="flex-grow flex items-center justify-center gap-1 border border-slate-850 bg-slate-950 hover:bg-slate-800 hover:text-white text-[10px] font-bold text-slate-400 py-1.5 rounded-lg transition-all"
                      >
                        <Edit className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem('certification', cert.id, cert.id)}
                        className="px-2 flex items-center justify-center border border-transparent bg-red-950/20 hover:bg-red-900/30 text-red-400 py-1.5 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* 3. CRUD Dialog Form Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
              <div>
                <h3 className="font-extrabold text-sm text-white capitalize">
                  {modalMode} {activeModalEntity} Details
                </h3>
                <p className="text-[10px] text-slate-500">Provide fields to update live Orbinexglobal site configuration.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg border border-transparent hover:border-slate-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Scrollable Form */}
            <form onSubmit={handleSubmitForm} className="flex-grow overflow-y-auto p-6 space-y-4 text-xs text-slate-300">
              
              {/* FORM: PRODUCT */}
              {activeModalEntity === 'product' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Category *</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Product Name *</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Description *</label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      required
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Origin *</label>
                      <input
                        type="text"
                        value={productForm.origin}
                        onChange={(e) => setProductForm({ ...productForm, origin: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Quality Grade *</label>
                      <input
                        type="text"
                        value={productForm.quality_grade}
                        onChange={(e) => setProductForm({ ...productForm, quality_grade: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">MOQ *</label>
                      <input
                        type="text"
                        value={productForm.moq}
                        onChange={(e) => setProductForm({ ...productForm, moq: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Packaging Type *</label>
                      <input
                        type="text"
                        value={productForm.packaging_type}
                        onChange={(e) => setProductForm({ ...productForm, packaging_type: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Shelf Life *</label>
                      <input
                        type="text"
                        value={productForm.shelf_life}
                        onChange={(e) => setProductForm({ ...productForm, shelf_life: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Price (INR) *</label>
                        <input
                          type="number"
                          value={productForm.base_price_inr}
                          onChange={(e) => setProductForm({ ...productForm, base_price_inr: e.target.value })}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Price Unit *</label>
                        <input
                          type="text"
                          value={productForm.price_unit}
                          onChange={(e) => setProductForm({ ...productForm, price_unit: e.target.value })}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Upload Primary Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setSelectedFile(file);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">OR Primary Image URL</label>
                      <input
                        type="url"
                        value={productForm.primary_image_url}
                        onChange={(e) => setProductForm({ ...productForm, primary_image_url: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* FORM: BLOG */}
              {activeModalEntity === 'blog' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Title *</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Author *</label>
                      <input
                        type="text"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Content *</label>
                    <textarea
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      required
                      rows={8}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Banner Image URL</label>
                    <input
                      type="url"
                      value={blogForm.banner_image_url}
                      onChange={(e) => setBlogForm({ ...blogForm, banner_image_url: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* FORM: BANNER */}
              {activeModalEntity === 'banner' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Title *</label>
                      <input
                        type="text"
                        value={bannerForm.title}
                        onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Subtitle</label>
                      <input
                        type="text"
                        value={bannerForm.subtitle}
                        onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Action Link *</label>
                      <input
                        type="text"
                        value={bannerForm.link}
                        onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Display Order</label>
                      <input
                        type="number"
                        value={bannerForm.display_order}
                        onChange={(e) => setBannerForm({ ...bannerForm, display_order: Number(e.target.value) })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Banner Image URL</label>
                    <input
                      type="url"
                      value={bannerForm.image_url}
                      onChange={(e) => setBannerForm({ ...bannerForm, image_url: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setBannerForm({ ...bannerForm, active: !bannerForm.active })}
                      className="text-slate-400 hover:text-white"
                    >
                      {bannerForm.active ? <ToggleRight className="w-8 h-8 text-orange-500" /> : <ToggleLeft className="w-8 h-8 text-slate-600" />}
                    </button>
                    <div>
                      <p className="font-bold text-xs">Banner Visibility</p>
                      <p className="text-[10px] text-slate-500">Toggle whether this slide is displayed on homepage slider.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* FORM: TESTIMONIAL */}
              {activeModalEntity === 'testimonial' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Author Name *</label>
                      <input
                        type="text"
                        value={testimonialForm.author_name}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, author_name: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Company / Region *</label>
                      <input
                        type="text"
                        value={testimonialForm.company}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Role *</label>
                      <input
                        type="text"
                        value={testimonialForm.role}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Rating (1 to 5) *</label>
                      <select
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      >
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Display Order</label>
                      <input
                        type="number"
                        value={testimonialForm.display_order}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, display_order: Number(e.target.value) })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Review Message *</label>
                    <textarea
                      value={testimonialForm.review}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })}
                      required
                      rows={4}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Profile Image URL</label>
                    <input
                      type="url"
                      value={testimonialForm.profile_image_url}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, profile_image_url: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* FORM: CERTIFICATION */}
              {activeModalEntity === 'certification' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Certificate Name *</label>
                      <input
                        type="text"
                        value={certificationForm.name}
                        onChange={(e) => setCertificationForm({ ...certificationForm, name: e.target.value })}
                        required
                        placeholder="e.g. APEDA Certified"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Certificate Authority *</label>
                      <input
                        type="text"
                        value={certificationForm.certificate_authority}
                        onChange={(e) => setCertificationForm({ ...certificationForm, certificate_authority: e.target.value })}
                        required
                        placeholder="e.g. Ministry of Commerce, India"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Description</label>
                      <input
                        type="text"
                        value={certificationForm.description}
                        onChange={(e) => setCertificationForm({ ...certificationForm, description: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Display Order</label>
                      <input
                        type="number"
                        value={certificationForm.display_order}
                        onChange={(e) => setCertificationForm({ ...certificationForm, display_order: Number(e.target.value) })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Authority Logo URL</label>
                    <input
                      type="url"
                      value={certificationForm.logo_url}
                      onChange={(e) => setCertificationForm({ ...certificationForm, logo_url: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Error log displaying */}
              {errorMsg && (
                <div className="flex gap-2 p-3 bg-red-500/5 border border-red-500/20 text-red-400 text-xs rounded-xl items-center">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Actions submit */}
              <div className="pt-4 border-t border-slate-850 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 saffron-gradient text-white font-bold rounded-xl transition-all shadow-md shadow-orange-500/5 active:scale-95"
                >
                  {submitting ? "Saving specs..." : "Save Details"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
