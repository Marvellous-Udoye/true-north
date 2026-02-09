import { NextResponse } from "next/server";
import { supabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      country,
      resumeUrl,
      coverLetter,
    } = body ?? {};

    if (!jobId || !firstName || !lastName || !email || !phone || !country) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const supabase = supabaseAdminClient();
    const insertData: {
      job_id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      country: string;
      resume_url: string | null;
      cover_letter?: string;
    } = {
      job_id: jobId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      country: country,
      resume_url: resumeUrl ?? null,
    };

    if (coverLetter) {
      insertData.cover_letter = coverLetter;
    }

    let { error } = await supabase.from("job_applications").insert(insertData);

    if (error && error.code === "42703" && error.message?.includes("cover_letter")) {
      const fallbackData = { ...insertData };
      delete fallbackData.cover_letter;
      ({ error } = await supabase.from("job_applications").insert(fallbackData));
    }

    if (error) {
      console.error("Job application insert error:", error);
      return NextResponse.json(
        { ok: false, error: error.message || "Unable to submit application." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Job apply API error:", error);
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
