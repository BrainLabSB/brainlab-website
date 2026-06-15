import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
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
      {/* Google Tag Manager */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <>
          <Script id="gtm" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `}</Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0" width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}
      <Header locale={safeLocale} />
      <main>{children}</main>
      <ContactSection locale={safeLocale} />
      <Footer locale={safeLocale} />
      <RevealObserver />
    </>
  );
}
