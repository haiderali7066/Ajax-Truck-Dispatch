"use client";

import React from "react";

const SERVICES = [
  {
    title: "Compliance & Regulatory",
    accentStyle: "border-t-blue-500 text-blue-600 bg-blue-50",
    iconColor: "text-blue-500",
    items: [
      "Safety compliance management",
      "MC & DOT compliance / revocation handling",
      "UCR filing",
      "IFTA fuel tax filing",
      "IRP apportioned plates",
      "Annual audit filing",
      "Insurance policy updates & renewals",
    ],
  },
  {
    title: "Driver Management",
    accentStyle: "border-t-emerald-500 text-emerald-600 bg-emerald-50",
    iconColor: "text-emerald-500",
    items: [
      "Driver onboarding & qualification verification",
      "Pre-employment drug testing",
      "MVR (Motor Vehicle Record checks)",
      "Driver application processing",
      "Roadside safety compliance training",
    ],
  },
  {
    title: "Truck & Fleet Setup",
    accentStyle: "border-t-orange-500 text-orange-600 bg-orange-50",
    iconColor: "text-orange-500",
    items: [
      "Truck onboarding verification",
      "ELD installation & compliance",
      "IFTA stickers & documentation",
      "Full compliance requirement checks",
    ],
  },
  {
    title: "Operations & Support",
    accentStyle: "border-t-violet-500 text-violet-600 bg-violet-50",
    iconColor: "text-violet-500",
    items: [
      "Real-time ELD logbook fixing",
      "24/7 roadside support",
      "DataQ filing (inspection dispute handling)",
    ],
  },
  {
    title: "Financial & Claims",
    accentStyle: "border-t-rose-500 text-rose-600 bg-rose-50",
    iconColor: "text-rose-500",
    items: [
      "Insurance claims management",
      "Over-aged invoice recovery",
    ],
  },
  {
    title: "Issue Resolution",
    accentStyle: "border-t-cyan-500 text-cyan-600 bg-cyan-50",
    iconColor: "text-cyan-500",
    items: [
      "MC safety score improvement",
      "Broker & MC relationship issue handling",
    ],
  },
];

const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={`w-5 h-5 shrink-0 ${className ?? ""}`}
  >
    <path 
      fillRule="evenodd" 
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
      clipRule="evenodd" 
    />
  </svg>
);

const ServiceMarquee = () => {
  return (
    <section className="w-full bg-slate-50 py-5 overflow-hidden relative font-sans">
      {/* Heading */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Our Services No One Else Provide 
        </h2>
        <p className="text-slate-600 mt-4 text-base md:text-lg max-w-2xl mx-auto">
          Complete trucking compliance & dispatch solutions built for reliability.
        </p>
      </div>

      {/* Fade edges adapted for light mode */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-slate-50 to-transparent z-10" />

      {/* Marquee */}
      <div className="flex gap-6 w-max animate-marqueeSlow hover:[animation-play-state:paused] px-10 pb-8">
        {[...SERVICES, ...SERVICES].map((group, index) => (
          <div
            key={index}
            className={`min-w-[320px] max-w-[320px] bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col border-t-4 ${group.accentStyle.split(' ')[0]}`}
          >
            {/* Card Header */}
            <div className={`p-5 border-b border-slate-100 rounded-t-xl ${group.accentStyle.split(' ')[2]}`}>
              <h3 className={`font-semibold text-lg ${group.accentStyle.split(' ')[1]}`}>
                {group.title}
              </h3>
            </div>

            {/* Card Body */}
            <div className="p-6 grow">
              <ul className="space-y-3 text-slate-600 text-sm">
                {group.items.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start leading-tight">
                    <CheckIcon className={group.iconColor} />
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Slow smooth animation */}
      <style jsx>{`
        .animate-marqueeSlow {
          animation: marqueeSlow 45s linear infinite;
        }

        @keyframes marqueeSlow {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(calc(-50% - 1.5rem)); /* Offset accounts for gap */
          }
        }
      `}</style>
    </section>
  );
};

export default ServiceMarquee;