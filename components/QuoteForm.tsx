"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import type { Lang } from "@/lib/content";

const serviceOptions = [
  ["inspection", "Visuel inspektion", "Visual inspection"],
  ["thermal-imaging", "Termografi", "Thermal imaging"],
  ["mapping", "Kortlægning", "Mapping"],
  ["reporting", "Komplet rapport", "Complete report"],
] as const;

export function QuoteForm({ lang }: { lang: Lang }) {
  const da = lang === "da";
  const enabled = process.env.NEXT_PUBLIC_FORM_ENABLED === "true";
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [data, setData] = useState({ turbineCount: "", location: "", services: ["inspection"], name: "", email: "", privacyAccepted: false, website: "" });

  const toggleService = (service: string) => setData((current) => ({ ...current, services: current.services.includes(service) ? current.services.filter((item) => item !== service) : [...current.services, service] }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError("");
    if (step < 2) { setStep((current) => current + 1); return; }
    if (!enabled) { setError(da ? "Formularen aktiveres, når vores sikre dataløsning og privatlivspolitik er klar." : "The form will be enabled when our secure data solution and privacy policy are ready."); return; }
    if (!data.services.length || !data.privacyAccepted) { setError(da ? "Vælg mindst én løsning og godkend privatlivspolitikken." : "Choose at least one service and accept the privacy policy."); return; }
    setSending(true);
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, locale: lang, privacyVersion: "2026-09-01", startedAt }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || (da ? "Forespørgslen kunne ikke sendes." : "The request could not be sent."));
      setDone(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : (da ? "Der opstod en fejl." : "Something went wrong.")); }
    finally { setSending(false); }
  };

  if (done) return <div className="flex min-h-[380px] flex-col items-start justify-center rounded-3xl bg-white p-8 text-[var(--ink)]"><span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--signal)]"><CheckIcon className="h-7"/></span><h3 className="text-3xl font-medium">{da ? "Tak — forespørgslen er modtaget." : "Thank you — your request was received."}</h3><p className="mt-4 max-w-md text-black/60">{da ? "Oplysningerne er gemt sikkert. Vi vender normalt tilbage inden for 1–2 arbejdsdage." : "Your details were stored securely. We usually reply within 1–2 business days."}</p><button onClick={() => { setDone(false); setStep(0); setStartedAt(Date.now()); }} className="mt-8 underline">{da ? "Send en ny" : "Send another"}</button></div>;

  return <form onSubmit={submit} className="min-h-[430px] rounded-3xl bg-white p-6 text-[var(--ink)] md:p-9">
    <div className="mb-10 flex items-center justify-between"><span className="eyebrow">{da ? "Forespørgsel" : "Inspection request"}</span><span className="text-sm text-black/45">0{step + 1} / 03</span></div>
    {step === 0 && <fieldset><legend className="mb-2 text-3xl font-medium tracking-tight">{da ? "Hvad skal vi inspicere?" : "What should we inspect?"}</legend><p className="mb-7 text-sm leading-6 text-black/50">{da ? "Udfyld begge felter, så vi kan vurdere opgaven." : "Complete both fields so we can assess the assignment."}</p><div className="grid gap-4"><div className="rounded-2xl border border-black/10 bg-[var(--snow)] p-4 focus-within:border-[var(--forest)]"><label htmlFor="turbine-count" className="mb-2 block text-sm font-semibold">{da ? "Antal vindmøller" : "Number of turbines"}</label><input id="turbine-count" value={data.turbineCount} onChange={(event) => setData({ ...data, turbineCount: event.target.value })} required type="number" min="1" max="100000" placeholder={da ? "F.eks. 12" : "E.g. 12"} className="w-full border-0 bg-transparent p-0 text-lg outline-none placeholder:text-black/30"/></div><div className="rounded-2xl border border-black/10 bg-[var(--snow)] p-4 focus-within:border-[var(--forest)]"><label htmlFor="site-location" className="mb-2 block text-sm font-semibold">{da ? "Placering" : "Location"}</label><input id="site-location" value={data.location} onChange={(event) => setData({ ...data, location: event.target.value })} required maxLength={300} autoComplete="address-level2" placeholder={da ? "By, region eller koordinater" : "City, region or coordinates"} className="w-full border-0 bg-transparent p-0 text-lg outline-none placeholder:text-black/30"/></div></div></fieldset>}
    {step === 1 && <fieldset><legend className="mb-7 text-3xl font-medium tracking-tight">{da ? "Hvad har I brug for?" : "What do you need?"}</legend><div className="grid gap-3">{serviceOptions.map(([value, daLabel, enLabel]) => <label key={value} className="flex cursor-pointer items-center gap-4 rounded-xl border border-black/15 p-4 hover:border-[var(--forest)]"><input type="checkbox" checked={data.services.includes(value)} onChange={() => toggleService(value)}/><span>{da ? daLabel : enLabel}</span></label>)}</div></fieldset>}
    {step === 2 && <fieldset><legend className="mb-7 text-3xl font-medium tracking-tight">{da ? "Hvordan kontakter vi jer?" : "How can we reach you?"}</legend><label htmlFor="contact-name" className="mb-3 block text-sm">{da ? "Navn" : "Name"}</label><input id="contact-name" value={data.name} onChange={(event) => setData({ ...data, name: event.target.value })} required maxLength={150} autoComplete="name" className="w-full rounded-xl border border-black/20 p-4"/><label htmlFor="contact-email" className="mb-3 mt-5 block text-sm">E-mail</label><input id="contact-email" value={data.email} onChange={(event) => setData({ ...data, email: event.target.value })} required maxLength={320} type="email" autoComplete="email" className="w-full rounded-xl border border-black/20 p-4"/><div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" value={data.website} onChange={(event) => setData({ ...data, website: event.target.value })} tabIndex={-1} autoComplete="off"/></div>{enabled && <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-black/60"><input type="checkbox" checked={data.privacyAccepted} onChange={(event) => setData({ ...data, privacyAccepted: event.target.checked })} required className="mt-1"/><span>{da ? "Jeg har læst og accepterer " : "I have read and accept the "}<Link href={`/${lang}/privacy/`} className="underline">{da ? "privatlivspolitikken" : "privacy policy"}</Link>.</span></label>}{!enabled && <p className="mt-6 rounded-xl bg-[var(--sand)] p-4 text-sm leading-6 text-black/60">{da ? "Sikker afsendelse er under opsætning. Formularen gemmer eller sender endnu ikke oplysninger." : "Secure delivery is being configured. The form does not store or send information yet."}</p>}</fieldset>}
    {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    <div className="mt-10 flex items-center justify-between">{step > 0 ? <button type="button" onClick={() => { setError(""); setStep((current) => current - 1); }} className="flex items-center gap-2 text-sm"><ArrowLeftIcon className="h-4"/>{da ? "Tilbage" : "Back"}</button> : <span/>}<button disabled={sending} className="flex items-center gap-3 rounded-full bg-[var(--ink)] px-6 py-4 text-sm font-semibold text-white disabled:opacity-60">{sending ? (da ? "Sender…" : "Sending…") : step === 2 ? (da ? "Send forespørgsel" : "Send request") : (da ? "Fortsæt" : "Continue")}<ArrowRightIcon className="h-4"/></button></div>
  </form>;
}
