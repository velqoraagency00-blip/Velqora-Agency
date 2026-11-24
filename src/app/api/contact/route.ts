import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ALL_SERVICE_NAMES } from "@/data/services";

const ALLOWED_SERVICES = new Set<string>([
  ...ALL_SERVICE_NAMES,
  "General inquiry",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_SERVICE_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 4000;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  consent?: unknown;
  honeypot?: unknown;
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request format. Please try again." },
      { status: 400 }
    );
  }

  // Honeypot spam check: silently accept without inserting if a bot fills the hidden field.
  if (typeof body.honeypot === "string" && body.honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const consent = body.consent === true;

  if (!name || name.length > MAX_NAME_LENGTH) {
    return NextResponse.json(
      {
        error: `Please enter your name (up to ${MAX_NAME_LENGTH} characters).`,
      },
      { status: 400 }
    );
  }

  if (
    !email ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_REGEX.test(email)
  ) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (
    !service ||
    service.length > MAX_SERVICE_LENGTH ||
    !ALLOWED_SERVICES.has(service)
  ) {
    return NextResponse.json(
      { error: "Please select a valid service of interest." },
      { status: 400 }
    );
  }

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      {
        error: `Please enter your message (up to ${MAX_MESSAGE_LENGTH} characters).`,
      },
      { status: 400 }
    );
  }

  if (!consent) {
    return NextResponse.json(
      { error: "Please confirm the privacy policy notice before submitting." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("[contact-api] Server configuration missing.");
    return NextResponse.json(
      {
        error:
          "Online form submissions are not configured yet. Your inquiry was not submitted—please email velqoraagency00@gmail.com directly.",
      },
      { status: 503 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { error } = await supabase.from("contact_inquiries").insert({
      name,
      email,
      service_interest: service,
      message,
      privacy_consent: true,
    });

    if (error) {
      console.error("[contact-api] Database insert failed.");
      return NextResponse.json(
        {
          error:
            "We could not save your inquiry right now. Your inquiry was not submitted—please email velqoraagency00@gmail.com directly.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    console.error("[contact-api] Unexpected submission error.");
    return NextResponse.json(
      {
        error:
          "We could not save your inquiry right now. Your inquiry was not submitted—please email velqoraagency00@gmail.com directly.",
      },
      { status: 500 }
    );
  }
}
