import { Card, CardBody } from "@heroui/card";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageId: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "María González",
    role: "CEO & Fundadora",
    bio: "Ex-directora de RRHH con 15+ años de experiencia en empresas Fortune 500. Apasionada por democratizar la información laboral.",
    imageId: "maria",
  },
  {
    name: "Carlos Rodríguez",
    role: "CTO",
    bio: "Ingeniero en sistemas con experiencia en startups tecnológicas. Especialista en arquitecturas escalables y experiencia de usuario.",
    imageId: "carlos",
  },
  {
    name: "Ana Martínez",
    role: "Head of Community",
    bio: "Psicóloga organizacional enfocada en bienestar laboral y construcción de comunidades profesionales saludables.",
    imageId: "ana",
  },
  {
    name: "Diego López",
    role: "Head of Data",
    bio: "Científico de datos con background en machine learning. Lidera nuestros algoritmos de matching y análisis predictivo.",
    imageId: "diego",
  },
];

export default function AboutTeam() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Conoce a nuestro <span className="text-sky-600">equipo</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Un grupo diverso de profesionales unidos por la misión de
            transformar la forma en que las personas encuentran su lugar ideal
            de trabajo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={member.name}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardBody className="p-6 text-center space-y-4">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <img
                    src={`https://picsum.photos/seed/${member.imageId}/200/200`}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-sky-600/20 to-transparent" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-sky-600 font-semibold">{member.role}</p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              ¿Quieres formar parte de nuestro equipo?
            </h3>
            <p className="text-slate-600 mb-6">
              Estamos siempre buscando talento apasionado por mejorar el mundo
              laboral. Si compartes nuestra visión, nos encantaría conocerte.
            </p>
            <button className="bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors">
              Ver oportunidades abiertas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
