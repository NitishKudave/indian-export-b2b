"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, ShieldAlert } from "lucide-react";
import { apiFetch } from "@/utils/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      // 1. Save to database via backend API
      await apiFetch("/inquiries/", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          message: `[Contact Form Message]\n${formData.message}`,
        }),
      });

      // 2. Send email notification via Web3Forms directly from the browser (bypasses Cloudflare bot-protection)
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "8ab4fb79-a9d1-4c24-8a55-b0eb1e07be16",
            subject: `New B2B Inquiry: ${formData.company || formData.full_name}`,
            from_name: "Orbinex B2B Portal",
            "Client Name": formData.full_name,
            "Email Address": formData.email,
            "Phone Number": formData.phone,
            "Company Name": formData.company || "Not Provided",
            "Inquiry Message": formData.message,
          }),
        });
      } catch (emailErr) {
        console.error("Web3Forms email delivery failed:", emailErr);
        // We don't throw here, since the inquiry was saved to the DB successfully.
      }

      setStatus("success");
      setStatusMessage("Your message has been sent. Our team will get back to you shortly.");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (err: any) {
      setStatus("error");
      setStatusMessage(err.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Banner */}
      <section className="relative h-80 bg-slate-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90" />
        <div className="relative text-center text-white space-y-3 z-10 max-w-2xl px-4">
          <h1 className="text-4xl font-extrabold tracking-wide sm:text-5xl">Contact Trade Desk</h1>
          <p className="text-slate-300 text-sm">
            Reach out directly for general business queries, farm partner network details, or careers.
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">Corporate Offices</h3>
            
            <ul className="space-y-6 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">Headquarters (Nashik)</p>
                  <p>Plot No. 45, Agro Processing Zone, MIDC Area, Nashik - 422010, Maharashtra, India</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">Phone Enquiries</p>
                  <p>General desk: +91 253 245 6789</p>
                  <p>WhatsApp Trade: +91 98765 43210</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">Emails</p>
                  <p>Agro Sales: trade@orbinexglobal.com</p>
                  <p>Support desk: info@orbinexglobal.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Form panel */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">Send a General Message</h3>
          
          <form onSubmit={handleFormSubmit} className="space-y-4 text-slate-700 dark:text-slate-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="ct_full_name" className="text-xs font-semibold text-slate-400">Full Name *</label>
                <input
                  id="ct_full_name"
                  type="text"
                  name="full_name"
                  autoComplete="name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="ct_email" className="text-xs font-semibold text-slate-400">Email Address *</label>
                <input
                  id="ct_email"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="ct_phone" className="text-xs font-semibold text-slate-400">Phone Number *</label>
                <input
                  id="ct_phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="ct_company" className="text-xs font-semibold text-slate-400">Company Name</label>
                <input
                  id="ct_company"
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="ct_message" className="text-xs font-semibold text-slate-400">Message *</label>
              <textarea
                id="ct_message"
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full saffron-gradient hover:shadow-orange-500/10 active:scale-95 transition-all text-white font-bold py-3.5 rounded-lg text-xs tracking-wider"
            >
              {status === "submitting" ? "SENDING MESSAGE..." : "SEND MESSAGE"}
            </button>

            {status === "success" && (
              <p className="text-green-500 text-xs font-medium bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                {statusMessage}
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-xs font-medium bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
