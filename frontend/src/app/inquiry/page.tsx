"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { apiFetch, mockData } from "@/utils/api";
import { FileSpreadsheet, Ship, FileCheck, ClipboardEdit } from "lucide-react";

function InquiryContent() {
  const searchParams = useSearchParams();
  const preSelectedProduct = searchParams.get("product") || "";

  const [products, setProducts] = useState(mockData.products);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    target_product: preSelectedProduct,
    quantity: "",
    shipping_terms: "FOB",
    destination_port: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    // Sync preSelectedProduct when search params load
    setFormData((prev) => ({
      ...prev,
      target_product: searchParams.get("product") || "",
    }));
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const prods = await apiFetch("/products/");
        if (prods && prods.length) setProducts(prods);
      } catch (err) {
        console.log("Using local mock products in RFQ form:", err);
      }
    }
    loadProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await apiFetch("/inquiries/", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setStatus("success");
      setStatusMessage("Thank you! Your quotation request has been sent to our export desk. We will respond with pricing within 12 hours.");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        target_product: "",
        quantity: "",
        shipping_terms: "FOB",
        destination_port: "",
      });
    } catch (err: any) {
      setStatus("error");
      setStatusMessage(err.message || "Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-wide">
          B2B Request For Quotation (RFQ)
        </h1>
        <p className="text-slate-500 text-xs max-w-2xl mx-auto">
          Please fill out the form below with your specific crop specifications, sizing criteria, required packing boxes, and port destination.
        </p>
      </div>

      {/* Main card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
        {/* visual list */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600"><FileCheck className="w-4 h-4" /></div>
            <span>Custom size sizing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600"><Ship className="w-4 h-4" /></div>
            <span>CIF / FOB shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600"><ClipboardEdit className="w-4 h-4" /></div>
            <span>Response in 12 hours</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-6 text-slate-700 dark:text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Full Name *</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Business Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Phone Number (with Code) *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Target Product Division</label>
              <select
                name="target_product"
                value={formData.target_product}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              >
                <option value="">General Trade Inquiry / Custom Request</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Origin: {p.origin.split(",")[0]})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Estimated Quantity *</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                placeholder="e.g. 25 Metric Tons"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Trade Incoterms</label>
              <select
                name="shipping_terms"
                value={formData.shipping_terms}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              >
                <option value="FOB">FOB (Free on Board - Port of Nhava Sheva/Mumbai)</option>
                <option value="CIF">CIF (Cost, Insurance, Freight - Your Port)</option>
                <option value="CNF">CNF / CFR (Cost and Freight)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Destination Port</label>
              <input
                type="text"
                name="destination_port"
                value={formData.destination_port}
                onChange={handleInputChange}
                placeholder="e.g. Port of Rotterdam, Netherlands"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">Detailed Crop Specifications / Size Sizing Requirements</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Please describe size diameter (e.g. 55mm+ onion), packaging requirements (e.g. 25kg mesh bag / custom corrugated carton), specific delivery month, and required phytosanitary certificates..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full saffron-gradient hover:shadow-orange-500/10 active:scale-95 transition-all text-white font-bold py-3.5 rounded-lg text-xs tracking-wider"
          >
            {status === "submitting" ? "SENDING RFQ..." : "SUBMIT FORM TO EXPORT DESK"}
          </button>

          {status === "success" && (
            <p className="text-green-500 text-xs font-medium bg-green-500/5 border border-green-500/20 p-3.5 rounded-lg">
              {statusMessage}
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-xs font-medium bg-red-500/5 border border-red-500/20 p-3.5 rounded-lg">
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default function Inquiry() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs text-slate-400">Loading RFQ Form...</div>}>
      <InquiryContent />
    </Suspense>
  );
}
