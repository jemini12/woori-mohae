import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Woori Mohae · Family Concierge",
  description:
    "Woori Mohae pairs OpenAI Agent Builder with AgentKit to design family itineraries, routines, and backups tailored to Korean households.",
  openGraph: {
    title: "Woori Mohae · Family Concierge",
    description:
      "Production-ready AgentKit workflow that curates schedules, routines, and weather-aware backups for families across South Korea.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Woori Mohae · Family Concierge",
    description:
      "Agent-powered planning assistant that turns family details into clickable itineraries with routines and contingencies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="chatkit-script"
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="beforeInteractive"
          onLoad={() => console.info("[Woori Mohae] ChatKit script loaded")}
          onError={() => console.error("[Woori Mohae] Failed to load ChatKit script")}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
