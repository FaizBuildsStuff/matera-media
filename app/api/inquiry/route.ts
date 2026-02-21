import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export type InquiryPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceInterest?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  sourcePage?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!process.env.SANITY_API_TOKEN) {
      console.error("SANITY_API_TOKEN is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const doc = {
      _type: "inquiry",
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company?.trim() || undefined,
      phone: body.phone?.trim() || undefined,
      serviceInterest: body.serviceInterest || undefined,
      budget: body.budget || undefined,
      timeline: body.timeline || undefined,
      message: body.message?.trim() || undefined,
      sourcePage: body.sourcePage || undefined,
      submittedAt: new Date().toISOString(),
    };

    await client.create(doc);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry submission error:", err);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
