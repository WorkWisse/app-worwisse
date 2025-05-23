import { LandingHeader } from "@/modules/core/components/LandingHeader";
import { LandingFooter } from "@/modules/core/components/LandingFooter";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <LandingHeader />
      <main className="flex-grow">{children}</main>
      <LandingFooter />
    </div>
  );
}
