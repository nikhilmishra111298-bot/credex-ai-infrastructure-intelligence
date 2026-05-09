import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          team_size: body.teamSize,
          use_case: body.useCase,
          tools: body.tools,
          result: body.result,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      audit: data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save audit",
      },
      { status: 500 }
    );
  }
}