interface Stat {
  number: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    number: "50K+",
    label: "Profesionales activos",
    description:
      "Usuarios registrados que confían en nuestra plataforma para sus decisiones laborales",
  },
  {
    number: "2,500+",
    label: "Empresas evaluadas",
    description:
      "Compañías analizadas con reviews detalladas y información verificada",
  },
  {
    number: "95%",
    label: "Satisfacción de usuarios",
    description:
      "De nuestros usuarios recomendarían WorkWise a otros profesionales",
  },
  {
    number: "24/7",
    label: "Disponibilidad",
    description:
      "Acceso continuo a información actualizada sobre oportunidades laborales",
  },
];

export default function AboutStats() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-sky-600 to-sky-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Nuestro <span className="text-sky-200">impacto</span> en números
          </h2>
          <p className="text-xl text-sky-100 max-w-3xl mx-auto leading-relaxed">
            Estos números reflejan el crecimiento de nuestra comunidad y el
            valor que hemos creado para profesionales en toda la región.
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
              ¿Listo para ser parte de esta comunidad?
            </h3>
            <p className="text-sky-100 mb-6 text-lg">
              Únete a miles de profesionales que ya están tomando decisiones
              laborales más inteligentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors">
                Registrarse gratis
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Explorar empresas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
