// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Leitet den User sofort zum Login weiter
  redirect("/login");
}
