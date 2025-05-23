interface LogoInfo {
  name: string;
  alt: string;
  // In a real scenario, this would be a path to an actual logo image
  // For this example, we'll just use a placeholder style
  placeholderColor: string;
}

const logos: LogoInfo[] = [
  {
    name: "Mercado Libre",
    alt: "Mercado Libre Logo",
    placeholderColor: "bg-yellow-400",
  },
  { name: "Intive", alt: "Intive Logo", placeholderColor: "bg-blue-500" },
  { name: "Globant", alt: "Globant Logo", placeholderColor: "bg-green-500" },
  { name: "MuleSoft", alt: "MuleSoft Logo", placeholderColor: "bg-sky-500" },
  { name: "Medallia", alt: "Medallia Logo", placeholderColor: "bg-red-500" },
];

export const LandingLogosSection = () => {
  return (
    <section className="py-16 px-6 md:px-10 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-10">
          Empresas que confían en la transparencia
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <div key={logo.name} className="text-center">
              <div
                className={`w-32 h-16 rounded-md flex items-center justify-center text-white font-medium text-sm mb-2 ${logo.placeholderColor}`}
                title={logo.alt} // Using title for hover effect as it's a placeholder
              >
                {/* In a real app, replace this div with an <img src="..." alt="..." /> tag */}
                {logo.name} Logo
              </div>
              <p className="text-gray-600 text-sm">{logo.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
