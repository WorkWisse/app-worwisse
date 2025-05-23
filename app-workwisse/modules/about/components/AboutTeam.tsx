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
    role: "Fundadora",
    bio: "Trabajó muchos años en recursos humanos y se cansó de ver cómo la información sobre empresas no era transparente. Decidió crear WorkWise para cambiar eso.",
    imageId: "maria",
  },
  {
    name: "Carlos Rodríguez",
    role: "Responsable de Tecnología",
    bio: "Se encarga de que la plataforma funcione bien y sea fácil de usar. Cree que la tecnología debe estar al servicio de las personas.",
    imageId: "carlos",
  },
  {
    name: "Ana Martínez",
    role: "Responsable de Comunidad",
    bio: "Cuida que nuestra comunidad sea un lugar seguro donde los trabajadores puedan compartir sus experiencias sin miedo.",
    imageId: "ana",
  },
  {
    name: "Diego López",
    role: "Responsable de Información",
    bio: "Se asegura de que toda la información que mostramos sea precisa y útil para ayudarte a tomar mejores decisiones.",
    imageId: "diego",
  },
];

export default function AboutTeam() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Conocé a nuestro <span className="text-sky-600">equipo</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Somos un grupo de personas que también trabajamos y entendemos lo
            importante que es encontrar un buen lugar para desarrollarse
            laboralmente.
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
              ¿Querés trabajar con nosotros?
            </h3>
            <p className="text-slate-600 mb-6">
              Siempre estamos buscando personas que quieran ayudar a mejorar el
              mundo del trabajo. Si te gusta nuestra misión, charlemos.
            </p>
            <button className="bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors">
              Ver trabajos disponibles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
