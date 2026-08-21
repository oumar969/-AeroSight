import Link from "next/link";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { CookieBanner } from "@/components/CookieBanner";
import { Header } from "@/components/Header";
import { QuoteForm } from "@/components/QuoteForm";
import { copy, Lang, solutions } from "@/lib/content";

export function generateStaticParams() { return [{ lang: "en" }, { lang: "da" }]; }

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params; if (raw !== "en" && raw !== "da") notFound(); const lang = raw as Lang; const t = copy[lang];
  const solutionImages = [
    ["wind-turbine-inspection-drone.png", lang === "da" ? "Drone inspicerer en vindmølle" : "Drone inspecting a wind turbine"],
    ["thermal-imaging-drone.png", lang === "da" ? "Drone udfører termisk inspektion af en vindmøllevinge" : "Drone performing thermal inspection of a wind turbine blade"],
    ["wind-farm-mapping-drone.png", lang === "da" ? "Drone kortlægger en nordisk vindpark" : "Drone mapping a Nordic wind farm"],
    ["inspection-reporting-dashboard.png", lang === "da" ? "Ingeniør gennemgår en droneinspektionsrapport" : "Engineer reviewing a drone inspection report"],
  ];
  return <main>
    <section className="grain relative min-h-[820px] overflow-hidden bg-[var(--ink)] text-white">
      <img className="absolute inset-0 h-full w-full object-cover opacity-65" src="https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=2200&q=88" alt="Offshore wind turbines at sea"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-black/20"/><Header lang={lang}/>
      <div className="shell relative z-10 flex min-h-[820px] flex-col justify-end pb-12 pt-36">
        <p className="eyebrow mb-7 text-[var(--signal)]">Aerial intelligence / Wind energy</p><h1 className="display max-w-6xl">{t.heroA}<br/>{t.heroB}</h1>
        <div className="mt-10 grid items-end gap-8 border-t border-white/25 pt-7 md:grid-cols-2"><p className="max-w-xl text-lg leading-7 text-white/80">{t.intro}</p><div className="flex flex-wrap gap-3 md:justify-end"><Link href="#contact" className="rounded-full bg-[var(--signal)] px-6 py-4 text-sm font-semibold text-[var(--ink)]">{t.primary} ↗</Link><Link href="#solutions" className="rounded-full border border-white/50 px-6 py-4 text-sm">{t.secondary}</Link></div></div>
      </div>
    </section>

    <div className="overflow-hidden border-b border-black/10 bg-[var(--sand)] py-5"><div className="flex min-w-max animate-none gap-14 px-5">{[...t.ribbon,...t.ribbon].map((x,i)=><span key={i} className="flex items-center gap-14 text-sm font-semibold uppercase tracking-widest">{x}<span className="text-[var(--forest)]">●</span></span>)}</div></div>

    <section id="solutions" className="shell py-24 md:py-36"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow text-black/50">{t.nav[0]}</p></div><div><h2 className="section-title">{lang === "da" ? "Én flyvning. Et fuldt billede." : "One flight. The full picture."}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-black/55">{lang === "da" ? "Fra præcis dataindsamling til prioriterede fund samler AeroSight hele inspektionen i et klart beslutningsgrundlag." : "From precise data capture to prioritized findings, AeroSight turns the entire inspection into a clear basis for decisions."}</p></div></div>
      <div className="mt-20 grid gap-4 md:grid-cols-2">{solutions.map((s,i)=><Link key={s} href={`/${lang}/solutions/${s}/`} className={`group relative min-h-[380px] overflow-hidden rounded-3xl p-7 text-white ${i===0 ? "md:col-span-2 md:min-h-[560px]" : "md:min-h-[440px]"}`}><img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/${solutionImages[i][0]}`} alt={solutionImages[i][1]} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"/><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/15"/><div className="relative flex h-full flex-col justify-end"><div><h3 className="text-4xl font-medium tracking-[-.04em]">{t.ribbon[i]}</h3><p className="mt-4 flex items-center gap-2 text-sm">{lang === "da" ? "Udforsk løsningen" : "Explore solution"}<ArrowRightIcon className="h-4 transition-transform group-hover:translate-x-2"/></p></div></div></Link>)}</div>
    </section>

    <section id="why" className="bg-[var(--forest)] py-24 text-white md:py-36"><div className="shell"><p className="eyebrow text-[var(--signal)]">{t.whyLabel}</p><h2 className="section-title mt-8 max-w-5xl">{t.whyTitle}</h2><div className="mt-20 grid border-t border-white/25 md:grid-cols-3">{t.reasons.map((r)=><article key={r[0]} className="border-b border-white/25 py-8 md:border-b-0 md:border-r md:p-8 md:first:pl-0 md:last:border-0"><h3 className="mt-10 text-3xl font-medium">{r[0]}</h3><p className="mt-5 leading-7 text-white/60">{r[1]}</p></article>)}</div></div></section>

    <section id="industries" className="grid min-h-[700px] lg:grid-cols-2"><div className="relative min-h-[500px]"><img src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=1400&q=85" alt="Wind turbine blades" className="absolute inset-0 h-full w-full object-cover"/></div><div className="flex flex-col justify-between bg-[var(--sand)] p-8 md:p-16"><p className="eyebrow">{lang === "da" ? "Fokusbranche / Vindenergi" : "Focus industry / Wind energy"}</p><div><h2 className="section-title">{lang === "da" ? "Vinger fortæller en historie." : "Blades tell a story."}</h2><p className="mt-7 max-w-xl text-lg leading-8 text-black/60">{lang === "da" ? "Vores model hjælper med at finde tegn på erosion, revner og andre afvigelser, så vedligehold kan planlægges på et bedre grundlag." : "Our model helps identify signs of erosion, cracks and other anomalies, so maintenance can be planned with better evidence."}</p></div></div></section>

    <section id="process" className="shell py-24 md:py-36"><p className="eyebrow text-black/50">{t.processLabel}</p><h2 className="section-title mt-8">{t.processTitle}</h2><div className="mt-20">{t.process.map(p=><article key={p[0]} className="group grid gap-5 border-t border-black/15 py-7 transition-colors hover:bg-[var(--mist)] md:grid-cols-[.75fr_1.25fr] md:px-5"><h3 className="text-3xl font-medium">{p[1]}</h3><p className="max-w-xl leading-7 text-black/55">{p[2]}</p></article>)}</div></section>

    <section id="contact" className="bg-[var(--ink)] py-24 text-white md:py-36"><div className="shell grid gap-16 lg:grid-cols-2"><div className="flex flex-col justify-between"><div><p className="eyebrow text-[var(--signal)]">{t.primary}</p><p className="mt-8 max-w-lg text-xl leading-8 text-white/65">{t.quoteText}</p></div><ArrowDownIcon className="mt-20 h-16 w-16 text-[var(--signal)]"/></div><QuoteForm lang={lang}/></div></section>

    <footer className="bg-[var(--ink)] pb-8 text-white"><div className="shell border-t border-white/20 pt-10"><p className="text-[clamp(2.6rem,7vw,7rem)] font-medium leading-none tracking-[-.06em]">AeroSight<span className="text-[var(--signal)]">●</span></p><div className="mt-12 flex flex-wrap justify-between gap-5 text-sm text-white/50"><span>{t.footer}</span><span>© {new Date().getFullYear()} AeroSight. {t.rights}</span></div></div></footer>
    <CookieBanner lang={lang}/>
  </main>;
}
