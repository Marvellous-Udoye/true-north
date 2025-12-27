import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email-service";
import { supabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, company, phone, subject, message } = body ?? {};

    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const result = await sendContactEmail({
      fullName,
      email,
      company,
      phone,
      subject,
      message,
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error ?? "Failed to send email." },
        { status: 500 }
      );
    }

    const supabase = supabaseAdminClient();
    const { error: insertError } = await supabase.from("contact_messages").insert({
      full_name: fullName,
      email,
      company,
      phone,
      subject,
      message,
    });

    if (insertError) {
      console.error("Contact insert error:", insertError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
