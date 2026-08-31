import Link from "next/link";
import { ArrowLeftIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { CookieBanner } from "@/components/CookieBanner";
import { Header } from "@/components/Header";
import { QuoteForm } from "@/components/QuoteForm";
import { copy, Lang } from "@/lib/content";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "da" }];
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (raw !== "en" && raw !== "da") notFound();
  const lang = raw as Lang;
  const t = copy[lang];
  const da = lang === "da";

  return <main className="min-h-screen bg-[var(--ink)] text-white">
    <section className="relative overflow-hidden border-b border-white/15">
      <div className="absolute -right-44 top-24 h-[520px] w-[520px] rounded-full border border-white/10" />
      <div className="absolute -right-20 top-56 h-[280px] w-[280px] rounded-full border border-[var(--signal)]/25" />
      <Header lang={lang} />
      <div className="shell relative z-10 pb-24 pt-40 md:pb-32 md:pt-52">
        <Link href={`/${lang}/`} className="focus-ring mb-16 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
          <ArrowLeftIcon className="h-4 w-4" />{da ? "Tilbage til forsiden" : "Back to home"}
        </Link>
        <p className="eyebrow text-[var(--signal)]">{da ? "Kontakt AeroSight" : "Contact AeroSight"}</p>
        <h1 className="display mt-8 max-w-6xl">{da ? "Lad os se nærmere på jeres aktiver." : "Let’s take a closer look at your assets."}</h1>
        <p className="mt-10 max-w-2xl text-lg leading-8 text-white/60">{da ? "Fortæl os om jeres vindmøller og behov. Vi vender tilbage med de næste skridt til en sikker og effektiv inspektion." : "Tell us about your turbines and inspection needs. We’ll get back to you with the next steps for a safe and efficient inspection."}</p>
      </div>
    </section>

    <section className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
      <aside className="flex flex-col justify-between">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          <div className="border-t border-white/20 pt-5"><p className="eyebrow text-white/40">{da ? "Svartid" : "Response time"}</p><p className="mt-4 text-xl">{da ? "Normalt inden for 1–2 arbejdsdage" : "Usually within 1–2 business days"}</p></div>
          <div className="border-t border-white/20 pt-5"><p className="eyebrow text-white/40">{da ? "Fokusområde" : "Current focus"}</p><p className="mt-4 text-xl">{da ? "Droneinspektion af vindmøller" : "Drone inspection of wind turbines"}</p></div>
          <div className="border-t border-white/20 pt-5"><p className="eyebrow text-white/40">{da ? "Dækning" : "Coverage"}</p><p className="mt-4 text-xl">{da ? "Onshore og offshore" : "Onshore and offshore"}</p></div>
        </div>
        <ArrowDownIcon className="mt-16 hidden h-14 w-14 text-[var(--signal)] lg:block" />
      </aside>
      <QuoteForm lang={lang} />
    </section>

    <footer className="border-t border-white/15 py-8"><div className="shell flex flex-wrap items-center justify-between gap-4 text-sm text-white/45"><Link href={`/${lang}/`} className="text-lg font-semibold tracking-[-.04em] text-white">AeroSight<span className="text-[var(--signal)]">●</span></Link><span>© {new Date().getFullYear()} AeroSight. {t.rights}</span></div></footer>
    <CookieBanner lang={lang} />
  </main>;
}
