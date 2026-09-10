import CookieBanner from "@/components/CookieBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConditionalContactSection from "@/components/ConditionalContactSection";
import RevealObserver from "@/components/RevealObserver";
import { type Locale, locales } from "@/lib/translations";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const safeLocale = (locale === "it" ? "it" : "en") as Locale;

  return (
    <>
      <CookieBanner gtmId={process.env.NEXT_PUBLIC_GTM_ID} locale={safeLocale} />
      <Header locale={safeLocale} />
      <main>{children}</main>
      <ConditionalContactSection locale={safeLocale} />
      <Footer locale={safeLocale} />
      <RevealObserver />
    </>
  );
}
