"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="admin-panel min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    );
  }

  return (
    <CurrencyProvider>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
    </CurrencyProvider>
  );
}
