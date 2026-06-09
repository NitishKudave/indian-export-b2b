import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Orbinexglobal - Premium B2B Agricultural & Packaging Exporters India",
  description: "Orbinexglobal is a globally certified Indian export company specializing in Fresh Vegetables, Fruits, Dry Fruits, and customized B2B corrugated packaging solutions.",
  keywords: "onion exporter india, mango exporter, agricultural export, corrugated box wholesale, dry fruit exporter, b2b export india",
  authors: [{ name: "Orbinexglobal Team" }],
  openGraph: {
    title: "Orbinexglobal - Global Agricultural & Packaging Exporters",
    description: "Premium grade fresh vegetables, fruits, dry fruits, and B2B packaging solutions exported globally from India.",
    url: "https://www.orbinexglobal.com",
    siteName: "Orbinexglobal",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        {/* Suppress React hydration error #418 caused by browser extensions/autofill modifying DOM before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var origError = console.error;
                console.error = function() {
                  if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('Minified React error #418')) return;
                  if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('Minified React error #423')) return;
                  if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('Minified React error #425')) return;
                  origError.apply(console, arguments);
                };
                window.addEventListener('error', function(e) {
                  if (e.message && (e.message.includes('#418') || e.message.includes('#423') || e.message.includes('#425'))) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                });
              })();
            `,
          }}
        />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        
        {/* JSON-LD Schema markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Orbinexglobal",
              "url": "https://www.orbinexglobal.com",
              "logo": "https://www.orbinexglobal.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-253-2456789",
                "contactType": "customer service",
                "areaServed": "Worldwide",
                "availableLanguage": ["en", "hi"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/orbinexglobal"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
