interface Feature {
  icon: string;
  title: string;
  description: string;
  benefit: string;
}

const features: Feature[] = [
  {
    icon: "🔍",
    title: "Opiniones Verificadas",
    description:
      "Comentarios auténticos de empleados que realmente trabajaron ahí",
    benefit: "Información real y confiable",
  },
  {
    icon: "📊",
    title: "Datos Reales",
    description: "Información sobre salarios, beneficios y ambiente de trabajo",
    benefit: "Decisiones basadas en hechos",
  },
  {
    icon: "🚀",
    title: "Oportunidades de Trabajo",
    description: "Descubrí trabajos disponibles en empresas que conocés",
    benefit: "Encontrá tu próximo trabajo",
  },
  {
    icon: "🏆",
    title: "Mejores Empleadores",
    description: "Conocé cuáles son las mejores empresas para trabajar",
    benefit: "Trabajá en los mejores lugares",
  },
  {
    icon: "💡",
    title: "Información del Mercado",
    description: "Tendencias salariales y novedades del mundo laboral",
    benefit: "Mantente al día",
  },
  {
    icon: "🤝",
    title: "Comunidad de Trabajadores",
    description: "Conecta con otros trabajadores y comparte experiencias",
    benefit: "Compartí y aprendé",
  },
];

export const LandingFeatures = () => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Todo lo que necesitás para
            <span className="text-sky-600"> elegir mejor dónde trabajar</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Tenemos la información que necesitás para encontrar un trabajo que
            realmente te guste y tomar decisiones laborales informadas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-sky-100 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-slate-600 mb-4 leading-relaxed">
                {feature.description}
              </p>

              <div className="text-sm font-semibold text-sky-600 bg-sky-50 px-3 py-2 rounded-full inline-block">
                ✓ {feature.benefit}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-sky-50 to-slate-50 rounded-2xl p-8 max-w-4xl mx-auto border border-sky-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              ¿Listo para empezar?
            </h3>
            <p className="text-slate-600 mb-6 text-lg">
              Únete a miles de trabajadores que ya están usando WorkWise para
              tomar mejores decisiones laborales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg">
                Ver empresas destacadas
              </button>
              <button className="border-2 border-sky-600 text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors">
                Buscar trabajos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
