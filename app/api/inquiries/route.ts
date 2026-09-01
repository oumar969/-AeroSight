import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Inquiry = {
  turbineCount?: unknown;
  location?: unknown;
  services?: unknown;
  name?: unknown;
  email?: unknown;
  locale?: unknown;
  privacyAccepted?: unknown;
  privacyVersion?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\s+/g, "").replace(/\/$/, "");
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.replace(/\s+/g, "");
  if (!supabaseUrl || !supabaseKey) return NextResponse.json({ error: "Formularen er ikke aktiveret endnu." }, { status: 503 });

  let input: Inquiry;
  try { input = await request.json() as Inquiry; }
  catch { return NextResponse.json({ error: "Ugyldig forespørgsel." }, { status: 400 }); }

  if (clean(input.website, 200)) return NextResponse.json({ ok: true });
  const startedAt = Number(input.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) return NextResponse.json({ error: "Prøv igen om et øjeblik." }, { status: 429 });

  const turbineCount = Number(input.turbineCount);
  const location = clean(input.location, 300);
  const name = clean(input.name, 150);
  const email = clean(input.email, 320).toLowerCase();
  const locale = input.locale === "da" ? "da" : "en";
  const services = Array.isArray(input.services) ? input.services.map((item) => clean(item, 60)).filter(Boolean).slice(0, 4) : [];
  const privacyVersion = clean(input.privacyVersion, 30);

  if (!Number.isInteger(turbineCount) || turbineCount < 1 || turbineCount > 100000 || location.length < 2 || name.length < 2 || !emailPattern.test(email) || !services.length || input.privacyAccepted !== true || !privacyVersion) {
    return NextResponse.json({ error: locale === "da" ? "Kontrollér venligst alle felter." : "Please check all fields." }, { status: 400 });
  }

  const record = {
    turbine_count: turbineCount,
    location,
    services,
    contact_name: name,
    contact_email: email,
    locale,
    privacy_version: privacyVersion,
    consent_at: new Date().toISOString(),
  };

  const supabaseHeaders: Record<string, string> = {
    apikey: supabaseKey,
    "Content-Type": "application/json",
  };
  if (!supabaseKey.startsWith("sb_secret_")) supabaseHeaders.Authorization = `Bearer ${supabaseKey}`;

  let saved: Response;
  try {
    saved = await fetch(`${supabaseUrl}/rest/v1/inspection_requests`, {
      method: "POST",
      headers: { ...supabaseHeaders, Prefer: "return=representation" },
      body: JSON.stringify(record),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Supabase request failed", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json({ error: locale === "da" ? "Databaseforbindelsen kunne ikke oprettes." : "The database connection could not be established.", code: "DATABASE_CONNECTION_FAILED" }, { status: 502 });
  }
  if (!saved.ok) {
    console.error("Supabase insert rejected", saved.status, await saved.text());
    return NextResponse.json({ error: locale === "da" ? "Forespørgslen kunne ikke gemmes. Prøv igen." : "The request could not be saved. Please try again.", code: "DATABASE_INSERT_REJECTED" }, { status: 502 });
  }

  const createdRows = await saved.json() as Array<{ id?: string }>;
  const created = createdRows[0];
  if (!created?.id) return NextResponse.json({ error: locale === "da" ? "Databasen returnerede ikke en reference." : "The database did not return a reference.", code: "DATABASE_REFERENCE_MISSING" }, { status: 502 });
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const notified = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.FORM_FROM_EMAIL || "AeroSight <notifications@aerosight.dk>",
        to: [process.env.FORM_NOTIFICATION_EMAIL || "aerosightt@gmail.com"],
        subject: "Ny inspektionsforespørgsel hos AeroSight",
        text: `En ny forespørgsel er gemt sikkert. Reference: ${created.id}`,
      }),
    });
    if (notified.ok) await fetch(`${supabaseUrl}/rest/v1/inspection_requests?id=eq.${created.id}`, {
      method: "PATCH",
      headers: supabaseHeaders,
      body: JSON.stringify({ notification_sent_at: new Date().toISOString() }),
      cache: "no-store",
    });
  }

  return NextResponse.json({ ok: true, reference: created.id }, { status: 201 });
}
