import React, { useState, useRef, useEffect } from "react";
import { Skeleton } from "@heroui/react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  placeholder?: boolean;
  lazy?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  fallbackSrc,
  placeholder = true,
  lazy = true,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [imageSrc, setImageSrc] = useState(lazy ? "" : src);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setIsInView(true);
          setImageSrc(src);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, isInView, src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  // Generar fallback automático si no se proporciona uno
  const defaultFallback =
    fallbackSrc ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=0D8ABC&color=fff&size=80`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Skeleton placeholder */}
      {placeholder && !isLoaded && (
        <Skeleton className="absolute inset-0 rounded-inherit" />
      )}

      {/* Imagen */}
      <img
        ref={imgRef}
        alt={alt}
        className={`
          transition-opacity duration-300 ease-in-out
          ${isLoaded ? "opacity-100" : "opacity-0"}
          ${className}
        `}
        decoding="async"
        loading={lazy ? "lazy" : "eager"}
        src={hasError ? defaultFallback : imageSrc}
        style={{ width, height }}
        onError={handleError}
        onLoad={handleLoad}
      />

      {/* Fallback para errores sin imagen de respaldo */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
