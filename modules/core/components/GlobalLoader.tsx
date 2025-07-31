import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "@heroui/react";

interface GlobalLoaderProps {
  children: React.ReactNode;
}

export function GlobalLoader({ children }: GlobalLoaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      // Solo mostrar loading si la URL es diferente a la actual
      if (url !== router.asPath) {
        setLoading(true);
      }
    };

    const handleComplete = () => {
      setLoading(false);
    };

    const handleError = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <Spinner
              classNames={{
                circle1: "border-b-primary",
                circle2: "border-b-primary",
              }}
              color="primary"
              size="lg"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Cargando...
            </p>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
