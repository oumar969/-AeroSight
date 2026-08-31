import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { copy, Lang, solutionCopy, solutions, Solution } from "@/lib/content";
import { localizedMetadata, solutionSeo } from "@/lib/seo";

export function generateStaticParams() { return (["en","da"] as Lang[]).flatMap(lang => solutions.map(slug => ({ lang, slug }))); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang: rawLang, slug: rawSlug } = await params;
  if ((rawLang !== "en" && rawLang !== "da") || !solutions.includes(rawSlug as Solution)) return {};
  const lang = rawLang as Lang;
  const slug = rawSlug as Solution;
  return localizedMetadata(lang, `/solutions/${slug}/`, solutionSeo[lang][slug]);
}

export default async function SolutionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug: rawSlug } = await params; if ((rawLang !== "en" && rawLang !== "da") || !solutions.includes(rawSlug as Solution)) notFound(); const lang = rawLang as Lang; const data = solutionCopy[lang][rawSlug as Solution];
  return <main className="min-h-screen bg-[var(--forest)] text-white"><div className="relative min-h-[640px]"><Header lang={lang}/><div className="shell flex min-h-[640px] flex-col justify-end pb-20 pt-40"><p className="eyebrow text-[var(--signal)]">AeroSight / {copy[lang].nav[0]}</p><h1 className="display mt-8 max-w-6xl">{data.title}</h1><p className="mt-10 max-w-xl text-xl text-white/65">{data.lead}</p></div></div><section className="bg-[var(--snow)] py-24 text-[var(--ink)]"><div className="shell grid gap-10 md:grid-cols-2"><h2 className="section-title">{data.body}</h2><div className="flex items-end"><Link href={`/${lang}/#contact`} className="rounded-full bg-[var(--signal)] px-6 py-4 font-semibold">{copy[lang].primary} ↗</Link></div></div></section></main>;
}
