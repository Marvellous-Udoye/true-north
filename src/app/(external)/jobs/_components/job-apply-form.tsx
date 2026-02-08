"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    const response = await fetch("/api/upload", {
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

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-primary">
          Apply for {jobTitle}
        </h3>
        <p className="text-sm text-muted-foreground">
          Submit your details and we&apos;ll review your application shortly.
        </p>
      </div>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-primary">
            First Name*
            <Input
              value={form.firstName}
              onChange={(event) => handleChange("firstName", event.target.value)}
              placeholder="First name"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-primary">
            Last Name*
            <Input
              value={form.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
              placeholder="Last name"
              required
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-primary">
            Email*
            <Input
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="you@email.com"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-primary">
            Phone Number*
            <Input
              type="tel"
              value={form.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              placeholder="+1 555-000-0000"
              required
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium text-primary">
          Country*
          <Input
            value={form.country}
            onChange={(event) => handleChange("country", event.target.value)}
            placeholder="Country of residence"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-primary">
          Resume / CV
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)}
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-primary">
          Cover Letter / Message
          <textarea
            value={form.coverLetter}
            onChange={(event) =>
              handleChange("coverLetter", event.target.value)
            }
            className="min-h-28 rounded-lg border border-primary/10 px-3 py-2 text-sm text-primary outline-none focus:border-[#EE4312]"
            placeholder="Share a quick note about your experience..."
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            type="submit"
            className="bg-[#EE4312] text-white hover:bg-[#cf3a10]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
          {submitted ? (
            <span className="text-sm text-primary">
              Application submitted successfully. We&apos;ll be in touch.
            </span>
          ) : null}
          {errorMessage ? (
            <span className="text-sm text-[#EE4312]">{errorMessage}</span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
