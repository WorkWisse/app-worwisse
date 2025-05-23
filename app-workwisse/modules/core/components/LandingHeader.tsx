import { Link } from "@heroui/link";

// Consider using an actual SVG or a dedicated Icon component if you have one in HeroUI
const Logo = () => (
  <img
    src="https://picsum.photos/seed/workwisselogo/40/40" // Seeded for consistency
    alt="Workwisse Logo Placeholder"
    className="h-8 w-8 mr-2 rounded-full group-hover:opacity-90 transition-opacity duration-300"
  />
);

export const LandingHeader = () => {
  return (
    <header className="py-5 px-4 sm:px-6 lg:px-8 bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-2xl font-semibold text-slate-800 group transition-opacity duration-300 hover:opacity-80"
          aria-label="Workwisse Home"
        >
          <Logo />
          workwisse
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors duration-300"
          >
            Sobre nosotros
          </Link>
          <Link
            href="/company/add"
            className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Sumá tu empresa
          </Link>
        </nav>
      </div>
    </header>
  );
};
