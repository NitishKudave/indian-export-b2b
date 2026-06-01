"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import { apiFetch, mockData } from "@/utils/api";
import { ShieldCheck, ArrowLeft, Send, PhoneCall, AlertCircle, Box, MapPin, Truck } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetail(props: PageProps) {
  const resolvedParams = React.use(props.params);
  const slug = resolvedParams.slug;

  const { formatPrice } = useCurrency();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  // Inquiry Form State
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    quantity: "",
    shipping_terms: "FOB",
    destination_port: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const prod = await apiFetch(`/products/${slug}/`);
        if (prod) {
          setProduct(prod);
          setSelectedImage(prod.primary_image_url || "/placeholder-crop.jpg");
        }
      } catch (err) {
        console.log("Looking up local fallback for:", slug);
        const fallback = mockData.products.find((p) => p.slug === slug);
        if (fallback) {
          setProduct(fallback);
          setSelectedImage(fallback.primary_image_url || "/placeholder-crop.jpg");
        }
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    setFormStatus("submitting");
    try {
      await apiFetch("/inquiries/", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          target_product: product.id,
          message: `${formData.message}\n[RFQ sent from detail page for ${product.name}]`,
        }),
      });
      setFormStatus("success");
      setFormMessage("Thank you! Your quotation request has been sent to our export desk.");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        quantity: "",
        shipping_terms: "FOB",
        destination_port: "",
      });
    } catch (err: any) {
      setFormStatus("error");
      setFormMessage(err.message || "Failed to send request. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-slate-400">
        Retrieving product technical sheet...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-orange-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Product not found</h2>
        <Link href="/products" className="text-orange-500 hover:underline text-sm font-semibold flex items-center gap-1 justify-center">
          <ArrowLeft className="w-4 h-4" /> Return to catalog
        </Link>
      </div>
    );
  }

  const allImages = [
    product.primary_image_url || "/placeholder-crop.jpg",
    ...(product.additional_images || [])
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Back button */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-orange-500 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO EXPORT CATALOG
        </Link>
      </div>

      {/* Main product visual & details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Images */}
        <div className="space-y-4">
          <div className="h-96 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all"
            />
          </div>
          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 ${
                    selectedImage === img ? "border-orange-500" : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Specs & Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-green-600 dark:text-green-400 font-bold">
              {product.category_name}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-slate-500 text-xs leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Reference Price */}
          <div className="bg-slate-100 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Estimated Reference Price</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {formatPrice(product.base_price_inr, product.price_unit)}
              </p>
            </div>
            <span className="text-[10px] text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
              Terms: FOB India Ports
            </span>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Technical Specifications</h3>
            <div className="border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-3 bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 w-1/3">Origin</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-semibold">{product.origin}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-3 bg-slate-50 dark:bg-slate-950 font-bold text-slate-500">Quality Grade</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-semibold">{product.quality_grade}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-3 bg-slate-50 dark:bg-slate-950 font-bold text-slate-500">Minimum Order (MOQ)</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-semibold">{product.moq}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-3 bg-slate-50 dark:bg-slate-950 font-bold text-slate-500">Packaging Type</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-semibold">{product.packaging_type}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-3 bg-slate-50 dark:bg-slate-950 font-bold text-slate-500">Estimated Shelf Life</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-semibold">{product.shelf_life}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-slate-50 dark:bg-slate-950 font-bold text-slate-500">Export Availability</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-semibold">
                      {product.export_availability ? (
                        <span className="text-green-500 font-bold">● Active/Available</span>
                      ) : (
                        <span className="text-red-500 font-bold">● Seasonal Out of Stock</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* RFQ form container */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 p-8 sm:p-12 hero-gradient text-white flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-orange-400 text-xs font-extrabold tracking-widest uppercase block">
              B2B SPECIFIC RFQ
            </span>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Get Quotation for {product.name}
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              Submit your specific sizing, grading, custom box printing, and destination port criteria. Our trade desk will respond with custom pricing tables (FOB India or CIF your destination port).
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-orange-400" />
              <span>SGS/Phytosanitary inspection provided.</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Origin: Nhava Sheva (Mumbai) Port exports.</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-400" />
              <span>Full cold chain transport mapping.</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-8 sm:p-12 bg-slate-950 text-slate-300">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Business Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Quantity Required *</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  placeholder={`MOQ: ${product.moq.split(" ")[0]}`}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Trade Terms</label>
                <select
                  name="shipping_terms"
                  value={formData.shipping_terms}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="FOB">FOB (Free on Board)</option>
                  <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                  <option value="CNF">C&F (Cost & Freight)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Destination Port</label>
                <input
                  type="text"
                  name="destination_port"
                  value={formData.destination_port}
                  onChange={handleInputChange}
                  placeholder="e.g. Jebel Ali, Dubai"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Sizing/Grading Specs</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="Include custom instructions e.g. 'nashik red onion 45mm+ size packed in 25kg mesh bags...'"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full saffron-gradient hover:shadow-orange-500/10 active:scale-95 transition-all text-white font-bold py-3.5 rounded-lg text-xs tracking-wider"
            >
              {formStatus === "submitting" ? "SENDING REQUEST..." : "SUBMIT SPECIFIC RFQ"}
            </button>

            {formStatus === "success" && (
              <p className="text-green-400 text-xs font-medium bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                {formMessage}
              </p>
            )}
            {formStatus === "error" && (
              <p className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                {formMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
