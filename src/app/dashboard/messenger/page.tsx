// src/app/dashboard/messenger/page.tsx
"use client";

import { useState } from "react";
import { Send, ArrowLeft, MoreVertical, Smile } from "lucide-react";

export default function Messenger() {
  const [message, setMessage] = useState("");
  
  // Beispiel-Nachrichten (Simulierter Chatverlauf der 9b)
  const [chatLog, setChatLog] = useState([
    { id: 1, sender: "Lukas", text: "Habt ihr die Mathe-Hausaufgaben verstanden?", time: "08:15", isMe: false },
    { id: 2, sender: "Sarah", text: "Ja, Seite 42 ist eigentlich ganz einfach.", time: "08:17", isMe: false },
    { id: 3, sender: "Ich", text: "Könnt ihr mir das in der Pause zeigen?", time: "08:20", isMe: true },
  ]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: chatLog.length + 1,
      sender: "Ich",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setChatLog([...chatLog, newMessage]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-2xl mx-auto bg-white rounded-t-3xl shadow-2xl overflow-hidden border border-gray-100">
      
      {/* 1. Chat Header */}
      <div className="bg-blue-600 p-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button className="hover:bg-blue-700 p-1 rounded-full transition">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="font-bold text-lg leading-none">Klasse 9b Chat</h2>
            <p className="text-xs text-blue-200">24 Mitglieder online</p>
          </div>
        </div>
        <MoreVertical size={20} className="text-blue-200 cursor-pointer" />
      </div>

      {/* 2. Nachrichten-Bereich */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {chatLog.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
            {!msg.isMe && <span className="text-[10px] font-bold text-gray-500 ml-2 mb-1 uppercase">{msg.sender}</span>}
            <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
              msg.isMe 
                ? "bg-blue-600 text-white rounded-tr-none" 
                : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-[10px] mt-1 text-right ${msg.isMe ? "text-blue-200" : "text-gray-400"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Eingabebereich (WhatsApp Stil) */}
      <form onSubmit={sendMessage} className="p-4 bg-white border-t flex items-center gap-2">
        <button type="button" className="text-gray-400 hover:text-blue-500">
          <Smile size={24} />
        </button>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nachricht schreiben..."
          className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-md"
        >
          <Send size={20} />
        </button>
      </form>

      {/* Platzhalter für die Bottom-Nav der App (wird vom Root-Layout überdeckt) */}
      <div className="h-12 bg-white"></div>
    </div>
  );
}
