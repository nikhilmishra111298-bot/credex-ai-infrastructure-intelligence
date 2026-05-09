import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Lead request body:", body);

    if (!body.email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({
        email: body.email,
        company_name: body.companyName || null,
        role: body.role || null,
        team_size: body.teamSize || null,
      })
      .select()
      .single();

    if (error) {
      console.log("Supabase lead error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: data,
    });
  } catch (error) {
    console.log("Lead route crash:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server crashed while saving lead",
      },
      { status: 500 }
    );
  }
}