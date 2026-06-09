"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "INR" | "USD" | "EUR" | "AED" | "GBP" | "SAR" | "RUB" | "AUD" | "CAD" | "SGD" | "JPY" | "CNY" | "ZAR" | "MYR" | "THB";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInr: number, unit?: string) => string;
}

const rates: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,    // 1 INR = 0.012 USD (Approx 83 INR/USD)
  EUR: 0.011,    // 1 INR = 0.011 EUR (Approx 90 INR/EUR)
  AED: 0.044,    // 1 INR = 0.044 AED (Approx 22.6 INR/AED)
  GBP: 0.0094,   // 1 INR = 0.0094 GBP (Approx 106 INR/GBP)
  SAR: 0.045,    // 1 INR = 0.045 SAR (Approx 22.2 INR/SAR)
  RUB: 1.08,     // 1 INR = 1.08 RUB (Approx 0.92 INR/RUB)
  AUD: 0.018,
  CAD: 0.016,
  SGD: 0.016,
  JPY: 1.88,
  CNY: 0.086,
  ZAR: 0.22,
  MYR: 0.056,
  THB: 0.44,
};

const symbols: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  AED: "AED ",
  GBP: "£",
  SAR: "SAR ",
  RUB: "₽",
  AUD: "A$",
  CAD: "C$",
  SGD: "S$",
  JPY: "¥",
  CNY: "¥",
  ZAR: "R ",
  MYR: "RM ",
  THB: "฿",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("orbinex_currency") as Currency;
      if (saved && ["INR", "USD", "EUR", "AED", "GBP", "SAR", "RUB", "AUD", "CAD", "SGD", "JPY", "CNY", "ZAR", "MYR", "THB"].includes(saved)) {
        setCurrencyState(saved);
      }
    } catch {
      // localStorage blocked (e.g. InPrivate mode with tracking prevention)
    }
    setMounted(true);
  }, []);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem("orbinex_currency", curr);
    } catch {
      // localStorage blocked
    }
  };

  const formatPrice = (priceInr: number, unit = "") => {
    const activeCurrency = mounted ? currency : "USD";
    const converted = priceInr * rates[activeCurrency];
    const symbol = symbols[activeCurrency];
    const formatted = converted.toLocaleString("en-US", {
      minimumFractionDigits: activeCurrency === "INR" ? 0 : 2,
      maximumFractionDigits: 2,
    });
    return `${symbol}${formatted}${unit ? ` per ${unit}` : ""}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
