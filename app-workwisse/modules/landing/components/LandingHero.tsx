import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export const LandingHero = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-sky-100 py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 items-center">
          <div className="animate-fade-in-up delay-200">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
              Descubrí la verdad <br />
              <span className="text-sky-600">antes de tu entrevista.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
              Accedé a miles de reseñas anónimas de empleados y ex-empleados.
              Tomá decisiones informadas sobre tu próximo paso profesional.
            </p>
            <form className="max-w-lg flex items-center gap-2">
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
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 rounded-lg whitespace-nowrap"
              >
                Buscar
              </Button>
            </form>
          </div>
          <div className="hidden lg:flex justify-center items-center animate-slide-in-right delay-300">
            <img
              src="https://picsum.photos/seed/workwissehero/600/400"
              alt="Placeholder illustration of a professional workspace"
              className="w-full max-w-lg h-auto object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
