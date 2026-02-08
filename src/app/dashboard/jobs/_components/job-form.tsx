"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabaseBrowserClient } from "@/lib/supabase/client";

type JobFormValues = {
  title: string;
  slug: string;
  description: string;
  location: string;
  type: string;
  work_mode: string;
  category: string;
  salary_range: string;
  status: "draft" | "published";
};

const emptyForm: JobFormValues = {
  title: "",
  slug: "",
  description: "",
  location: "",
  type: "Full-time",
  work_mode: "On-site",
  category: "",
  salary_range: "",
  status: "draft",
};

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
];

const workModes = ["On-site", "Remote", "Hybrid"];

type JobFormProps = {
  jobId?: string;
};

export function JobForm({ jobId }: JobFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<JobFormValues>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!jobId);

  const handleChange = (field: keyof JobFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!jobId) return;
    const fetchJob = async () => {
      const supabase = supabaseBrowserClient();
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .single();

      if (error || !data) {
        toast.error("Unable to load job.");
        setIsLoading(false);
        return;
      }

      setForm({
        title: data.title ?? "",
        slug: data.slug ?? "",
        description: data.description ?? "",
        location: data.location ?? "",
        type: data.type ?? "Full-time",
        work_mode: data.work_mode ?? "On-site",
        category: data.category ?? "",
        salary_range: data.salary_range ?? "",
        status: data.status ?? "draft",
      });
      setIsLoading(false);
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (
    event?: React.FormEvent<HTMLFormElement>,
    nextStatus?: JobFormValues["status"]
  ) => {
    event?.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = supabaseBrowserClient();
      const status = nextStatus ?? form.status;
      const payload = {
        ...form,
        status,
        updated_at: new Date().toISOString(),
        published_at: status === "published" ? new Date().toISOString() : null,
      };

      if (jobId) {
        const { error } = await supabase
          .from("jobs")
          .update(payload)
          .eq("id", jobId);
        if (error) throw error;
        toast.success("Job updated.");
      } else {
        const { error } = await supabase.from("jobs").insert(payload);
        if (error) throw error;
        toast.success(status === "draft" ? "Job saved." : "Job published.");
      }
      router.push("/dashboard/jobs");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save job.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="h-4 w-32 rounded bg-primary/10" />
          <div className="h-10 w-full rounded bg-primary/10" />
          <div className="h-24 w-full rounded bg-primary/10" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-primary">
              Job Title*
              <Input
                value={form.title}
                onChange={(event) => handleChange("title", event.target.value)}
                placeholder="Senior Talent Partner"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-primary">
              Slug*
              <Input
                value={form.slug}
                onChange={(event) => handleChange("slug", event.target.value)}
                placeholder="senior-talent-partner"
                required
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-primary">
            Job Description*
            <Textarea
              value={form.description}
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
              placeholder="Describe the role, responsibilities, and expectations."
              required
              rows={6}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-primary">
              Location*
              <Input
                value={form.location}
                onChange={(event) =>
                  handleChange("location", event.target.value)
                }
                placeholder="Lagos, Nigeria"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-primary">
              Category / Role*
              <Input
                value={form.category}
                onChange={(event) =>
                  handleChange("category", event.target.value)
                }
                placeholder="Talent Advisory"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-primary">
              Job Type
              <Select
                value={form.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-primary">
              Work Mode
              <Select
                value={form.work_mode}
                onValueChange={(value) => handleChange("work_mode", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  {workModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-primary">
            Salary Range
            <Input
              value={form.salary_range}
              onChange={(event) =>
                handleChange("salary_range", event.target.value)
              }
              placeholder="₦5,000,000 - ₦7,000,000 / year"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => handleSubmit(undefined, "draft")}
              disabled={isSubmitting}
            >
              Save as draft
            </Button>
            <Button
              type="button"
              onClick={() => handleSubmit(undefined, "published")}
              disabled={isSubmitting}
            >
              Publish job
            </Button>
            {jobId ? (
              <Button type="submit" variant="outline" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
