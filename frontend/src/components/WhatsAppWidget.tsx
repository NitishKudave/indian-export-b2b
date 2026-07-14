"use client";

import React from "react";
import { MessageSquareCode } from "lucide-react";

export default function WhatsAppWidget() {
  const phoneNumber = "+919404866986"; // Replace with company's actual WhatsApp business number
  const message = encodeURIComponent(
    "Hello Orbinexglobal, I am interested in importing agricultural products. Please share your catalog and MOQ terms."
  );
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 active:scale-90 transition-all rounded-full shadow-lg hover:shadow-green-500/30 text-white animate-bounce group"
      aria-label="Contact on WhatsApp"
    >
      {/* Tooltip */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all origin-right bg-slate-900 text-white text-[10px] font-bold tracking-wider py-1.5 px-3 rounded-lg shadow border border-slate-800 whitespace-nowrap">
        CHAT WITH TRADE TEAM
      </span>
      {/* WhatsApp Icon representation */}
      <svg
        className="w-7 h-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.592 1.97 14.125.945 11.5.945 6.066.945 1.64 5.315 1.637 10.745c-.001 1.701.464 3.364 1.347 4.848l-.99 3.613 3.733-.974.33.196zM17.8 14.17c-.3-.15-1.782-.88-2.062-.982-.28-.1-.485-.15-.69.15-.205.3-.79.99-.97 1.2-.18.205-.36.23-.66.08-1.59-.79-2.615-1.4-3.66-3.2-.275-.47.275-.435.787-1.45.085-.17.042-.32-.021-.47-.064-.15-.485-1.17-.665-1.6-.175-.42-.353-.362-.485-.368-.125-.006-.27-.008-.415-.008s-.38.05-.58.27c-.2.22-.76.74-.76 1.8s.77 2.09.87 2.23c.11.14 1.52 2.32 3.68 3.25 1.74.75 2.45.6 3.32.48.56-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.175-1.43-.075-.125-.275-.205-.575-.355z" />
      </svg>
    </a>
  );
}
