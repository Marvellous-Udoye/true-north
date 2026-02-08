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
    const { error } = await supabase.from("job_applications").insert({
      job_id: jobId,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      country,
      resume_url: resumeUrl ?? null,
      cover_letter: coverLetter ?? null,
    });

    if (error) {
      console.error("Job application insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Unable to submit application." },
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
