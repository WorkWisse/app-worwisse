interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timeline: TimelineEvent[] = [
  {
    year: "2020",
    title: "La idea que cambió todo",
    description:
      "Nos dimos cuenta de que los trabajadores necesitaban información real sobre las empresas, especialmente cuando todo cambió con la pandemia.",
  },
  {
    year: "2021",
    title: "Primeros pasos",
    description:
      "Lanzamos WorkWise con información de 100 empresas y 1,000 trabajadores que se animaron a compartir sus experiencias.",
  },
  {
    year: "2022",
    title: "Crecimos juntos",
    description:
      "Llegamos a 5 países de Latinoamérica y ya éramos 10,000 trabajadores ayudándonos entre todos.",
  },
  {
    year: "2023",
    title: "Mejoramos la experiencia",
    description:
      "Usamos tecnología para que sea más fácil encontrar la información que necesitás sobre cualquier empresa.",
  },
  {
    year: "2024",
    title: "Somos comunidad",
    description:
      "Ya somos más de 50,000 trabajadores compartiendo información real para ayudarnos a elegir mejor dónde trabajar.",
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
            Así empezó todo y cómo llegamos hasta acá, siempre pensando en hacer
            más fácil la vida de los trabajadores.
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
              Lo que viene después
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Seguimos trabajando para que cada vez sea más fácil conocer la
              verdad sobre las empresas. Queremos que todos los trabajadores
              puedan tomar mejores decisiones con información real y honesta.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                Más países
              </span>
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                Mejor experiencia
              </span>
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                Más información útil
              </span>
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                Nuevas alianzas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
