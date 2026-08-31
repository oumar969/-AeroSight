import type { MetadataRoute } from "next";
import { solutions } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/contact/", ...solutions.map((slug) => `/solutions/${slug}/`)];
  return paths.flatMap((path) => (["da", "en"] as const).map((lang) => ({
    url: `${siteUrl}/${lang}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : path === "/contact/" ? 0.8 : 0.9,
    alternates: { languages: { "da-DK": `${siteUrl}/da${path}`, en: `${siteUrl}/en${path}` } },
  })));
}
