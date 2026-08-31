import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aero-sight-phi.vercel.app"),
  title: { default: "AeroSight | Drone Inspection for Wind Turbines", template: "%s | AeroSight" },
  description: "Drone-based wind turbine inspections, AI-assisted analysis and clear reporting.",
  applicationName: "AeroSight",
  category: "Wind energy",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
