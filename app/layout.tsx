import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | TRIM",
    default: "Dashboard | TRIM",
  },
  description: "AI-Powered Barbershop Information System",
  icons: {
    icon: "/logo/logo-app.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
