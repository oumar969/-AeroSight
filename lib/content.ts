export type Lang = "en" | "da";

export const solutions = ["inspection", "thermal-imaging", "mapping", "reporting"] as const;
export type Solution = (typeof solutions)[number];

export const copy = {
  en: {
    nav: ["Solutions", "How it works", "Industries", "Why AeroSight"], talk: "Let’s talk",
    heroA: "See more.", heroB: "Stop less.",
    intro: "Drone-based wind turbine inspection, captured in the field, analyzed by AI, and delivered as data your team can act on.",
    primary: "Request an inspection", secondary: "Explore solutions", scroll: "Scroll to discover",
    ribbon: ["Inspection", "Thermal imaging", "Mapping", "Reporting"],
    whyLabel: "Why drone-based inspection", whyTitle: "Built to change what an inspection costs you.",
    reasons: [
      ["Remove risk", "No personnel on turbines or unstable structures. Every inspection is flown safely from the ground."],
      ["Reduce downtime", "Faster inspections keep turbines operating instead of shutting down for lengthy manual checks."],
      ["Find what matters", "AI-assisted analysis flags likely defects, so engineers spend time on decisions—not scanning footage."],
    ],
    processLabel: "From flight to decision", processTitle: "A clearer way to inspect.",
    process: [["01", "Plan", "We align scope, assets and operational constraints."], ["02", "Capture", "Certified pilots collect consistent, high-resolution data."], ["03", "Analyze", "Our model identifies and categorizes areas that need attention."], ["04", "Act", "You receive a clear report built around next steps."]],
    quote: "Know the condition of every blade without putting a person on one.", quoteText: "Start with a few details. We’ll shape the inspection around your site.",
    footer: "A better view of your assets.", rights: "All rights reserved.",
  },
  da: {
    nav: ["Løsninger", "Sådan virker det", "Brancher", "Hvorfor AeroSight"], talk: "Lad os tale",
    heroA: "Se mere.", heroB: "Stop mindre.",
    intro: "Dronebaseret inspektion af vindmøller, indsamlet i felten, analyseret med AI og leveret som data, dit team kan handle på.",
    primary: "Bestil en inspektion", secondary: "Se løsninger", scroll: "Scroll for at udforske",
    ribbon: ["Inspektion", "Termografi", "Kortlægning", "Rapportering"],
    whyLabel: "Hvorfor dronebaseret inspektion", whyTitle: "Skabt til at ændre, hvad en inspektion koster jer.",
    reasons: [
      ["Fjern risiko", "Ingen medarbejdere på vindmøller eller ustabile konstruktioner. Inspektionen flyves sikkert fra jorden."],
      ["Reducer nedetid", "Hurtigere inspektioner holder møllerne i drift frem for lange stop til manuelle kontroller."],
      ["Find det vigtige", "AI-assisteret analyse markerer mulige skader, så ingeniører kan træffe beslutninger frem for at gennemse optagelser."],
    ],
    processLabel: "Fra flyvning til beslutning", processTitle: "En klarere måde at inspicere på.",
    process: [["01", "Planlæg", "Vi afstemmer omfang, aktiver og driftsmæssige hensyn."], ["02", "Indsaml", "Certificerede piloter indsamler ensartede data i høj opløsning."], ["03", "Analysér", "Vores model finder og kategoriserer områder, som kræver opmærksomhed."], ["04", "Handl", "I modtager en tydelig rapport bygget op omkring de næste skridt."]],
    quote: "Kend tilstanden på hver vinge uden at sætte en person på den.", quoteText: "Start med nogle få oplysninger. Vi tilpasser inspektionen til jeres site.",
    footer: "Et bedre overblik over jeres aktiver.", rights: "Alle rettigheder forbeholdes.",
  },
} as const;

export const solutionCopy: Record<Lang, Record<Solution, { title: string; lead: string; body: string }>> = {
  en: {
    inspection: { title: "Autonomous inspection", lead: "Consistent capture. Less downtime.", body: "High-resolution visual inspection built for wind turbine blades and hard-to-reach components." },
    "thermal-imaging": { title: "Thermal imaging", lead: "See what the eye cannot.", body: "Thermal data helps reveal anomalies and areas that may require closer engineering attention." },
    mapping: { title: "Precise mapping", lead: "Every finding, in context.", body: "A structured view of your assets connects observations to exact locations and repeatable records." },
    reporting: { title: "Actionable reporting", lead: "From data to next step.", body: "Clear, prioritized findings help operations teams plan maintenance and communicate decisions." },
  },
  da: {
    inspection: { title: "Autonom inspektion", lead: "Ensartet data. Mindre nedetid.", body: "Visuel inspektion i høj opløsning udviklet til vindmøllevinger og svært tilgængelige komponenter." },
    "thermal-imaging": { title: "Termografi", lead: "Se det, øjet ikke kan.", body: "Termiske data hjælper med at afdække afvigelser og områder, der kræver nærmere teknisk vurdering." },
    mapping: { title: "Præcis kortlægning", lead: "Hvert fund i sin rette kontekst.", body: "Et struktureret overblik forbinder observationer med præcise placeringer og sammenlignelige registreringer." },
    reporting: { title: "Handlingsklar rapportering", lead: "Fra data til næste skridt.", body: "Tydelige, prioriterede fund hjælper driftsteams med at planlægge vedligehold og formidle beslutninger." },
  },
};
