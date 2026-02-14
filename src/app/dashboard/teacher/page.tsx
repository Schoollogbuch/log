// src/app/dashboard/teacher/page.tsx
"use client";

import { useState } from "react";
import { Users, ClipboardCheck, MessageSquare, Send } from "lucide-react";

export default function TeacherDashboard() {
  const [selectedKlasse, setSelectedKlasse] = useState(null);

  // Beispiel-Daten
  const klassen = ["5a", "5b", "9b", "10a"];
  const schueler = [
    { id: 1, name: "Max Mustermann", status: "anwesend", vergessen: 0 },
    { id: 2, name: "Lina Schmidt", status: "anwesend", vergessen: 1 },
    { id: 3, name: "Tom Meyer", status: "fehlt", vergessen: 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <h1 className="text-2xl font-bold mb-6">Lehrer-Bereich</h1>

      {!selectedKlasse ? (
        <div className="grid grid-cols-2 gap-4">
          {klassen.map((k) => (
            <button 
              key={k} 
              onClick={() => setSelectedKlasse(k)}
              className="p-8 bg-white rounded-2xl shadow-sm border hover:border-blue-500 transition text-2xl font-bold"
            >
              Klasse {k}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header für die Klasse */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
            <button onClick={() => setSelectedKlasse(null)} className="text-blue-500 text-sm">← Zurück</button>
            <h2 className="font-bold text-xl">Klasse {selectedKlasse}</h2>
            <div className="w-10"></div>
          </div>

          {/* Schüler-Tabelle */}
          <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-4">Schüler</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">HAs vergessen</th>
                  <th className="p-4">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {schueler.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{s.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${s.status === 'anwesend' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-4">{s.vergessen}x</td>
                    <td className="p-4">
                      <button className="text-xs bg-gray-100 p-1 rounded">+ Eintrag</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Der Unterschriften-Button */}
          <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg flex flex-col items-center gap-4 text-center">
            <div>
              <h3 className="font-bold text-lg">Woche fertig geprüft?</h3>
              <p className="text-blue-100 text-sm">Mit einem Klick unterschreibst du für die gesamte Klasse.</p>
            </div>
            <button 
              onClick={() => alert("Unterschrift für die ganze Klasse gesendet!")}
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-blue-50 transition"
            >
              <Send size={18} /> Unterschrift senden
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav für Lehrer */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-3 flex justify-between items-center">
        <button className="flex flex-col items-center text-blue-600"><ClipboardCheck size={24} /> <span className="text-[10px]">Tabelle</span></button>
        <button className="flex flex-col items-center text-gray-400"><MessageSquare size={24} /> <span className="text-[10px]">Messenger</span></button>
        <button className="flex flex-col items-center text-gray-400"><Users size={24} /> <span className="text-[10px]">Anwesenheit</span></button>
      </nav>
    </div>
  );
}
