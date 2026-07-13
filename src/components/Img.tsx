import type { ImgHTMLAttributes } from "react";

// Enforces Persian alt + explicit dimensions on every image (zero CLS).
export interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "loading"> {
  alt: string; // required
  width: number; // required
  height: number; // required
  priority?: boolean; // opt into eager loading for LCP images
}

export function Img({ priority, alt, ...rest }: ImgProps) {
  return (
    <img
      {...rest}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
