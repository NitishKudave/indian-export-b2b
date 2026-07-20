"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { apiFetch, mockData } from "@/utils/api";
import { FileSpreadsheet, Ship, FileCheck, ClipboardEdit } from "lucide-react";

function InquiryContent() {
  const searchParams = useSearchParams();
  const preSelectedProduct = searchParams.get("product") || "";
  const inquiryType = searchParams.get("type") || "general";

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
      // 1. Save to database via backend API (optional fallback)
      try {
        await apiFetch("/inquiries/", {
          method: "POST",
          body: JSON.stringify(formData),
        });
      } catch (dbErr) {
        console.warn("Backend save failed. Proceeding to email delivery.", dbErr);
      }

      // 2. Send email notification via Web3Forms directly from the browser
      try {
        const productName = products.find(p => p.id.toString() === formData.target_product.toString())?.name || "General Request";
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "8ab4fb79-a9d1-4c24-8a55-b0eb1e07be16",
            subject: `New B2B RFQ: ${formData.company || formData.full_name}`,
            from_name: "Orbinex B2B Portal",
            "Client Name": formData.full_name,
            "Email Address": formData.email,
            "Phone Number": formData.phone,
            "Company Name": formData.company || "Not Provided",
            "Target Product": productName,
            "Estimated Quantity": formData.quantity,
            "Shipping Terms": formData.shipping_terms,
            "Destination Port": formData.destination_port || "Not Provided",
            "Detailed Specifications": formData.message,
          }),
        });
      } catch (emailErr) {
        console.error("Web3Forms email delivery failed:", emailErr);
      }

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
          {inquiryType === "packaging" ? "Packaging Request For Quotation (RFQ)" : "B2B Request For Quotation (RFQ)"}
        </h1>
        <p className="text-slate-500 text-xs max-w-2xl mx-auto">
          {inquiryType === "packaging" 
            ? "Please fill out the form below with your specific packaging requirements, box dimensions, printing details, and delivery destination."
            : "Please fill out the form below with your specific crop specifications, sizing criteria, required packing boxes, and port destination."}
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
              <label htmlFor="inq_full_name" className="text-xs font-bold text-slate-400">Full Name *</label>
              <input
                id="inq_full_name"
                type="text"
                name="full_name"
                autoComplete="name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="inq_email" className="text-xs font-bold text-slate-400">Business Email *</label>
              <input
                id="inq_email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label htmlFor="inq_phone" className="text-xs font-bold text-slate-400">Phone Number (with Code) *</label>
              <input
                id="inq_phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="inq_company" className="text-xs font-bold text-slate-400">Company Name</label>
              <input
                id="inq_company"
                type="text"
                name="company"
                autoComplete="organization"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="inq_target_product" className="text-xs font-bold text-slate-400">Target Product Division</label>
              <select
                id="inq_target_product"
                name="target_product"
                autoComplete="off"
                value={formData.target_product}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              >
                <option value="">{inquiryType === "packaging" ? "Custom Packaging Request" : "General Trade Inquiry / Custom Request"}</option>
                {products
                  .filter((p) => inquiryType !== "packaging" || p.category_name?.toLowerCase().includes("packaging") || p.name.toLowerCase().includes("packaging") || p.name.toLowerCase().includes("box"))
                  .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Origin: {p.origin?.split(",")[0] || "N/A"})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="inq_quantity" className="text-xs font-bold text-slate-400">Estimated Quantity *</label>
              <input
                id="inq_quantity"
                type="text"
                name="quantity"
                autoComplete="off"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                placeholder="e.g. 25 Metric Tons"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {inquiryType === "packaging" ? (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label htmlFor="inq_destination_port" className="text-xs font-bold text-slate-400">Destination</label>
                <input
                  id="inq_destination_port"
                  type="text"
                  name="destination_port"
                  autoComplete="off"
                  value={formData.destination_port}
                  onChange={handleInputChange}
                  placeholder="e.g. Mumbai, Maharashtra or Rotterdam, Netherlands"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-300 text-[11px] leading-relaxed space-y-4">
                <h3 className="text-orange-500 font-bold text-sm">Payment Terms – Corrugated Boxes (Domestic & Export Quality)</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-white mb-1.5">Domestic Orders (India):</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>100% Advance Payment for first-time orders.</li>
                      <li>50% Advance, 50% Before Dispatch (most common).</li>
                      <li>30 Days Credit for approved and regular customers.</li>
                      <li>Payment against GST Invoice.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1.5">Export Quality Corrugated Boxes:</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>50% Advance, 50% Before Shipment (recommended for custom-printed boxes).</li>
                      <li>100% Advance for new customers or small orders.</li>
                      <li>For large orders (subject to mutual agreement): 30% Advance, 70% Before Dispatch, or 30–60 Days Credit for long-term business partners.</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h4 className="font-bold text-white mb-1.5">Recommended Payment Terms for ORBINEX GLOBAL</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong className="text-slate-200">First Order:</strong> 50% Advance, 50% Before Dispatch.</li>
                    <li><strong className="text-slate-200">Repeat Orders:</strong> 30% Advance, 70% Within 15 Days of Delivery (subject to mutual agreement).</li>
                    <li>Payments to be made via Bank Transfer (NEFT/RTGS/SWIFT).</li>
                    <li>GST Invoice (for domestic orders) or Commercial Invoice (for export orders) will be provided.</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label htmlFor="inq_shipping_terms" className="text-xs font-bold text-slate-400">Trade Incoterms</label>
                <select
                  id="inq_shipping_terms"
                  name="shipping_terms"
                  autoComplete="off"
                  value={formData.shipping_terms}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="EXW">EXW (Ex Works)</option>
                  <option value="FOB">FOB (Free On Board)</option>
                  <option value="CFR">CFR (Cost & Freight)</option>
                  <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                  <option value="DAP">DAP (Delivered At Place)</option>
                  <option value="DDP">DDP (Delivered Duty Paid)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="inq_destination_port" className="text-xs font-bold text-slate-400">Destination Port</label>
                <input
                  id="inq_destination_port"
                  type="text"
                  name="destination_port"
                  autoComplete="off"
                  value={formData.destination_port}
                  onChange={handleInputChange}
                  placeholder="e.g. Port of Rotterdam, Netherlands"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="inq_message" className="text-xs font-bold text-slate-400">
              {inquiryType === "packaging" ? "Detailed Packaging Specifications / Dimensions Requirements" : "Detailed Crop Specifications / Size Sizing Requirements"}
            </label>
            <textarea
              id="inq_message"
              name="message"
              autoComplete="off"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder={inquiryType === "packaging" 
                ? "Please describe exact box dimensions, ply requirements (e.g. 3-ply, 5-ply), print/color details, branding requirements, and delivery timeline..." 
                : "Please describe size diameter (e.g. 55mm+ onion), packaging requirements (e.g. 25kg mesh bag / custom corrugated carton), specific delivery month, and required phytosanitary certificates..."}
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
