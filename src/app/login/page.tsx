// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Die wichtige Domain-Prüfung
    // Später können wir hier eine Liste von erlaubten Domains hinzufügen
    const allowedDomains = ["@cskiel.org"];
    const isAllowed = allowedDomains.some((domain) => email.endsWith(domain));

    if (!isAllowed) {
      setError("Zugriff verweigert. Nur E-Mails von @cskiel.org sind aktuell erlaubt.");
      return;
    }

    // Für den Prototyp: Wenn Passwort nicht leer, lass ihn rein
    if (password.length < 6) {
      setError("Das Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    // Simulierter Erfolg: Weiterleitung zum Dashboard
    console.log("Login erfolgreich!");
    router.push("/dashboard"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-opacity-20">
        <h1 className="text-3xl font-bold text-center mb-2">Schoollog</h1>
        <p className="text-center text-gray-500 mb-8">Melde dich mit deiner Schul-E-Mail an</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">E-Mail Adresse</label>
            <input
              type="email"
              placeholder="name@cskiel.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Passwort</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-lg"
          >
            Anmelden
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400 uppercase tracking-widest">
          Professionell entwickelt für Schulen
        </div>
      </div>
    </div>
  );
}
