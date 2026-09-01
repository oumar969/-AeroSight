import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";
import type { Lang } from "@/lib/content";
import { localizedMetadata } from "@/lib/seo";

export function generateStaticParams() { return [{ lang: "en" }, { lang: "da" }]; }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = raw === "da" ? "da" : "en";
  return localizedMetadata(lang, "/privacy/", lang === "da"
    ? { title: "Privatlivs- og cookiepolitik", description: "Læs hvordan AeroSight behandler oplysninger fra kontaktformularen og håndterer cookies." }
    : { title: "Privacy and Cookie Policy", description: "Learn how AeroSight handles contact form data and cookies." });
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (raw !== "da" && raw !== "en") notFound();
  const lang = raw as Lang;
  const da = lang === "da";
  const sections = da ? [
    ["Dataansvarlig", "AeroSight er dataansvarlig for oplysninger indsendt via hjemmesiden. Spørgsmål om privatliv og dine rettigheder kan sendes til aerosightt@gmail.com. Juridisk virksomhedsnavn, CVR og adresse tilføjes, når oplysningerne foreligger."],
    ["Oplysninger vi behandler", "Når du sender en forespørgsel, behandler vi navn, e-mail, antal vindmøller, placering, valgte ydelser, tidspunkt og den version af privatlivspolitikken, du accepterede."],
    ["Formål og behandlingsgrundlag", "Oplysningerne bruges til at vurdere din forespørgsel, kontakte dig og forberede et muligt tilbud. Behandlingen sker for at besvare din anmodning og tage skridt før en eventuel aftale."],
    ["Opbevaring og modtagere", "Forespørgsler opbevares som udgangspunkt i op til 12 måneder og slettes derefter, medmindre en længere periode er nødvendig på grund af en aftale eller et lovkrav. Vercel driver hjemmesiden, Supabase opbevarer formularoplysninger i Frankfurt, og Resend sender en kort notifikation uden formularens personoplysninger. Resend behandler e-mailmetadata i USA under deres aftalegrundlag for internationale overførsler."],
    ["Dine rettigheder", "Du kan anmode om indsigt, rettelse, sletning, begrænsning eller gøre indsigelse mod behandlingen. Kontakt aerosightt@gmail.com. Du kan også klage til Datatilsynet."],
    ["Cookies", "Hjemmesiden gemmer dit cookievalg lokalt i browseren. Statistik og marketing må først aktiveres efter dit samtykke. Der er aktuelt ikke tilkoblet Google Analytics eller annonceringssporing."],
  ] : [
    ["Data controller", "AeroSight controls personal data submitted through this website. Privacy and rights requests can be sent to aerosightt@gmail.com. Legal company name, registration number and address will be added when available."],
    ["Data we process", "When you submit an enquiry, we process your name, email, turbine count, location, selected services, submission time and the privacy-policy version you accepted."],
    ["Purpose and legal basis", "We use the data to assess your enquiry, contact you and prepare a possible proposal. Processing is necessary to answer your request and take steps before a potential agreement."],
    ["Retention and recipients", "Enquiries are normally retained for up to 12 months and then deleted unless an agreement or legal obligation requires longer retention. Vercel hosts the website, Supabase stores form data in Frankfurt, and Resend sends a short notification without the form's personal data. Resend processes email metadata in the United States under its international-transfer safeguards."],
    ["Your rights", "You may request access, correction, deletion, restriction or object to processing. Contact aerosightt@gmail.com. You may also complain to your local data-protection authority."],
    ["Cookies", "The website stores your cookie choice locally in your browser. Analytics and marketing may only be enabled after consent. Google Analytics and advertising tracking are not currently connected."],
  ];

  return <main className="min-h-screen bg-[var(--snow)] text-[var(--ink)]">
    <section className="relative bg-[var(--ink)] pb-20 pt-36 text-white"><Header lang={lang}/><div className="shell"><Link href={`/${lang}/`} className="mb-12 inline-flex items-center gap-2 text-sm text-white/60"><ArrowLeftIcon className="h-4"/>{da ? "Tilbage" : "Back"}</Link><p className="eyebrow text-[var(--signal)]">AeroSight</p><h1 className="section-title mt-6">{da ? "Privatlivs- og cookiepolitik" : "Privacy and Cookie Policy"}</h1><p className="mt-6 text-white/55">{da ? "Senest opdateret 1. september 2026" : "Last updated 1 September 2026"}</p></div></section>
    <section className="shell max-w-4xl py-20"><div className="space-y-12">{sections.map(([title, body]) => <article key={title} className="border-t border-black/15 pt-7"><h2 className="text-2xl font-medium">{title}</h2><p className="mt-4 text-lg leading-8 text-black/60">{body}</p></article>)}</div><p className="mt-16 rounded-2xl bg-[var(--sand)] p-6 text-sm leading-6 text-black/60">{da ? "Denne politik er foreløbig og opdateres, når AeroSights fulde virksomhedsoplysninger foreligger." : "This policy is preliminary and will be updated when AeroSight's complete company details are available."}</p></section>
    <CookieBanner lang={lang}/>
  </main>;
}
