// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getCurrentSeason } from "@/lib/seasons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Schoollog - Dein Logbuch",
  description: "Das digitale Logbuch für Schüler und Lehrer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Jahreszeit abfragen
  const season = getCurrentSeason();

  return (
    <html lang="de">
      {/* Wir hängen das Design (z.B. theme-winter) direkt an den Body an */}
      <body className={`${inter.className} theme-${season} min-h-screen`}>
        
        {/* Special: Lichterkette nur im Winter anzeigen */}
        {season === 'winter' && <div className="christmas-lights absolute top-0 left-0 w-full z-50"></div>}
        
        {/* Hier wird der Inhalt der jeweiligen Seite (Login, Logbuch etc.) geladen */}
        <main className="pt-8 pb-20 max-w-md mx-auto h-full">
          {children}
        </main>
        
      </body>
    </html>
  );
}
