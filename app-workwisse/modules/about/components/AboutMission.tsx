import { Card, CardBody } from "@heroui/card";

interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

const values: ValueItem[] = [
  {
    title: "Transparencia",
    description:
      "Creemos en la información clara y honesta para que puedas tomar las mejores decisiones laborales.",
    icon: "🔍",
  },
  {
    title: "Innovación",
    description:
      "Utilizamos la última tecnología para conectar talento con las oportunidades más relevantes.",
    icon: "💡",
  },
  {
    title: "Comunidad",
    description:
      "Construimos una comunidad donde profesionales comparten experiencias y se apoyan mutuamente.",
    icon: "🤝",
  },
  {
    title: "Excelencia",
    description:
      "Nos comprometemos a ofrecer la mejor experiencia y resultados excepcionales para nuestros usuarios.",
    icon: "⭐",
  },
];

export default function AboutMission() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Nuestra <span className="text-sky-600">misión</span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl text-slate-600 leading-relaxed">
              Democratizar el acceso a información laboral de calidad,
              empoderando a los profesionales para que encuentren empresas que
              realmente valoren su talento y se alineen con sus valores.
            </p>
            <p className="text-lg text-slate-500">
              Creemos que cada persona merece trabajar en un lugar donde pueda
              crecer, contribuir y ser valorada por lo que aporta.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card
              key={value.title}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardBody className="p-8 text-center space-y-4">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
