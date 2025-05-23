interface Stat {
  number: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    number: "50K+",
    label: "Trabajadores que nos usan",
    description:
      "Personas que ya usan WorkWise para conocer la verdad sobre las empresas",
  },
  {
    number: "2,500+",
    label: "Empresas evaluadas",
    description: "Compañías con opiniones reales de trabajadores como vos",
  },
  {
    number: "95%",
    label: "Personas satisfechas",
    description: "De quienes usan WorkWise lo recomiendan a otros trabajadores",
  },
  {
    number: "24/7",
    label: "Siempre disponible",
    description:
      "Podés consultar información sobre empresas cuando lo necesites",
  },
];

export default function AboutStats() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-sky-600 to-sky-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Lo que hemos <span className="text-sky-200">logrado</span> juntos
          </h2>
          <p className="text-xl text-sky-100 max-w-3xl mx-auto leading-relaxed">
            Estos números muestran cómo estamos ayudando a los trabajadores a
            tener más información antes de elegir dónde trabajar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center space-y-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold text-sky-100 mb-3">
                  {stat.label}
                </h3>
                <p className="text-sky-200 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Querés ser parte de esta comunidad?
            </h3>
            <p className="text-sky-100 mb-6 text-lg">
              Unite a miles de trabajadores que ya están tomando mejores
              decisiones sobre dónde trabajar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors">
                Empezar gratis
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Ver empresas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
