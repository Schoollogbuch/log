"use client";

import { useState } from "react";
import { Users, Calendar, ShieldAlert, UserMinus, ArrowRightLeft, Save } from "lucide-react";

export default function AdminDashboard() {
  const [view, setView] = useState<"users" | "schedule">("users");

  // Beispiel-Daten für die Schülerverwaltung
  const [students, setStudents] = useState([
    { id: "1", name: "Max Mustermann", email: "max@cskiel.org", klasse: "5b" },
    { id: "2", name: "Erika Muster", email: "erika@cskiel.org", klasse: "8a" },
  ]);

  // Funktion: Schüler in eine andere Klasse verschieben
  const moveStudent = (id: string, newKlasse: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, klasse: newKlasse } : s));
    alert(`Schüler wurde nach ${newKlasse} verschoben`);
  };

  // Funktion: Schüler entfernen
  const kickStudent = (id: string) => {
    if(confirm("Soll dieser Schüler wirklich entfernt werden?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin-Konsole</h1>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border">
          <button 
            onClick={() => setView("users")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${view === "users" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
          >
            User-Management
          </button>
          <button 
            onClick={() => setView("schedule")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${view === "schedule" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
          >
            Stundenplan-Editor
          </button>
        </div>
      </div>

      {view === "users" ? (
        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-xs font-bold uppercase text-gray-400">Name / E-Mail</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-400">Aktuelle Klasse</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-400">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="font-bold">{student.name}</div>
                    <div className="text-xs text-gray-400">{student.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold text-sm">
                      {student.klasse}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button 
                      onClick={() => moveStudent(student.id, "8a")}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition title='Klasse ändern'"
                    >
                      <ArrowRightLeft size={18} />
                    </button>
                    <button 
                      onClick={() => kickStudent(student.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition title='Rauskicken'"
                    >
                      <UserMinus size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-xl border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="text-blue-600" /> Stundenplan für Klasse 9b
            </h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-green-700">
              <Save size={18} /> Plan Speichern
            </button>
          </div>
          
          {/* Simulierter Stundenplan-Editor */}
          <div className="grid grid-cols-6 gap-2 text-center text-xs font-bold text-gray-500 uppercase mb-2">
            <div>Zeit</div><div>Mo</div><div>Di</div><div>Mi</div><div>Do</div><div>Fr</div>
          </div>
          {[1, 2, 3, 4, 5, 6].map((stunde) => (
            <div key={stunde} className="grid grid-cols-6 gap-2 mb-2">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center font-bold">{stunde}.</div>
              {[1, 2, 3, 4, 5].map((tag) => (
                <input 
                  key={tag}
                  type="text"
                  placeholder="Fach..."
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center text-sm"
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
