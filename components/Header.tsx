"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { copy, Lang } from "@/lib/content";

export function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false); const t = copy[lang]; const other = lang === "en" ? "da" : "en";
  return <header className="absolute inset-x-0 top-0 z-40 text-white">
    <div className="shell flex h-24 items-center justify-between border-b border-white/25">
      <Link href={`/${lang}/`} className="focus-ring text-xl font-semibold tracking-[-.04em]">AeroSight<span className="text-[var(--signal)]">●</span></Link>
      <nav className="hidden items-center gap-7 text-sm lg:flex">
        <Link href={`/${lang}/#solutions`}>{t.nav[0]}</Link><Link href={`/${lang}/#process`}>{t.nav[1]}</Link><Link href={`/${lang}/#industries`}>{t.nav[2]}</Link><Link href={`/${lang}/#why`}>{t.nav[3]}</Link>
      </nav>
      <div className="hidden items-center gap-5 lg:flex"><Link href={`/${other}/`} className="uppercase">{other}</Link><Link href={`/${lang}/contact/`} className="rounded-full bg-[var(--signal)] px-5 py-3 text-sm font-semibold text-[var(--ink)]">{t.talk} ↗</Link></div>
      <button aria-label="Menu" className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <XMarkIcon className="h-7"/> : <Bars3Icon className="h-7"/>}</button>
    </div>
    {open && <nav className="mx-3 rounded-b-2xl bg-[var(--ink)] p-7 text-2xl lg:hidden">{t.nav.map((item, i) => <Link key={item} onClick={() => setOpen(false)} className="block border-b border-white/20 py-4" href={`/${lang}/#${["solutions","process","industries","why"][i]}`}>{item}</Link>)}<Link onClick={() => setOpen(false)} className="block border-b border-white/20 py-4" href={`/${lang}/contact/`}>{t.talk}</Link><Link href={`/${other}/`} className="mt-6 inline-block uppercase">{other}</Link></nav>}
  </header>;
}
