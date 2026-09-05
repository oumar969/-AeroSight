import Link from "next/link";
import type { Metadata } from "next";
import { ArrowDownIcon, ArrowRightIcon, BoltIcon, BuildingOffice2Icon, CalendarDaysIcon, ChartBarIcon, CheckBadgeIcon, ClockIcon, DocumentTextIcon, FireIcon, MapPinIcon, PhotoIcon, ShieldCheckIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { CookieBanner } from "@/components/CookieBanner";
import { Header } from "@/components/Header";
import { QuoteForm } from "@/components/QuoteForm";
import { BrandLogo } from "@/components/BrandLogo";
import { copy, Lang, solutions } from "@/lib/content";
import { homeSeo, localizedMetadata } from "@/lib/seo";

export function generateStaticParams() { return [{ lang: "en" }, { lang: "da" }]; }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = raw === "da" ? "da" : "en";
  return localizedMetadata(lang, "/", homeSeo[lang]);
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params; if (raw !== "en" && raw !== "da") notFound(); const lang = raw as Lang; const t = copy[lang];
  const solutionImages = [
    ["wind-turbine-inspection-drone.png", lang === "da" ? "Drone inspicerer en vindmølle" : "Drone inspecting a wind turbine"],
    ["thermal-imaging-drone.png", lang === "da" ? "Drone udfører termisk inspektion af en vindmøllevinge" : "Drone performing thermal inspection of a wind turbine blade"],
    ["wind-farm-mapping-drone.png", lang === "da" ? "Drone kortlægger en nordisk vindpark" : "Drone mapping a Nordic wind farm"],
    ["inspection-reporting-dashboard.png", lang === "da" ? "Ingeniør gennemgår en droneinspektionsrapport" : "Engineer reviewing a drone inspection report"],
  ];
  const deliverables = lang === "da" ? [
    [DocumentTextIcon, "Tilstandsrapport for vinger", "En struktureret vurdering af hver vinge med fund, placering og alvorlighedsgrad."],
    [PhotoIcon, "Defektbilleder i høj opløsning", "Tydelige billeder af registrerede afvigelser, knyttet til den præcise placering på vingen."],
    [FireIcon, "Termisk analyserapport", "Termiske observationer, der fremhæver områder, som kræver nærmere teknisk vurdering."],
    [BuildingOffice2Icon, "Inspektion af tårn", "Visuelt overblik over overflader, samlinger og andre synlige områder på tårnet."],
    [CheckBadgeIcon, "Vurdering af nacelle", "Systematisk registrering af synlige forhold omkring nacellens ydre komponenter."],
    [WrenchScrewdriverIcon, "Vedligeholdelsesgrundlag", "Prioriterede fund, der gør det lettere at planlægge næste inspektion eller reparation."],
  ] : [
    [DocumentTextIcon, "Blade condition report", "A structured assessment of every blade with findings, locations and severity levels."],
    [PhotoIcon, "High-resolution defect images", "Clear images of identified anomalies linked to their precise position on the blade."],
    [FireIcon, "Thermal analysis report", "Thermal observations highlighting areas that require closer engineering assessment."],
    [BuildingOffice2Icon, "Tower inspection", "A visual overview of surfaces, joints and other visible areas of the tower."],
    [CheckBadgeIcon, "Nacelle assessment", "Systematic documentation of visible conditions around external nacelle components."],
    [WrenchScrewdriverIcon, "Maintenance intelligence", "Prioritized findings that make the next inspection or repair easier to plan."],
  ];
  const applications = lang === "da" ? ["Årlige inspektioner", "Vurdering efter storm", "Forsikringsdokumentation", "Garantikontrol", "Overvågning af erosion", "Teknisk due diligence", "Vedligeholdelsesplanlægning", "Inspektion før garantiudløb"] : ["Annual inspections", "Post-storm assessment", "Insurance documentation", "Warranty verification", "Erosion tracking", "Technical due diligence", "Maintenance planning", "End-of-warranty inspection"];
  const applicationIcons = [CalendarDaysIcon, BoltIcon, ShieldCheckIcon, CheckBadgeIcon, ChartBarIcon, DocumentTextIcon, WrenchScrewdriverIcon, ClockIcon];
  const advantages = lang === "da" ? [
    [ShieldCheckIcon, "Inspektion fra jorden", "Reducer behovet for arbejde i højden og indsamle data uden at sende personale ud på vingerne."],
    [FireIcon, "Visuel og termisk data", "Kombinér detaljerede billeder med termiske observationer i ét samlet beslutningsgrundlag."],
    [CheckBadgeIcon, "Ensartet dataindsamling", "Gentagelige flyvemønstre gør det lettere at sammenligne tilstanden over tid."],
    [ClockIcon, "Mindre driftsforstyrrelse", "Et effektivt inspektionsforløb begrænser tiden omkring hvert aktiv."],
    [MapPinIcon, "Fund i den rette kontekst", "Hvert fund knyttes til aktiv, komponent og placering, så det er nemt at finde igen."],
    [DocumentTextIcon, "Klar rapportering", "Resultaterne leveres i en struktur, der understøtter prioritering og vedligeholdelsesplaner."],
  ] : [
    [ShieldCheckIcon, "Ground-based inspection", "Reduce work at height and capture data without placing personnel on turbine blades."],
    [FireIcon, "Visual and thermal data", "Combine detailed imagery with thermal observations in one decision-ready view."],
    [CheckBadgeIcon, "Consistent data capture", "Repeatable flight patterns make condition changes easier to compare over time."],
    [ClockIcon, "Less operational disruption", "An efficient inspection workflow limits the time required around each asset."],
    [MapPinIcon, "Every finding in context", "Each finding is linked to the asset, component and location for easy retrieval."],
    [DocumentTextIcon, "Clear reporting", "Results arrive in a structure designed for prioritization and maintenance planning."],
  ];
  const threeSteps = lang === "da" ? [
    ["01", "Afstem opgaven", "Fortæl os om antal møller, placering og formålet med inspektionen."],
    ["02", "Vi inspicerer", "Dronen indsamler ensartede visuelle og termiske data omkring de valgte komponenter."],
    ["03", "I modtager rapporten", "Fund samles, prioriteres og leveres som et klart grundlag for næste handling."],
  ] : [
    ["01", "Scope the assignment", "Tell us the turbine count, location and purpose of the inspection."],
    ["02", "We inspect", "The drone captures consistent visual and thermal data around the selected components."],
    ["03", "Receive the report", "Findings are organized, prioritized and delivered as a clear basis for action."],
  ];
  return <main>
    <section className="grain relative min-h-[820px] overflow-hidden bg-[var(--ink)] text-white">
      <img className="absolute inset-0 h-full w-full object-cover opacity-65" src="https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=2200&q=88" alt="Offshore wind turbines at sea"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-black/20"/><Header lang={lang}/>
      <div className="shell relative z-10 flex min-h-[820px] flex-col justify-end pb-12 pt-36">
        <p className="eyebrow mb-7 text-[var(--signal)]">{lang === "da" ? "Luftbåren intelligens / Vindenergi" : "Aerial intelligence / Wind energy"}</p><h1 className="display max-w-6xl">{t.heroA}<br/>{t.heroB}</h1>
        <div className="mt-10 grid items-end gap-8 border-t border-white/25 pt-7 md:grid-cols-2"><p className="max-w-xl text-lg leading-7 text-white/80">{t.intro}</p><div className="flex flex-wrap gap-3 md:justify-end"><Link href="#contact" className="rounded-full bg-[var(--signal)] px-6 py-4 text-sm font-semibold text-[var(--ink)]">{t.primary} ↗</Link><Link href="#solutions" className="rounded-full border border-white/50 px-6 py-4 text-sm">{t.secondary}</Link></div></div>
      </div>
    </section>

    <div className="ticker-shell border-y border-black/10 bg-[var(--sand)] py-5" aria-label={lang === "da" ? "AeroSight-løsninger" : "AeroSight solutions"}><div className="ticker-track">{[0, 1].map((group)=><div key={group} className="ticker-group" aria-hidden={group === 1}>{t.ribbon.map((item, index)=><span key={`${group}-${item}`} className="ticker-item">{(index > 0 || group === 1) && <span className="ticker-dot">●</span>}<span>{item}</span></span>)}</div>)}</div></div>

    <section id="solutions" className="shell py-24 md:py-36"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow text-black/50">{t.nav[0]}</p></div><div><h2 className="section-title">{lang === "da" ? "Vurdér tilstanden på jeres aktiver. Følg udviklingen. Handl, før det bliver dyrt." : "Evaluate the condition of your asset. Track how it changes. Act before it becomes expensive."}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-black/55">{lang === "da" ? "Fra præcis dataindsamling til prioriterede fund samler AeroSight hele inspektionen i et klart beslutningsgrundlag." : "From precise data capture to prioritized findings, AeroSight turns the entire inspection into a clear basis for decisions."}</p></div></div>
      <div className="mt-20 grid gap-4 md:grid-cols-2">{solutions.map((s,i)=><Link key={s} href={`/${lang}/solutions/${s}/`} className={`group relative min-h-[380px] overflow-hidden rounded-3xl p-7 text-white ${i===0 ? "md:col-span-2 md:min-h-[560px]" : "md:min-h-[440px]"}`}><img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/${solutionImages[i][0]}`} alt={solutionImages[i][1]} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"/><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/15"/><div className="relative flex h-full flex-col justify-end"><div><h3 className="text-4xl font-medium tracking-[-.04em]">{t.ribbon[i]}</h3><p className="mt-4 flex items-center gap-2 text-sm">{lang === "da" ? "Udforsk løsningen" : "Explore solution"}<ArrowRightIcon className="h-4 transition-transform group-hover:translate-x-2"/></p></div></div></Link>)}</div>
    </section>

    <section className="border-y border-black/10 bg-[var(--sand)] py-24 md:py-32"><div className="shell"><div className="mx-auto max-w-3xl text-center"><p className="eyebrow text-black/45">{lang === "da" ? "Det modtager I" : "What you receive"}</p><h2 className="section-title mt-6">{lang === "da" ? "Leverancer, der kan handles på." : "Deliverables built for action."}</h2><p className="mt-6 text-lg leading-8 text-black/55">{lang === "da" ? "Et samlet datagrundlag til vedligeholdelsesplanlægning, dokumentation og tekniske beslutninger." : "A complete evidence base for maintenance planning, documentation and technical decisions."}</p></div><div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3">{deliverables.map(([Icon,title,body], index)=><article key={title as string} className={`border-black/10 py-9 md:p-9 ${index < 3 ? "border-b" : ""} ${index % 3 !== 2 ? "lg:border-r" : ""}`}><Icon className="h-7 w-7 text-[var(--forest)]"/><h3 className="mt-6 text-2xl font-semibold tracking-tight">{title as string}</h3><p className="mt-4 leading-7 text-black/55">{body as string}</p></article>)}</div></div></section>

    <section id="why" className="bg-[var(--forest)] py-24 text-white md:py-36"><div className="shell"><div className="mx-auto max-w-4xl text-center"><p className="eyebrow text-[var(--signal)]">{lang === "da" ? "Hvorfor AeroSight" : "Why AeroSight"}</p><h2 className="section-title mt-8">{lang === "da" ? "Et sikrere og klarere inspektionsgrundlag." : "A safer, clearer basis for inspection."}</h2><p className="mt-6 text-lg leading-8 text-white/60">{lang === "da" ? "Bygget til konsekvent dataindsamling, mindre forstyrrelse og bedre beslutninger." : "Built for consistent capture, less disruption and better decisions."}</p></div><div className="mt-20 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">{advantages.map(([Icon,title,body])=><article key={title as string} className="grid grid-cols-[auto_1fr] gap-5"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/8"><Icon className="h-6 w-6 text-[var(--signal)]"/></span><div><h3 className="text-xl font-semibold">{title as string}</h3><p className="mt-3 leading-7 text-white/55">{body as string}</p></div></article>)}</div></div></section>

    <section className="bg-[var(--snow)] py-24 md:py-32"><div className="shell"><div className="mx-auto max-w-4xl text-center"><p className="eyebrow text-black/45">{lang === "da" ? "Anvendelser" : "Applications"}</p><h2 className="section-title mt-6">{lang === "da" ? "Hvornår giver droneinspektion værdi?" : "Where does drone inspection add value?"}</h2><p className="mt-6 text-lg leading-8 text-black/55">{lang === "da" ? "Fra løbende tilstandskontrol til dokumentation før en vigtig beslutning." : "From routine condition monitoring to evidence before an important decision."}</p></div><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{applications.map((title,index)=>{const Icon=applicationIcons[index];return <article key={title} className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-black/10 bg-[var(--sand)]/45 p-7 text-center transition hover:-translate-y-1 hover:bg-white"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm"><Icon className="h-6 w-6 text-[var(--forest)]"/></span><h3 className="mt-7 text-lg font-semibold">{title}</h3></article>})}</div></div></section>

    <section id="industries" className="grid min-h-[700px] lg:grid-cols-2"><div className="relative min-h-[500px]"><img src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=1400&q=85" alt={lang === "da" ? "Vindmøllevinger" : "Wind turbine blades"} className="absolute inset-0 h-full w-full object-cover"/></div><div className="flex flex-col justify-between bg-[var(--sand)] p-8 md:p-16"><p className="eyebrow">{lang === "da" ? "Fokusbranche / Vindenergi" : "Focus industry / Wind energy"}</p><div><h2 className="section-title">{lang === "da" ? "Vinger fortæller en historie." : "Blades tell a story."}</h2><p className="mt-7 max-w-xl text-lg leading-8 text-black/60">{lang === "da" ? "Vores model hjælper med at finde tegn på erosion, revner og andre afvigelser, så vedligehold kan planlægges på et bedre grundlag." : "Our model helps identify signs of erosion, cracks and other anomalies, so maintenance can be planned with better evidence."}</p></div></div></section>

    <section id="process" className="bg-[var(--ink)] py-24 text-white md:py-32"><div className="shell"><div className="mx-auto max-w-4xl text-center"><p className="eyebrow text-[var(--signal)]">{lang === "da" ? "Sådan virker det" : "How it works"}</p><h2 className="section-title mt-7">{lang === "da" ? "Tre enkle skridt til et bedre overblik." : "Three simple steps to a clearer view."}</h2><p className="mt-6 text-lg leading-8 text-white/55">{lang === "da" ? "Fra første afstemning til en rapport, jeres team kan arbejde videre med." : "From the first conversation to a report your team can act on."}</p></div><div className="relative mt-20 grid gap-10 md:grid-cols-3"><div className="absolute left-[16.67%] right-[16.67%] top-8 hidden border-t border-[var(--signal)]/60 md:block"/>{threeSteps.map(([number,title,body])=><article key={number} className="relative text-center"><span className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--signal)] text-lg font-bold text-[var(--ink)]">{number}</span><h3 className="mt-7 text-2xl font-semibold">{title}</h3><p className="mx-auto mt-4 max-w-sm leading-7 text-white/55">{body}</p></article>)}</div><div className="mt-14 text-center"><Link href="#contact" className="inline-flex items-center gap-3 rounded-full bg-[var(--signal)] px-7 py-4 font-semibold text-[var(--ink)]">{lang === "da" ? "Bestil en inspektion" : "Request an inspection"}<ArrowRightIcon className="h-4"/></Link></div></div></section>

    <section id="contact" className="bg-[var(--ink)] py-24 text-white md:py-36"><div className="shell grid gap-16 lg:grid-cols-2"><div><p className="eyebrow text-[var(--signal)]">{t.primary}</p><h2 className="section-title mt-8">{t.quote}</h2><p className="mt-8 max-w-lg text-lg leading-8 text-white/55">{t.quoteText}</p><ArrowDownIcon className="mt-20 h-16 w-16 text-[var(--signal)]"/></div><QuoteForm lang={lang}/></div></section>

    <footer className="bg-[var(--ink)] pb-8 text-white"><div className="shell border-t border-white/20 pt-10"><p className="text-[clamp(2.6rem,7vw,7rem)] font-medium leading-none tracking-[-.06em]"><BrandLogo /></p><div className="mt-12 flex flex-wrap justify-between gap-5 text-sm text-white/50"><span>{t.footer}</span><div className="flex flex-wrap gap-5"><Link href={`/${lang}/privacy/`} className="underline">{lang === "da" ? "Privatliv og cookies" : "Privacy and cookies"}</Link><span>© {new Date().getFullYear()} AeroSight. {t.rights}</span></div></div></div></footer>
    <CookieBanner lang={lang}/>
  </main>;
}
