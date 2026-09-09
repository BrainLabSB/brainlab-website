"use client";
import { usePathname } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import type { Locale } from "@/lib/translations";

export default function ConditionalContactSection({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  if (pathname.endsWith("/contatti")) return null;
  return <ContactSection locale={locale} />;
}
