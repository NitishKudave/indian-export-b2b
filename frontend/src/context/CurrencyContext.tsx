"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "INR" | "USD" | "EUR" | "AED" | "GBP" | "SAR" | "RUB";

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
};

const symbols: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  AED: "AED ",
  GBP: "£",
  SAR: "SAR ",
  RUB: "₽",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD"); // Default to USD globally for B2B

  useEffect(() => {
    const saved = localStorage.getItem("orbinex_currency") as Currency;
    if (saved && ["INR", "USD", "EUR", "AED", "GBP", "SAR", "RUB"].includes(saved)) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem("orbinex_currency", curr);
  };

  const formatPrice = (priceInr: number, unit = "") => {
    const converted = priceInr * rates[currency];
    const symbol = symbols[currency];
    const formatted = converted.toLocaleString(undefined, {
      minimumFractionDigits: currency === "INR" ? 0 : 2,
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
