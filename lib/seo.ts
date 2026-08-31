import type { Metadata } from "next";
import type { Lang, Solution } from "@/lib/content";

export const siteUrl = "https://www.aerosight.dk";

export const homeSeo: Record<Lang, { title: string; description: string }> = {
  da: {
    title: "Droneinspektion af vindmøller med AI",
    description: "AeroSight leverer sikker droneinspektion af vindmøller, AI-assisteret skadesanalyse, termografi, kortlægning og handlingsklare rapporter.",
  },
  en: {
    title: "AI-Assisted Wind Turbine Drone Inspection",
    description: "AeroSight delivers safe wind turbine drone inspections, AI-assisted defect analysis, thermal imaging, mapping and actionable reports.",
  },
};

export const contactSeo: Record<Lang, { title: string; description: string }> = {
  da: {
    title: "Kontakt os om droneinspektion af vindmøller",
    description: "Fortæl AeroSight om jeres vindmøller og få de næste skridt til en sikker, effektiv og databaseret droneinspektion.",
  },
  en: {
    title: "Request a Wind Turbine Drone Inspection",
    description: "Tell AeroSight about your wind turbines and get the next steps for a safe, efficient and data-driven drone inspection.",
  },
};

export const solutionSeo: Record<Lang, Record<Solution, { title: string; description: string }>> = {
  da: {
    inspection: { title: "Droneinspektion af vindmøllevinger", description: "Ensartet droneinspektion i høj opløsning til vindmøllevinger og svært tilgængelige komponenter med mindre risiko og nedetid." },
    "thermal-imaging": { title: "Termografisk droneinspektion af vindmøller", description: "Termisk droneinspektion hjælper med at afdække varmeafvigelser og områder på vindmøller, der kræver nærmere teknisk vurdering." },
    mapping: { title: "Dronebaseret kortlægning af vindparker", description: "Præcis kortlægning forbinder inspektionsfund med placeringer og skaber et struktureret digitalt overblik over vindparkens aktiver." },
    reporting: { title: "Rapportering fra vindmølleinspektion", description: "Få klare og prioriterede rapporter fra droneinspektionen, så driftsteams kan planlægge vedligehold og handle på skader." },
  },
  en: {
    inspection: { title: "Wind Turbine Blade Drone Inspection", description: "Consistent high-resolution drone inspection for wind turbine blades and hard-to-reach components with less risk and downtime." },
    "thermal-imaging": { title: "Thermal Drone Inspection for Wind Turbines", description: "Thermal drone inspection helps reveal anomalies and wind turbine areas that require closer engineering assessment." },
    mapping: { title: "Drone Mapping for Wind Farms", description: "Precise drone mapping connects inspection findings to exact locations and creates a structured digital view of wind farm assets." },
    reporting: { title: "Actionable Wind Turbine Inspection Reports", description: "Receive clear, prioritized drone inspection reports that help operations teams plan maintenance and act on defects." },
  },
};

export function localizedMetadata(lang: Lang, path: string, seo: { title: string; description: string }): Metadata {
  const localizedPath = `/${lang}${path}`;
  const alternatePath = `/${lang === "da" ? "en" : "da"}${path}`;
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: localizedPath,
      languages: { [lang === "da" ? "da-DK" : "en"]: localizedPath, [lang === "da" ? "en" : "da-DK"]: alternatePath, "x-default": `/en${path}` },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: localizedPath,
      siteName: "AeroSight",
      locale: lang === "da" ? "da_DK" : "en_US",
      type: "website",
      images: [{ url: "/images/wind-turbine-inspection-drone.png", width: 1672, height: 941, alt: "AeroSight wind turbine drone inspection" }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: ["/images/wind-turbine-inspection-drone.png"] },
  };
}
