"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const initialForm = {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Unable to send message.");
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-[#f7f9fc] py-16 md:py-20"
    >
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
          <h2 className="text-xl font-semibold text-primary">
            What Do You Need?
          </h2>
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
                  onChange={(event) =>
                    handleChange("fullName", event.target.value)
                  }
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
                  onChange={(event) =>
                    handleChange("company", event.target.value)
                  }
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
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
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
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
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
                onChange={(event) =>
                  handleChange("subject", event.target.value)
                }
                className="rounded-lg border border-primary/10 px-3 py-2 text-sm text-primary outline-none focus:border-[#EE4312]"
                placeholder="Audience awareness"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-primary">
              Message*
              <textarea
                value={form.message}
                onChange={(event) =>
                  handleChange("message", event.target.value)
                }
                className="min-h-35 rounded-lg border border-primary/10 px-3 py-2 text-sm text-primary outline-none focus:border-[#EE4312]"
                placeholder="Tell us what you need help with..."
                required
              />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                type="submit"
                className="bg-[#EE4312] text-white hover:bg-[#cf3a10]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit Form"}
              </Button>
              {submitted ? (
                <span className="text-sm text-primary">
                  Thanks for reaching out! We&apos;ll get back to you shortly.
                </span>
              ) : null}
              {errorMessage ? (
                <span className="text-sm text-[#EE4312]">{errorMessage}</span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
