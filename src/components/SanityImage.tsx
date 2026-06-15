import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";

interface Props {
  value: { asset?: object; alt?: string };
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function SanityImage({ value, width = 1200, height = 675, className, priority }: Props) {
  if (!value?.asset) return null;
  return (
    <Image
      src={urlFor(value).width(width).height(height).auto("format").url()}
      alt={value.alt ?? ""}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
