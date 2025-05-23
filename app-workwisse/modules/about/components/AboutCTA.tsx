import { Button } from "@heroui/button";

export default function AboutCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Querés tomar mejores
            <span className="text-sky-400"> decisiones laborales</span>?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Unite a nuestra comunidad de trabajadores que ya están usando
            información real para elegir mejor dónde trabajar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-sky-500 text-white hover:bg-sky-600 font-semibold px-8 py-4 text-lg"
            >
              Empezar gratis
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg"
            >
              Ver empresas
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl text-sky-400 mb-2">🚀</div>
              <h3 className="text-white font-semibold">Mejorá tu trabajo</h3>
              <p className="text-slate-400 text-sm">
                Encontrá lugares de trabajo que realmente te convienen
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl text-sky-400 mb-2">🤝</div>
              <h3 className="text-white font-semibold">Conectate con otros</h3>
              <p className="text-slate-400 text-sm">
                Formá parte de una comunidad de trabajadores que se ayudan
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl text-sky-400 mb-2">📊</div>
              <h3 className="text-white font-semibold">Información real</h3>
              <p className="text-slate-400 text-sm">
                Accedé a opiniones verdaderas sobre empresas y trabajos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
