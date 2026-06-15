import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "../../../../sanity/lib/client";
import { caseStudyBySlugQuery, caseStudiesQuery } from "../../../../sanity/lib/queries";
import SanityImage from "@/components/SanityImage";
import PortableText from "@/components/PortableText";

export const revalidate = 60;

interface CaseStudy {
  _id: string; title: string; client?: string; sector?: string; excerpt?: string;
  coverImage?: object; results?: { metric: string; label: string }[];
  body?: unknown[]; publishedAt?: string; seoTitle?: string; seoDescription?: string;
  services?: { title: string; slug: { current: string } }[];
}

export async function generateStaticParams() {
  const items = await client.fetch<{ slug: { current: string } }[]>(caseStudiesQuery);
  return items.map((cs) => ({ slug: cs.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = await client.fetch<CaseStudy>(caseStudyBySlugQuery, { slug });
  return { title: cs?.seoTitle ?? cs?.title, description: cs?.seoDescription ?? cs?.excerpt };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await client.fetch<CaseStudy>(caseStudyBySlugQuery, { slug });
  if (!cs) notFound();
  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex gap-2 mb-4">
        {cs.client && <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">{cs.client}</span>}
        {cs.sector && <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{cs.sector}</span>}
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{cs.title}</h1>
      {cs.excerpt && <p className="text-xl text-gray-600 mb-8">{cs.excerpt}</p>}

      {cs.results && cs.results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-2xl p-6 mb-10">
          {cs.results.map((r, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-blue-600">{r.metric}</p>
              <p className="text-sm text-gray-500 mt-1">{r.label}</p>
            </div>
          ))}
        </div>
      )}

      {cs.coverImage && (
        <div className="aspect-video rounded-2xl overflow-hidden mb-10">
          <SanityImage value={cs.coverImage as Parameters<typeof SanityImage>[0]["value"]} className="w-full h-full object-cover" priority />
        </div>
      )}

      {cs.body && <div className="prose-content"><PortableText value={cs.body} /></div>}

      {cs.services && cs.services.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-3">Servizi coinvolti</p>
          <div className="flex gap-2 flex-wrap">
            {cs.services.map((s) => (
              <Link key={s.slug.current} href={`/servizi/${s.slug.current}`}
                className="text-sm border border-blue-200 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
