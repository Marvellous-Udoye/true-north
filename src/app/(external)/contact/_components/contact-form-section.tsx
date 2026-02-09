"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Building2,
  Phone,
  Mail,
  Tag,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";

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
      className="relative overflow-hidden bg-primary py-20 lg:py-32 scroll-mt-20 text-white"
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 size-64 border border-white rounded-full" />
        <div className="absolute bottom-10 left-10 size-40 border border-white rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-orange-500 font-black uppercase tracking-widest text-xs">
                <div className="h-px w-8 bg-orange-500" />
                Inquiry Form
              </div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
                What Do You{" "}
                <span className="text-orange-500 italic font-serif">Need?</span>
              </h2>
              <p className="text-lg text-slate-300 font-medium leading-relaxed">
                Whether you&apos;re looking to hire exceptional talent or
                seeking your next career move, we&apos;re here to help you
                navigate the journey.
              </p>
            </div>

            <div className="relative overflow-hidden aspect-square lg:aspect-auto lg:h-[400px]">
              <Image
                src="/assets/about-us.svg"
                alt="Consultation"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-[3rem] bg-white border border-slate-200 p-8 md:p-12 text-slate-900 shadow-none"
              >
                <div className="space-y-2 mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    We&apos;ll be happy to help you
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    Please fill out all required fields marked with (*)
                  </p>
                </div>

                <form className="grid gap-6" onSubmit={handleSubmit}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Full Name*
                      </Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                        <Input
                          value={form.fullName}
                          onChange={(e) =>
                            handleChange("fullName", e.target.value)
                          }
                          placeholder="John Doe"
                          className="h-12 pl-11 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all shadow-none"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Company
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                        <Input
                          value={form.company}
                          onChange={(e) =>
                            handleChange("company", e.target.value)
                          }
                          placeholder="Company name"
                          className="h-12 pl-11 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all shadow-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Phone Number*
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                        <Input
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          placeholder="+1 (555) 000-0000"
                          className="h-12 pl-11 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all shadow-none"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Email Address*
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          placeholder="john@example.com"
                          className="h-12 pl-11 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all shadow-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Subject*
                    </Label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                      <Input
                        value={form.subject}
                        onChange={(e) =>
                          handleChange("subject", e.target.value)
                        }
                        placeholder="What can we help you with?"
                        className="h-12 pl-11 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all shadow-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Message*
                    </Label>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-4 size-4 text-slate-300" />
                      <textarea
                        value={form.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        className="min-h-32 w-full pl-11 pt-4 rounded-xl bg-slate-50/50 border border-slate-100 p-4 text-sm text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="Tell us about your goals..."
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-14 w-full rounded-2xl bg-primary text-white text-lg font-bold hover:bg-primary/90 transition-all group shadow-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          Send Message
                          <Send className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      )}
                    </Button>

                    {submitted && (
                      <div className="flex flex-col mt-4 gap-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="size-5 text-green-600" />
                          <h3 className="text-lg font-bold text-slate-700">
                            Message Sent!
                          </h3>
                        </div>
                      </div>
                    )}

                    {errorMessage && (
                      <p className="mt-4 text-center text-sm font-medium text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
