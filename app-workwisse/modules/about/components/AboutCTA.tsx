import { Button } from "@heroui/button";

export default function AboutCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Listo para transformar tu
            <span className="text-sky-400"> carrera profesional</span>?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Únete a nuestra comunidad de profesionales que están tomando
            decisiones laborales inteligentes basadas en información real y
            transparente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-sky-500 text-white hover:bg-sky-600 font-semibold px-8 py-4 text-lg"
            >
              Crear cuenta gratis
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg"
            >
              Explorar empresas
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl text-sky-400 mb-2">🚀</div>
              <h3 className="text-white font-semibold">Impulsa tu carrera</h3>
              <p className="text-slate-400 text-sm">
                Encuentra oportunidades que realmente se alineen con tus
                objetivos
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl text-sky-400 mb-2">🤝</div>
              <h3 className="text-white font-semibold">Conecta con otros</h3>
              <p className="text-slate-400 text-sm">
                Forma parte de una comunidad de profesionales activos
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl text-sky-400 mb-2">📊</div>
              <h3 className="text-white font-semibold">
                Decisiones informadas
              </h3>
              <p className="text-slate-400 text-sm">
                Accede a datos reales sobre empresas y oportunidades laborales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
