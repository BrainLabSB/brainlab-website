/**
 * Sanity Studio accessibile all'URL /studio
 * Proteggi questo percorso con autenticazione su Vercel (Vercel Authentication)
 * oppure tramite middleware Next.js prima di andare in produzione.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
