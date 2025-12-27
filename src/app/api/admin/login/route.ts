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
    const { data, error } = await supabase
      .from("admins")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json(
        { ok: false, error: "Email not authorized." },
        { status: 403 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
