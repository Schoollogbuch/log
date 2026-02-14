// src/app/dashboard/student/page.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, MessageCircle, Calendar, CheckCircle2, Circle } from "lucide-react";

export default function StudentLogbuch() {
  const [isSigned, setIsSigned] = useState(false); // Simuliert Lehrer-Unterschrift

  // Beispiel-Daten für die Woche
  const [tasks, setTasks] = useState([
    { id: 1, day: "Montag", text: "Mathe S. 45 Nr. 1-3", completed: false },
    { id: 2, day: "Dienstag", text: "Englisch Vokabeln Unit 4", completed: true },
    { id: 3, day: "Mittwoch", text: "Deutsch Aufsatz Entwurf", completed: false },
  ]);

  return (
    <div className="max-w-2xl mx-auto pb-24">
      {/* 1. Wochen-Navigation */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
        <button className="p-2 hover:bg-gray-100 rounded-full transition"><ChevronLeft size={24} /></button>
        <div className="text-center">
          <h2 className="font-bold text-lg">16. Feb — 22. Feb</h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Schuljahr 2025/26</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition"><ChevronRight size={24} /></button>
      </div>

      {/* 2. Das Logbuch (Hausaufgaben-Bereich) */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b p-4">
          <h3 className="font-bold flex items-center gap-2"><BookOpen size={18} /> Hausaufgaben</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition">
              <button 
                onClick={() => {/* Toggle Logik später */}}
                className="mt-1 text-gray-400 hover:text-blue-500 transition"
              >
                {task.completed ? <CheckCircle2 className="text-green-500" /> : <Circle />}
              </button>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase text-gray-400">{task.day}</p>
                <input 
                  type="text" 
                  value={task.text} 
                  className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-700" 
                  readOnly 
                />
              </div>
            </div>
          ))}
          <button className="w-full p-4 text-sm text-blue-500 hover:bg-blue-50 transition text-left font-medium">
            + Neue Zeile hinzufügen
          </button>
        </div>
      </div>

      {/* 3. Vergessenes & Fairness (Zwei Felder nebeneinander) */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
          <h4 className="text-xs font-bold text-red-600 uppercase mb-2">Vergessen</h4>
          <p className="text-sm text-red-800 italic">Keine Einträge</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <h4 className="text-xs font-bold text-green-600 uppercase mb-2">Fairness</h4>
          <p className="text-sm text-green-800">1x Helfen im Kiosk</p>
        </div>
      </div>

      {/* 4. Unterschriften-Status */}
      <div className="mt-6 p-6 bg-white rounded-xl border-2 border-dashed border-gray-200 text-center">
        <p className="text-sm text-gray-500 mb-1">Status Lehrkraft:</p>
        {isSigned ? (
          <span className="text-green-600 font-bold flex items-center justify-center gap-1">
            <CheckCircle2 size={18} /> UNTERSCHRIEBEN
          </span>
        ) : (
          <span className="text-red-500 font-bold italic">NICHT UNTERSCHRIEBEN</span>
        )}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-xs text-blue-600 font-semibold underline">Eltern-Unterschrift leisten</button>
        </div>
      </div>

      {/* 5. Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition">
          <MessageCircle size={24} />
          <span className="text-[10px] mt-1 font-medium">Messenger</span>
        </button>
        <button className="flex flex-col items-center text-blue-600">
          <BookOpen size={24} />
          <span className="text-[10px] mt-1 font-bold">Logbuch</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition">
          <Calendar size={24} />
          <span className="text-[10px] mt-1 font-medium">Plan</span>
        </button>
      </nav>
    </div>
  );
}
