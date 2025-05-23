import { Link } from "@heroui/link";

// Placeholder for social icons
const SocialIconPlaceholder = ({ title }: { title: string }) => (
  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs">
    {title.substring(0, 1)}
  </div>
);

export const LandingFooter = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500 text-center md:text-left">
            <p>
              &copy; {new Date().getFullYear()} workwisse. Todos los derechos
              reservados.
            </p>
            <p>Potenciando decisiones profesionales con transparencia.</p>
          </div>
          <div className="flex items-center space-x-5">
            <Link
              href="/terms"
              className="text-xs text-slate-500 hover:text-sky-600 transition-colors"
            >
              Términos
            </Link>
            <span className="text-xs text-slate-400">|</span>
            <Link
              href="/privacy"
              className="text-xs text-slate-500 hover:text-sky-600 transition-colors"
            >
              Privacidad
            </Link>
            <span className="text-xs text-slate-400">|</span>
            <Link
              href="/contact"
              className="text-xs text-slate-500 hover:text-sky-600 transition-colors"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
