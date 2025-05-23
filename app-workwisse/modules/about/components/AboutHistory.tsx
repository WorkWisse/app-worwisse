interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timeline: TimelineEvent[] = [
  {
    year: "2020",
    title: "Nacimiento de la idea",
    description:
      "Identificamos la necesidad de transparencia en el mercado laboral durante la pandemia, cuando cambió la forma de trabajar.",
  },
  {
    year: "2021",
    title: "Lanzamiento de MVP",
    description:
      "Lanzamos nuestra primera versión con 100 empresas evaluadas y una comunidad inicial de 1,000 usuarios.",
  },
  {
    year: "2022",
    title: "Expansión regional",
    description:
      "Ampliamos cobertura a 5 países de Latinoamérica y alcanzamos 10,000 usuarios activos mensuales.",
  },
  {
    year: "2023",
    title: "Integración de IA",
    description:
      "Implementamos algoritmos de machine learning para mejorar las recomendaciones y matching personalizado.",
  },
  {
    year: "2024",
    title: "Liderazgo en la región",
    description:
      "Nos consolidamos como la plataforma líder con 50K+ usuarios y partnerships estratégicos con universidades.",
  },
];

export default function AboutHistory() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Nuestra <span className="text-sky-600">historia</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Un viaje de innovación y crecimiento impulsado por la visión de
            transformar el mercado laboral en Latinoamérica.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-sky-200 h-full hidden lg:block" />

          <div className="space-y-12">
            {timeline.map((event, index) => (
              <div
                key={event.year}
                className={`flex flex-col lg:flex-row items-center gap-8 animate-fade-in-up ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-1 text-center lg:text-left">
                  <div
                    className={`space-y-4 ${index % 2 === 0 ? "lg:text-right lg:pr-8" : "lg:text-left lg:pl-8"}`}
                  >
                    <div className="inline-block bg-sky-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                      {event.year}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-4 h-4 bg-sky-600 rounded-full border-4 border-white shadow-lg" />
                  <div className="absolute inset-0 w-4 h-4 bg-sky-600 rounded-full animate-ping opacity-20" />
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-slate-50 rounded-2xl p-8 max-w-4xl mx-auto border border-sky-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              El futuro que estamos construyendo
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Continuamos innovando para crear un ecosistema laboral más
              transparente, justo y eficiente. Nuestro objetivo es que cada
              profesional pueda encontrar su lugar ideal de trabajo basado en
              datos reales y experiencias auténticas.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                Expansión internacional
              </span>
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                IA más avanzada
              </span>
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                Nuevas funcionalidades
              </span>
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                Partnerships estratégicos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
