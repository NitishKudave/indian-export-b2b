import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft, CheckCircle2, AlertTriangle, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Trade Terms & Conditions | Orbinexglobal",
  description:
    "Orbinexglobal's B2B trade terms and conditions including payment terms, shipping incoterms, quality standards, dispute resolution, and export compliance for international buyers.",
};

export default function TradeTermsPage() {
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
              <FileText className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Trade Terms & Conditions
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                Orbinexglobal · Effective Date: 27 May 2026 · Valid for all international B2B orders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice Banner */}
      <div className="bg-orange-500/10 border-b border-orange-500/20 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 text-xs text-orange-700 dark:text-orange-400">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            <strong>Important:</strong> All purchase orders placed with Orbinexglobal are
            subject to these terms. Please read carefully before placing an order.
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">

        {/* Intro */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            These Trade Terms and Conditions (<strong className="text-slate-800 dark:text-white">"Terms"</strong>)
            govern all B2B export transactions between{" "}
            <strong className="text-slate-800 dark:text-white">Orbinexglobal</strong> ("Seller",
            "we", "us"), registered and operating from Nashik, Maharashtra, India, and any buyer,
            importer, or purchasing agent ("Buyer", "you") placing an order through our website,
            email, WhatsApp, or any other channel.
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-3">
            By placing an order or submitting a trade inquiry, you acknowledge that you have read,
            understood, and agree to be bound by these Terms.
          </p>
        </div>

        {/* Section 1 - Products & Specifications */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            1. Product Specifications & Quality Standards
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Quality Grade", value: "A Grade / Premium Export Quality" },
                { label: "Sizing Standards", value: "As per buyer specification or APEDA norms" },
                { label: "Certifications", value: "APEDA Registered, FSSAI Compliant" },
                { label: "Phytosanitary", value: "Issued by Plant Quarantine Authority, India" },
                { label: "Moisture Content", value: "As per individual product specifications" },
                { label: "Inspection", value: "Pre-shipment inspection available on request" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-start border border-slate-100 dark:border-slate-800 rounded-lg p-3">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">{item.label}</span>
                  <span className="text-xs text-right text-slate-500 dark:text-slate-400 max-w-[55%]">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="leading-relaxed pt-2">
              Product images, descriptions, and specifications on our website are representative. Minor
              natural variations in color, size, and weight are inherent to agricultural produce and shall
              not constitute grounds for rejection or dispute, provided they fall within the agreed
              tolerance range (typically ±5%).
            </p>
          </div>
        </div>

        {/* Section 2 - Minimum Order Quantities */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            2. Minimum Order Quantities (MOQ)
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800">
                    <th className="text-left p-3 font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Product Category</th>
                    <th className="text-left p-3 font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Standard MOQ</th>
                    <th className="text-left p-3 font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Container Type</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Fresh Vegetables (Onion, Potato)", "15 Metric Tons", "20ft Reefer"],
                    ["Fresh Fruits (Mango, Pomegranate)", "5 Metric Tons", "20ft Reefer"],
                    ["Dry Fruits (Cashews, Almonds)", "5 Metric Tons", "20ft Dry Container"],
                    ["Corrugated Packaging Boxes", "1,000 Units", "20ft Dry Container"],
                    ["Mixed Produce Orders", "10 Metric Tons", "20ft Reefer (as applicable)"],
                  ].map(([cat, moq, container]) => (
                    <tr key={cat} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">{cat}</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold text-orange-500">{moq}</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-500">{container}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed text-xs text-slate-500">
              * MOQs may vary based on season, availability, and destination port. Contact our trade desk
              for custom order requirements below standard MOQ.
            </p>
          </div>
        </div>

        {/* Section 3 - Pricing */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            3. Pricing & Quotations
          </h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              <strong className="text-slate-800 dark:text-white">Reference Prices:</strong> All prices
              displayed on the website are indicative wholesale reference prices only. They are subject to
              market fluctuation, seasonal variation, and must be confirmed via an official Proforma
              Invoice (PI) before order confirmation.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-white">Quotation Validity:</strong> All formal
              price quotations are valid for{" "}
              <span className="text-orange-500 font-semibold">72 hours</span> from the date of issue,
              unless otherwise specified in writing.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-white">Currency:</strong> All prices are quoted
              in Indian Rupees (INR) or US Dollars (USD) as agreed upon. Currency conversion rates used
              are the prevailing rates at the date of invoice issuance.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-white">Price Revision:</strong> We reserve the
              right to revise prices due to significant commodity market fluctuations, changes in government
              regulations, port charges, or force majeure events, with prior notice to the buyer.
            </p>
          </div>
        </div>

        {/* Section 4 - Payment Terms */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            4. Payment Terms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              {
                term: "Letter of Credit (L/C)",
                desc: "Irrevocable LC at sight, issued from a SWIFT-enabled bank. Preferred for first-time buyers and orders above USD 50,000.",
                badge: "Preferred",
                color: "green",
              },
              {
                term: "Telegraphic Transfer (T/T)",
                desc: "50% advance at order confirmation, remaining 50% against copy of Bill of Lading (BL) before release.",
                badge: "Standard",
                color: "orange",
              },
              {
                term: "Documents Against Payment (D/P)",
                desc: "Documents released upon payment confirmation through buyer's bank. Available for verified buyers.",
                badge: "On Approval",
                color: "blue",
              },
              {
                term: "Open Account",
                desc: "Available only for long-term buyers with established credit history and formal agreement.",
                badge: "Established Buyers",
                color: "slate",
              },
            ].map((item) => (
              <div key={item.term} className="border border-slate-100 dark:border-slate-800 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white">{item.term}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-700 dark:text-${item.color}-400`}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            All bank charges outside India are to be borne by the buyer. Orbinexglobal is not responsible
            for delays caused by banking intermediaries.
          </p>
        </div>

        {/* Section 5 - Shipping & Incoterms */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            5. Shipping, Incoterms & Delivery
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["FOB", "CIF", "CNF", "DDP"].map((term) => (
                <div key={term} className="bg-slate-900 text-white rounded-xl p-4 text-center">
                  <div className="text-orange-400 font-black text-xl mb-1">{term}</div>
                  <div className="text-[10px] text-slate-400">
                    {term === "FOB" && "Free on Board – JNPT / Mundra Port"}
                    {term === "CIF" && "Cost, Insurance & Freight"}
                    {term === "CNF" && "Cost & Freight (No Insurance)"}
                    {term === "DDP" && "Delivered Duty Paid (Select Routes)"}
                  </div>
                </div>
              ))}
            </div>
            <p className="leading-relaxed">
              <strong className="text-slate-800 dark:text-white">Origin Ports:</strong> We ship primarily
              from Jawaharlal Nehru Port Trust (JNPT), Mumbai and Mundra Port, Gujarat. Port selection
              depends on product type, container requirements, and cost optimization.
            </p>
            <p className="leading-relaxed">
              <strong className="text-slate-800 dark:text-white">Transit Times:</strong> UAE/GCC – 4–6
              days; UK/Europe – 18–24 days; USA/Canada – 24–30 days; Australia – 18–22 days. Times are
              approximate and subject to shipping line schedules.
            </p>
            <p className="leading-relaxed">
              <strong className="text-slate-800 dark:text-white">Cold Chain:</strong> All perishable
              produce is shipped in reefer containers maintained at specified temperatures per product
              requirements. Temperature logs are provided on request.
            </p>
          </div>
        </div>

        {/* Section 6 - Export Documents */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            6. Export Documentation
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            The following standard export documents are provided with every shipment:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Commercial Invoice (in triplicate)",
              "Packing List (detailed by carton/weight)",
              "Bill of Lading (Ocean B/L or Airway Bill)",
              "Certificate of Origin (from APEDA / Chamber of Commerce)",
              "Phytosanitary Certificate (Plant Quarantine Authority)",
              "FSSAI Export Certificate",
              "Fumigation Certificate (where applicable)",
              "Quality Inspection Report / SGS Report",
              "Insurance Certificate (for CIF/DDP terms)",
              "Beneficiary Certificate (on request)",
            ].map((doc) => (
              <div key={doc} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">
            * Additional documents specific to destination country import requirements can be arranged upon
            advance notice. Any costs associated with additional certification are borne by the buyer.
          </p>
        </div>

        {/* Section 7 - Quality Disputes */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            7. Quality Claims & Dispute Resolution
          </h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              <strong className="text-slate-800 dark:text-white">Claims Window:</strong> Any quality
              claims must be raised within{" "}
              <span className="text-orange-500 font-semibold">48 hours</span> of cargo arrival at the
              destination port, supported by photographic evidence and a third-party inspection report
              (SGS, Bureau Veritas, or equivalent).
            </p>
            <p>
              <strong className="text-slate-800 dark:text-white">Resolution Process:</strong> Disputes
              shall first be attempted to be resolved amicably between both parties within 14 working days.
              If unresolved, disputes shall be referred to arbitration under the rules of the Indian Council
              of Arbitration (ICA), New Delhi.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-white">Governing Law:</strong> These Terms are
              governed by the laws of the Republic of India. The courts of Nashik, Maharashtra shall have
              exclusive jurisdiction.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-white">Liability Limit:</strong> Our maximum
              liability for any claim shall not exceed the invoice value of the disputed shipment. We
              accept no liability for indirect, consequential, or loss-of-profit damages.
            </p>
          </div>
        </div>

        {/* Section 8 - Force Majeure */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            8. Force Majeure
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Neither party shall be held liable for delays or failure to perform their obligations due to
            circumstances beyond their reasonable control, including but not limited to: natural calamities,
            crop failure due to weather conditions, port strikes, government export restrictions, pandemic,
            war, civil unrest, or any other act of God. The affected party shall notify the other within 7
            days of the onset of such an event.
          </p>
        </div>

        {/* Section 9 - Cancellations */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            9. Order Cancellation & Amendment
          </h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              <strong className="text-slate-800 dark:text-white">Before Packing:</strong> Orders may be
              cancelled or amended with full advance refund (less any bank charges) if the request is made
              before packing/loading has commenced.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-white">After Packing/Dispatch:</strong> Once
              goods have been packed and dispatched to the port, cancellations are not accepted. Any
              amendment charges, demurrage, or additional freight costs will be borne by the buyer.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-white">Advance Forfeiture:</strong> If a buyer
              cancels after advance payment has been received and packing has commenced, the advance amount
              is non-refundable.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-white">
          <h2 className="text-lg font-extrabold mb-2">Questions About These Terms?</h2>
          <p className="text-slate-400 text-sm mb-6">
            Our trade desk is available Monday–Saturday, 9:00 AM – 6:00 PM IST.
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
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex flex-wrap gap-4 justify-center text-xs text-slate-400">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span className="text-slate-700">·</span>
          <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
          <span className="text-slate-700">·</span>
          <Link href="/sitemap" className="hover:text-orange-500 transition-colors">Sitemap</Link>
          <span className="text-slate-700">·</span>
          <Link href="/inquiry" className="hover:text-orange-500 transition-colors">Submit Trade Inquiry</Link>
        </div>
      </div>
    </div>
  );
}
