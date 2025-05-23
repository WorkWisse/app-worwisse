interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

interface Stat {
  value: string;
  label: string;
  description: string;
}

const testimonials: Testimonial[] = [
  {
    name: "María Rodriguez",
    role: "Vendedora",
    company: "Retail Fashion",
    quote:
      "Gracias a WorkWise pude conocer el ambiente de trabajo antes de aceptar. Ahora sé que elegí bien.",
    avatar: "mariar",
  },
  {
    name: "Carlos Mendoza",
    role: "Operario",
    company: "Logística Plus",
    quote:
      "La información sobre horarios y beneficios me ayudó mucho. Pude comparar y elegir donde más me convenía.",
    avatar: "carlosm",
  },
  {
    name: "Ana Silva",
    role: "Administrativa",
    company: "Servicios Contables",
    quote:
      "Encontré mi trabajo actual leyendo las opiniones. Me ayudó a entender cómo era trabajar ahí realmente.",
    avatar: "anas",
  },
];

const stats: Stat[] = [
  {
    value: "50K+",
    label: "Trabajadores activos",
    description: "Confían en nuestra información",
  },
  {
    value: "2,500+",
    label: "Empresas evaluadas",
    description: "Con información detallada",
  },
  {
    value: "95%",
    label: "Satisfacción",
    description: "De nuestros usuarios",
  },
  {
    value: "24/7",
    label: "Disponible",
    description: "Información siempre actualizada",
  },
];

export const LandingTestimonials = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-sky-50 to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Miles de trabajadores ya están
            <span className="text-sky-600"> tomando mejores decisiones</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Escuchá lo que dicen quienes ya usaron WorkWise para encontrar un
            trabajo que realmente les gusta.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl lg:text-5xl font-bold text-sky-600 mb-2">
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-slate-600">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <img
                  src={`https://picsum.photos/seed/${testimonial.avatar}/60/60`}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {testimonial.role} en {testimonial.company}
                  </p>
                </div>
              </div>

              <blockquote className="text-slate-700 leading-relaxed mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <title>Rating Star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-sky-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              ¿Querés ser el próximo en encontrar un trabajo que te guste?
            </h3>
            <p className="text-slate-600 mb-6 text-lg">
              Empezá a tomar decisiones laborales más inteligentes hoy mismo.
            </p>
            <button className="bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sky-700 transition-colors shadow-lg hover:shadow-xl text-lg">
              Explorar empresas ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
