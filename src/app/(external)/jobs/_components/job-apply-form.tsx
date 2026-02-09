"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  CheckCircle2, 
  Send, 
  Globe, 
  Mail, 
  Phone,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  coverLetter: "",
};

type JobApplyFormProps = {
  jobId: string;
  jobTitle: string;
};

export function JobApplyForm({ jobId, jobTitle }: JobApplyFormProps) {
  const [form, setForm] = useState(initialForm);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const uploadResume = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload/raw", {
      method: "POST",
      body: formData,
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload?.error || "Resume upload failed.");
    }
    return payload.url as string;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);
    setErrorMessage(null);

    try {
      const resumeUrl = resumeFile ? await uploadResume(resumeFile) : null;
      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          country: form.country,
          resumeUrl,
          coverLetter: form.coverLetter,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Unable to submit application.");
      }

      setSubmitted(true);
      setForm(initialForm);
      setResumeFile(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit application."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[2.5rem] bg-white p-6 md:p-10 text-center border border-slate-100"
      >
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl bg-green-50 text-green-600">
          <CheckCircle2 className="size-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Application Sent!</h3>
        <p className="mt-3 text-slate-500 leading-relaxed">
          Thank you for applying for the <span className="font-bold text-slate-900">{jobTitle}</span> role. 
          Our recruitment team will review your profile and reach out if there&apos;s a match.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-[2.5rem] bg-white p-6 md:p-8 shadow-sm border border-slate-100 lg:p-10">
      <div className="space-y-2 mb-8">
        <h3 className="text-2xl font-bold text-slate-900">Apply for this role</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Submit your details below. We review every application thoughtfully.
        </p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-slate-400">First Name</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
              <Input
                id="firstName"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Jane"
                className="h-12 pl-11 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-slate-400">Last Name</Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Doe"
              className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="jane@example.com"
                className="h-12 pl-11 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="h-12 pl-11 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-xs font-bold uppercase tracking-wider text-slate-400">Country of Residence</Label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
            <Input
              id="country"
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="e.g. United Kingdom"
              className="h-12 pl-11 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Resume / CV (PDF)</Label>
          <div className="relative">
            <input
              type="file"
              id="resume-file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
            />
            <label
              htmlFor="resume-file"
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed p-4 transition-all duration-200",
                resumeFile 
                  ? "border-green-200 bg-green-50/30" 
                  : "border-slate-100 bg-slate-50/50 hover:border-primary/20 hover:bg-slate-50"
              )}
            >
              <div className={cn(
                "flex size-10 items-center justify-center rounded-lg",
                resumeFile ? "bg-green-500 text-white" : "bg-white text-slate-400"
              )}>
                {resumeFile ? <CheckCircle2 className="size-5" /> : <Upload className="size-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {resumeFile ? resumeFile.name : "Choose file or drag here"}
                </p>
                <p className="text-xs text-slate-400">
                  {resumeFile ? `${(resumeFile.size / 1024 / 1024).toFixed(2)} MB` : "PDF or Word up to 10MB"}
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverLetter" className="text-xs font-bold uppercase tracking-wider text-slate-400">Cover Letter (Optional)</Label>
          <textarea
            id="coverLetter"
            value={form.coverLetter}
            onChange={(e) => handleChange("coverLetter", e.target.value)}
            className="min-h-32 w-full rounded-xl bg-slate-50/50 border border-slate-100 p-4 text-sm text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
            placeholder="Tell us why you're a great fit for this role..."
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="h-14 w-full rounded-2xl bg-primary text-lg font-bold hover:bg-primary/90 transition-all group"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Submit Application
                <Send className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            )}
          </Button>
          
          {errorMessage && (
            <p className="mt-4 text-center text-sm font-medium text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

// Re-importing motion since it's used in the success state
import { motion } from "framer-motion";
