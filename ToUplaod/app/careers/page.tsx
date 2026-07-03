"use client";

import React from "react";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Truck Dispatcher",
    location: "Remote",
    type: "Full-Time",
    description:
      "Manage loads, communicate with brokers, and coordinate drivers efficiently.",
  },
  {
    title: "Sales Representative",
    location: "Lahore, Pakistan",
    type: "Full-Time",
    description:
      "Build client relationships and help grow Ajax Dispatch services.",
  },
  {
    title: "Customer Support Specialist",
    location: "Remote",
    type: "Part-Time",
    description:
      "Assist carriers and clients with inquiries and daily operational support.",
  },
];

export default function CareersPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center" />

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 rounded-full border border-white/20 text-sm mb-6">
              Careers at Ajax Dispatch
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Build Your Career in Truck Dispatching
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Join Ajax Dispatch and become part of a fast-growing truck
              dispatching company helping carriers maximize profits and keep
              trucks moving across the USA.
            </p>

            <button className="mt-8 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              View Open Positions
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">Why Join Ajax Dispatch?</h2>

            <p className="mt-4 text-gray-600">
              We focus on growth, teamwork, and building long-term careers in
              the logistics and dispatching industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            <div className="border rounded-3xl p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                <Briefcase />
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Career Growth
              </h3>

              <p className="mt-3 text-gray-600">
                Learn the dispatching business and grow with a rapidly expanding
                company.
              </p>
            </div>

            <div className="border rounded-3xl p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                <Clock />
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Flexible Work
              </h3>

              <p className="mt-3 text-gray-600">
                Enjoy remote opportunities and flexible schedules depending on
                the role.
              </p>
            </div>

            <div className="border rounded-3xl p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                <MapPin />
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Global Team
              </h3>

              <p className="mt-3 text-gray-600">
                Work with talented professionals serving carriers across the
                United States.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold">Open Positions</h2>

              <p className="mt-3 text-gray-600">
                Explore opportunities to join the Ajax Dispatch team.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white border rounded-3xl p-8 hover:shadow-lg transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold">{job.title}</h3>

                    <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        {job.location}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={18} />
                        {job.type}
                      </div>
                    </div>

                    <p className="mt-4 text-gray-600 max-w-2xl">
                      {job.description}
                    </p>
                  </div>

                  <button className="whitespace-nowrap bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to Start Your Career?
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Join Ajax Dispatch and help carriers succeed with professional truck
            dispatching solutions.
          </p>

          <button className="mt-8 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition">
            Contact Our Team
          </button>
        </div>
      </section>
    </main>
  );
}