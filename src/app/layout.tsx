import { getCurrentSeason } from "@/lib/seasons";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const season = getCurrentSeason();

  return (
    <html lang="de">
      <body className={`theme-${season} min-h-screen relative`}>
        {season === 'winter' && <div className="lights absolute top-0 shadow-lg" />}
        <main className="container mx-auto px-4 pt-10">
          {children}
        </main>
      </body>
    </html>
  );
}
