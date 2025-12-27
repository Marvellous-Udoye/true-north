import { NextResponse } from "next/server";
import { supabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body?.email ?? "").toLowerCase().trim();

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const supabase = supabaseAdminClient();
    const { error } = await supabase
      .from("subscribers")
      .upsert({ email }, { onConflict: "email" });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Unable to save subscriber." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Subscriber error:", error);
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
