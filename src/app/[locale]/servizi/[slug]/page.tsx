import { redirect } from "next/navigation";
export default async function ServizioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/servizi`);
}
