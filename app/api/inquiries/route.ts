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
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
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

  const saved = await fetch(`${supabaseUrl}/rest/v1/inspection_requests`, {
    method: "POST",
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(record),
    cache: "no-store",
  });
  if (!saved.ok) return NextResponse.json({ error: locale === "da" ? "Forespørgslen kunne ikke gemmes. Prøv igen." : "The request could not be saved. Please try again." }, { status: 502 });

  const [created] = await saved.json() as Array<{ id: string }>;
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
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ notification_sent_at: new Date().toISOString() }),
      cache: "no-store",
    });
  }

  return NextResponse.json({ ok: true, reference: created.id }, { status: 201 });
}
