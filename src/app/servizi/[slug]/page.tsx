import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "../../../../sanity/lib/client";
import { serviceBySlugQuery, servicesQuery } from "../../../../sanity/lib/queries";
import SanityImage from "@/components/SanityImage";
import PortableText from "@/components/PortableText";

export const revalidate = 60;

interface Service {
  _id: string; title: string; slug: { current: string }; excerpt?: string;
  icon?: string; coverImage?: object; body?: unknown[]; seoTitle?: string; seoDescription?: string;
}

export async function generateStaticParams() {
  const services = await client.fetch<{ slug: { current: string } }[]>(servicesQuery);
  return services.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await client.fetch<Service>(serviceBySlugQuery, { slug });
  return { title: service?.seoTitle ?? service?.title, description: service?.seoDescription ?? service?.excerpt };
}

export default async function ServizioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await client.fetch<Service>(serviceBySlugQuery, { slug });
  if (!service) notFound();
  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      {service.coverImage && (
        <div className="aspect-video rounded-2xl overflow-hidden mb-10">
          <SanityImage value={service.coverImage as Parameters<typeof SanityImage>[0]["value"]} className="w-full h-full object-cover" priority />
        </div>
      )}
      {service.icon && <span className="text-4xl mb-4 block">{service.icon}</span>}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
      {service.excerpt && <p className="text-xl text-gray-600 mb-10">{service.excerpt}</p>}
      {service.body && <div className="prose-content"><PortableText value={service.body} /></div>}
    </article>
  );
}
