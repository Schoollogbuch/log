"use client";

import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft, MoreVertical, Smile } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Deine Supabase-Verbindung

// Struktur einer Nachricht
interface Message {
  id: string;
  sender_name: string;
  content: string;
  created_at: string;
  klasse: string;
  user_id: string;
}

export default function Messenger() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [userKlasse, setUserKlasse] = useState("9b"); // Später dynamisch aus dem Profil
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Initialisierung: User und Nachrichten laden
  useEffect(() => {
    const setupChat = async () => {
      // Aktuellen User abrufen
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);

      // Vorhandene Nachrichten aus der DB laden
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("klasse", userKlasse)
        .order("created_at", { ascending: true });

      if (data) setChatLog(data);
    };

    setupChat();

    // 2. Echtzeit-Abonnement (Realtime)
    // Das sorgt dafür, dass neue Nachrichten sofort erscheinen
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `klasse=eq.${userKlasse}` },
        (payload) => {
          setChatLog((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userKlasse]);

  // Automatisches Scrollen nach unten bei neuen Nachrichten
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog]);

  // 3. Nachricht senden
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentUserId) return;

    const newMessage = {
      content: message,
      sender_name: "Schüler", // Hier könnte später der echte Name aus dem Profil stehen
      klasse: userKlasse,
      user_id: currentUserId,
    };

    const { error } = await supabase.from("messages").insert([newMessage]);

    if (error) {
      console.error("Fehler beim Senden:", error.message);
    } else {
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-2xl mx-auto bg-white rounded-t-3xl shadow-2xl overflow-hidden border border-gray-100">
      
      {/* Header */}
      <div className="bg-blue-600 p-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button className="hover:bg-blue-700 p-1 rounded-full transition">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="font-bold text-lg leading-none">Klasse {userKlasse} Chat</h2>
            <p className="text-xs text-blue-200 font-medium">Live verbunden</p>
          </div>
        </div>
        <MoreVertical size={20} className="text-blue-200 cursor-pointer" />
      </div>

      {/* Nachrichten-Liste */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth">
        {chatLog.map((msg) => {
          const isMe = msg.user_id === currentUserId;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              {!isMe && (
                <span className="text-[10px] font-bold text-gray-400 ml-2 mb-1 uppercase">
                  {msg.sender_name}
                </span>
              )}
              <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                isMe 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
              }`}>
                <p className="text-sm">{msg.content}</p>
                <p className={`text-[9px] mt-1 text-right ${isMe ? "text-blue-200" : "text-gray-400"}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Eingabefeld */}
      <form onSubmit={sendMessage} className="p-4 bg-white border-t flex items-center gap-2">
        <button type="button" className="text-gray-400 hover:text-blue-500 transition">
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
          disabled={!message.trim()}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 transition shadow-md"
        >
          <Send size={20} />
        </button>
      </form>

      {/* Abstandshalter für Bottom Navigation */}
      <div className="h-14 bg-white md:hidden"></div>
    </div>
  );
}
