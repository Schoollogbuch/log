// src/app/dashboard/student/schedule/page.tsx
"use client";

import { useState } from "react";
import { Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function StudentSchedule() {
  const tage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
  const [aktiverTag, setAktiverTag] = useState(0);

  // Beispiel-Daten (würden später aus Supabase kommen)
  const stundenplan = [
    { stunde: 1, zeit: "08:00", fach: "Mathematik", raum: "R102", lehrer: "Hr. Schmidt" },
    { stunde: 2, zeit: "08:45", fach: "Deutsch", raum: "R102", lehrer: "Fr. Müller" },
    { stunde: 3, zeit: "09:50", fach: "Englisch", raum: "Sprachraum", lehrer: "Ms. Jones" },
    { stunde: 4, zeit: "10:35", fach: "Physik", raum: "Physik-Saal", lehrer: "Hr. Kraft" },
    { stunde: 5, zeit: "11:40", fach: "Sport", raum: "Sporthalle", lehrer: "Hr. Fit" },
    { stunde: 6, zeit: "12:25", fach: "Kunst", raum: "Atelier", lehrer: "Fr. Farbe" },
  ];

  return (
    <div className="max-w-md mx-auto pb-24">
      {/* 1. Tag-Auswahl */}
      <div className="flex items-center justify-between mb-6 bg-white p-2 rounded-2xl shadow-sm border">
        <button 
          onClick={() => setAktiverTag(prev => Math.max(0, prev - 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-30"
          disabled={aktiverTag === 0}
        >
          <ChevronLeft />
        </button>
        <h2 className="font-bold text-lg">{tage[aktiverTag]}</h2>
        <button 
          onClick={() => setAktiverTag(prev => Math.min(4, prev + 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-30"
          disabled={aktiverTag === 4}
        >
          <ChevronRight />
        </button>
      </div>

      {/* 2. Stunden-Liste */}
      <div className="space-y-3">
        {stundenplan.map((s) => (
          <div key={s.stunde} className="flex gap-4 items-center">
            {/* Zeitspalte */}
            <div className="text-right w-12">
              <p className="text-xs font-bold text-gray-400">{s.zeit}</p>
              <p className="text-[10px] text-gray-300">{s.stunde}. Std</p>
            </div>

            {/* Fach-Karte */}
            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border-l-4 border-l-blue-500 border border-gray-100 flex justify-between items-center group hover:shadow-md transition">
              <div>
                <h3 className="font-bold text-slate-800">{s.fach}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[11px] text-gray-500">
                    <MapPin size={12} className="text-blue-500" /> {s.raum}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {s.lehrer}
                  </span>
                </div>
              </div>
              <Clock size={16} className="text-gray-200 group-hover:text-blue-200 transition" />
            </div>
          </div>
        ))}
      </div>

      {/* Info-Box */}
      <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
        <p className="text-xs text-blue-700 text-center font-medium italic">
          Änderungen im Stundenplan werden vom Admin in Echtzeit aktualisiert.
        </p>
      </div>
    </div>
  );
}
