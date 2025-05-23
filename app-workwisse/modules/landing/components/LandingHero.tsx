import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export const LandingHero = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-sky-100 py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 items-center">
          <div className="animate-fade-in-up delay-200">
            <div className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold inline-block mb-6">
              ✨ Más de 50,000 trabajadores ya conocen la verdad
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight leading-tight">
              Conocé la verdad sobre tu
              <span className="text-sky-600"> próximo trabajo</span> antes de
              postularte
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              Accedé a opiniones reales de empleados, información salarial real
              y rankings transparentes.{" "}
              <strong>Tomá decisiones laborales informadas</strong>
              con información que realmente importa.
            </p>

            <form className="max-w-lg mb-8">
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Buscar por nombre de empresa..."
                  aria-label="Buscar empresa"
                  fullWidth
                  size="lg"
                  className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg"
                  classNames={{
                    inputWrapper:
                      "bg-white border-slate-300 focus-within:border-sky-500 focus-within:ring-sky-500",
                    input: "text-slate-700 placeholder-slate-400 text-base",
                  }}
                  startContent={
                    <svg
                      className="h-5 w-5 text-slate-400 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <title>Search Icon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  }
                />
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 rounded-lg whitespace-nowrap px-8"
                >
                  Buscar
                </Button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-white border-2 border-sky-600 text-sky-600 hover:bg-sky-50 font-semibold px-8 shadow-sm"
              >
                Ver empresas destacadas
              </Button>
              <Button
                size="lg"
                variant="light"
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                ¿Cómo funciona? →
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Gratis siempre</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Opiniones verificadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>100% anónimo</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center animate-slide-in-right delay-300">
            <div className="relative">
              <img
                src="https://picsum.photos/seed/workwissehero/600/400"
                alt="Trabajadores tomando decisiones informadas"
                className="w-full max-w-lg h-auto object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <title>Checkmark</title>
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      María encontró un trabajo que le gusta
                    </p>
                    <p className="text-slate-600 text-xs">Hace 2 horas</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <title>Star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      4.9/5 estrellas
                    </p>
                    <p className="text-slate-600 text-xs">+2,500 opiniones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
