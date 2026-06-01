import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Orbinexglobal",
  description:
    "Orbinexglobal's privacy policy outlines how we collect, use, and protect your personal and business data when you use our B2B export website.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "information-we-collect",
      title: "1. Information We Collect",
      content: [
        {
          subtitle: "Business Inquiry Data",
          text: "When you submit a trade inquiry, request for quotation (RFQ), or contact us through the website, we collect: Full name, business email address, company name, phone number (with country code), target product(s), required quantity, destination port, and shipping terms (FOB/CIF/CNF/DDP).",
        },
        {
          subtitle: "Website Usage Data",
          text: "We may automatically collect non-personally identifiable information including browser type, IP address (for rate-limiting abuse prevention), pages visited, time spent on pages, and referring URLs. This data is used solely for website analytics and security.",
        },
        {
          subtitle: "Communication Records",
          text: "If you contact us via email or WhatsApp, we retain those communication records for the purpose of responding to your trade inquiries and maintaining business correspondence.",
        },
      ],
    },
    {
      id: "how-we-use",
      title: "2. How We Use Your Information",
      content: [
        {
          subtitle: "Trade Inquiry Processing",
          text: "Your contact and order details are used exclusively to respond to your B2B trade inquiries, prepare pricing quotations, coordinate shipping arrangements, and fulfill export orders.",
        },
        {
          subtitle: "Business Communication",
          text: "We may use your email or phone number to send you trade updates, shipping documentation, phytosanitary certificate updates, or respond to your follow-up queries.",
        },
        {
          subtitle: "Website Improvement",
          text: "Aggregated, anonymized usage data helps us improve our website content, product catalog, and pricing information to better serve international buyers.",
        },
      ],
    },
    {
      id: "data-sharing",
      title: "3. Data Sharing & Disclosure",
      content: [
        {
          subtitle: "We Do Not Sell Your Data",
          text: "Orbinexglobal does not sell, rent, or trade your personal or business information to any third parties for marketing purposes.",
        },
        {
          subtitle: "Logistics & Shipping Partners",
          text: "We may share necessary shipping and contact details with our authorized freight forwarders, customs clearing agents, and logistics partners solely for the purpose of executing your export order.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information if required by Indian law, APEDA regulations, export compliance authorities, or in response to a valid legal process.",
        },
      ],
    },
    {
      id: "cookies",
      title: "4. Cookies & Tracking",
      content: [
        {
          subtitle: "Essential Cookies",
          text: "Our website uses minimal essential cookies required for basic website functionality such as session management and security tokens.",
        },
        {
          subtitle: "Analytics",
          text: "We may use basic analytics tools to understand website traffic patterns. No personally identifiable information is shared with analytics providers.",
        },
        {
          subtitle: "Your Control",
          text: "You can disable cookies through your browser settings. Note that disabling cookies may affect certain website features.",
        },
      ],
    },
    {
      id: "data-security",
      title: "5. Data Security",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security practices to protect your information including secure HTTPS connections, server-side data encryption, and restricted access controls to our admin systems.",
        },
        {
          subtitle: "Retention Period",
          text: "Trade inquiry data is retained for a period of 3 years in accordance with standard B2B export documentation requirements. You may request deletion of your data at any time by contacting us.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "6. Your Rights",
      content: [
        {
          subtitle: "Access & Correction",
          text: "You have the right to request access to the personal data we hold about you and request corrections if any information is inaccurate.",
        },
        {
          subtitle: "Data Deletion",
          text: "You may request deletion of your data by emailing us at trade@orbinexglobal.com. We will process your request within 30 business days, subject to any legal retention obligations.",
        },
        {
          subtitle: "Opt-Out",
          text: "If you no longer wish to receive trade communications from us, you may opt-out at any time by sending a request to trade@orbinexglobal.com.",
        },
      ],
    },
    {
      id: "third-party",
      title: "7. Third-Party Links",
      content: [
        {
          subtitle: "External Websites",
          text: "Our website may contain links to external trade portals, certification bodies (APEDA, FSSAI), or logistics partners. We are not responsible for the privacy practices of those third-party websites.",
        },
      ],
    },
    {
      id: "changes",
      title: "8. Changes to This Policy",
      content: [
        {
          subtitle: "Policy Updates",
          text: "Orbinexglobal reserves the right to update this Privacy Policy from time to time. Any changes will be posted on this page with the effective date updated. Continued use of our website constitutes acceptance of the revised policy.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors text-xs font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Privacy Policy
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                Orbinexglobal · Effective Date: 27 May 2026 · Nashik,
                Maharashtra, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 mb-8 shadow-sm">
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Orbinexglobal (<strong className="text-slate-800 dark:text-white">"Orbinexglobal"</strong>,{" "}
            <strong className="text-slate-800 dark:text-white">"we"</strong>,{" "}
            <strong className="text-slate-800 dark:text-white">"us"</strong>, or{" "}
            <strong className="text-slate-800 dark:text-white">"our"</strong>) is a
            registered agricultural export firm headquartered in Nashik, Maharashtra,
            India. We operate the website{" "}
            <span className="text-orange-500 font-semibold">www.orbinexglobal.com</span>{" "}
            as a B2B export trade portal for international importers, wholesale buyers,
            and distribution partners.
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-4">
            This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or submit a trade inquiry. Please
            read this policy carefully. By accessing our website, you agree to the terms
            described here.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm"
            >
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                {section.title}
              </h2>
              <div className="space-y-5">
                {section.content.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-bold text-orange-500 mb-1.5">
                      {item.subtitle}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact for Privacy */}
        <div className="mt-8 bg-slate-900 rounded-2xl border border-slate-800 p-8 text-white">
          <h2 className="text-lg font-extrabold mb-4">
            Contact Our Data Privacy Officer
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            If you have any questions, concerns, or requests regarding this Privacy
            Policy or your personal data, please contact us:
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-orange-400 shrink-0" />
              <a href="mailto:trade@orbinexglobal.com" className="text-orange-400 hover:text-orange-300">
                trade@orbinexglobal.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <a href="tel:+912532456789" className="text-slate-300 hover:text-white">
                +91 253 245 6789
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span className="text-slate-300">
                Plot No. 45, Agro Processing Zone, MIDC Area, Nashik – 422010,
                Maharashtra, India
              </span>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-xs text-slate-400">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span className="text-slate-700">·</span>
          <Link href="/terms" className="hover:text-orange-500 transition-colors">Trade Terms & Conditions</Link>
          <span className="text-slate-700">·</span>
          <Link href="/sitemap" className="hover:text-orange-500 transition-colors">Sitemap</Link>
          <span className="text-slate-700">·</span>
          <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
