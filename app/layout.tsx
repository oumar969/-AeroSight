import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AeroSight — Drone inspection, made actionable",
  description: "Drone-based wind turbine inspections, AI-assisted analysis and clear reporting.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
