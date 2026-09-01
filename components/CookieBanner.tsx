"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/content";

export function CookieBanner({ lang }: { lang: Lang }) {
  const [show, setShow] = useState(false); useEffect(()=>setShow(!localStorage.getItem("aerosight-consent")),[]);
  const choose = (value: string) => { localStorage.setItem("aerosight-consent", value); setShow(false); };
  if (!show) return null;
  return <aside className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-2xl rounded-2xl border border-black/10 bg-white p-5 shadow-2xl md:flex md:items-center md:gap-6">
    <p className="flex-1 text-sm leading-6 text-black/65">{lang === "da" ? "Vi bruger kun statistik-cookies med dit samtykke. Nødvendige funktioner virker altid." : "We only use analytics cookies with your consent. Essential functions always work."} <Link href={`/${lang}/privacy/`} className="underline">{lang === "da" ? "Læs privatlivspolitikken" : "Read the privacy policy"}</Link>.</p>
    <div className="mt-4 flex gap-3 md:mt-0"><button onClick={()=>choose("essential")} className="rounded-full border border-black/20 px-4 py-2 text-sm">{lang === "da" ? "Kun nødvendige" : "Essential only"}</button><button onClick={()=>choose("all")} className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm text-white">{lang === "da" ? "Acceptér" : "Accept"}</button></div>
  </aside>;
}
