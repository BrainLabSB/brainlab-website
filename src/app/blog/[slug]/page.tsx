import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "../../../../sanity/lib/client";
import { postBySlugQuery, postsQuery } from "../../../../sanity/lib/queries";
import SanityImage from "@/components/SanityImage";
import PortableText from "@/components/PortableText";

export const revalidate = 60;

interface Post {
  _id: string; title: string; excerpt?: string; coverImage?: object;
  body?: unknown[]; publishedAt?: string; author?: string;
  categories?: string[]; seoTitle?: string; seoDescription?: string;
}

const categoryLabels: Record<string, string> = {
  ai: "Intelligenza Artificiale", marketing: "Marketing digitale",
  automazione: "Automazione", strategia: "Strategia", "casi-uso": "Casi d'uso",
};

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: { current: string } }[]>(postsQuery);
  return posts.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post>(postBySlugQuery, { slug });
  return { title: post?.seoTitle ?? post?.title, description: post?.seoDescription ?? post?.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch<Post>(postBySlugQuery, { slug });
  if (!post) notFound();
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      {post.categories && post.categories.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {post.categories.map((c) => (
            <span key={c} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">{categoryLabels[c] ?? c}</span>
          ))}
        </div>
      )}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      {post.excerpt && <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>}
      <p className="text-sm text-gray-400 mb-8">
        {post.author && <>{post.author} · </>}
        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" }) : ""}
      </p>
      {post.coverImage && (
        <div className="aspect-video rounded-2xl overflow-hidden mb-10">
          <SanityImage value={post.coverImage as Parameters<typeof SanityImage>[0]["value"]} className="w-full h-full object-cover" priority />
        </div>
      )}
      {post.body && <div className="prose-content"><PortableText value={post.body} /></div>}
    </article>
  );
}
