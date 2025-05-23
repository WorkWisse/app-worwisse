import { Button } from "@heroui/button";

export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-sky-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Conectamos
                <span className="text-sky-600"> trabajadores</span> con
                <span className="text-sky-600"> buenos empleos</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Somos la plataforma que te ayuda a conocer la verdad sobre las
                empresas, para que puedas elegir dónde trabajar con información
                real de otros trabajadores como vos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-sky-600 text-white hover:bg-sky-700 font-semibold px-8"
              >
                Conocé nuestro equipo
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-sky-600 text-sky-600 hover:bg-sky-50 font-semibold px-8"
              >
                Nuestra historia
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="relative">
              <img
                src="https://picsum.photos/seed/aboutteam/600/400"
                alt="Nuestro equipo"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
