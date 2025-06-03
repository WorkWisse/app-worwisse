const companyLogos = [
  {
    name: "Mercado Libre",
    src: "https://picsum.photos/seed/mlogo/120/40",
    href: "/company/mercado-libre",
  },
  {
    name: "Intive",
    src: "https://picsum.photos/seed/ilogo/120/40",
    href: "/company/intive",
  },
  {
    name: "Globant",
    src: "https://picsum.photos/seed/glogo/120/40",
    href: "/company/globant",
  },
  {
    name: "MuleSoft",
    src: "https://picsum.photos/seed/mslogo/120/40",
    href: "/company/mulesoft",
  },
  {
    name: "Accenture",
    src: "https://picsum.photos/seed/alogo/120/40",
    href: "/company/accenture",
  },
];

export const LandingFeaturedLogos = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-10 transition-colors duration-200">
          Empresas que confían en la transparencia
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 sm:gap-x-14 lg:gap-x-16 animate-fade-in-up delay-500">
          {companyLogos.map((logo) => (
            <a
              key={logo.name}
              href={logo.href}
              title={`Ver cultura en ${logo.name}`}
              className="group transition-transform duration-300 ease-out hover:scale-110"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo placeholder`}
                className="max-h-[35px] sm:max-h-[40px] w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 rounded"
              />
            </a>
          ))}
        </div>
        <div className="text-center mt-16 animate-fade-in-up delay-700">
          <svg
            className="h-7 w-7 text-slate-400 dark:text-slate-500 mx-auto animate-subtle-bounce transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <title>Scroll down to see more</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};
