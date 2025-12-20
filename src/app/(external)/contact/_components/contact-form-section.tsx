"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const initialForm = {
  need: "Consulting services",
  fullName: "",
  company: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactFormSection() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact-form" className="relative overflow-hidden bg-[#f7f9fc] py-16 md:py-20">
      <div
        className="pointer-events-none absolute right-0 top-0 h-12 sm:h-20 w-32 sm:w-64 opacity-70"
        style={{
          backgroundImage: "url('/assets/testimonials-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-8 left-10 h-20 w-36 opacity-70"
        style={{
          backgroundImage: "url('/assets/testimonial-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left bottom",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-14">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-primary">What Do You Need?</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            {["Consulting services", "Question & help"].map((option) => (
              <label key={option} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="need"
                  value={option}
                  checked={form.need === option}
                  onChange={() => handleChange("need", option)}
                  className="h-4 w-4 accent-[#EE4312]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image
              src="/assets/about-us.svg"
              alt="Consultant assisting a client"
              width={420}
              height={420}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold text-primary">
            We will be happy to help you
          </h2>
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-primary">
                Full Name*
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(event) => handleChange("fullName", event.target.value)}
                  className="rounded-lg border border-primary/10 px-3 py-2 text-sm text-primary outline-none focus:border-[#EE4312]"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-primary">
                Company
                <input
                  type="text"
                  value={form.company}
                  onChange={(event) => handleChange("company", event.target.value)}
                  className="rounded-lg border border-primary/10 px-3 py-2 text-sm text-primary outline-none focus:border-[#EE4312]"
                  placeholder="Company name"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-primary">
                Phone Number*
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                  className="rounded-lg border border-primary/10 px-3 py-2 text-sm text-primary outline-none focus:border-[#EE4312]"
                  placeholder="+1 555-000-0000"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-primary">
                Email*
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  className="rounded-lg border border-primary/10 px-3 py-2 text-sm text-primary outline-none focus:border-[#EE4312]"
                  placeholder="you@email.com"
                  required
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium text-primary">
              Subject You Want to Discuss*
              <input
                type="text"
                value={form.subject}
                onChange={(event) => handleChange("subject", event.target.value)}
                className="rounded-lg border border-primary/10 px-3 py-2 text-sm text-primary outline-none focus:border-[#EE4312]"
                placeholder="Audience awareness"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-primary">
              Message*
              <textarea
                value={form.message}
                onChange={(event) => handleChange("message", event.target.value)}
                className="min-h-35 rounded-lg border border-primary/10 px-3 py-2 text-sm text-primary outline-none focus:border-[#EE4312]"
                placeholder="Tell us what you need help with..."
                required
              />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" className="bg-[#EE4312] text-white hover:bg-[#cf3a10]">
                Submit Form
              </Button>
              {submitted ? (
                <span className="text-sm text-muted-foreground">
                  Thanks! We&apos;ll get back to you shortly.
                </span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
