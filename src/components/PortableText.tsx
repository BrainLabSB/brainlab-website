import { PortableText as PT } from "@portabletext/react";
import SanityImage from "./SanityImage";

const components = {
  types: {
    image: ({ value }: { value: { asset?: object; alt?: string } }) => (
      <figure className="my-8">
        <SanityImage value={value} className="rounded-xl w-full object-cover" />
        {value.alt && <figcaption className="text-sm text-gray-500 mt-2 text-center">{value.alt}</figcaption>}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 text-gray-700 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-500 pl-5 my-6 italic text-gray-600">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-5 space-y-1 text-gray-700">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-5 space-y-1 text-gray-700">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold">{children}</strong>,
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a href={value?.href} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function PortableText({ value }: { value: unknown[] }) {
  return <PT value={value as Parameters<typeof PT>[0]["value"]} components={components} />;
}
