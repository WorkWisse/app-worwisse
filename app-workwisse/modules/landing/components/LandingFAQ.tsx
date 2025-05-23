import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "¿Es gratis usar WorkWise?",
    answer:
      "Sí, WorkWise es completamente gratuito. Podés ver opiniones, buscar empresas y acceder a información de salarios sin costo alguno.",
  },
  {
    question: "¿Cómo saben que las opiniones son reales?",
    answer:
      "Verificamos que las personas realmente hayan trabajado en las empresas que comentan. Revisamos cada opinión antes de publicarla para asegurar que sea auténtica.",
  },
  {
    question: "¿Las empresas pueden saber quién escribió las opiniones?",
    answer:
      "No, todas las opiniones son completamente anónimas. Las empresas pueden leer los comentarios pero nunca saben quién los escribió.",
  },
  {
    question: "¿Qué tipo de información puedo encontrar sobre las empresas?",
    answer:
      "Encontrarás información sobre ambiente de trabajo, salarios, beneficios, horarios, jefes, compañeros y todo lo que necesitás saber antes de postularte.",
  },
  {
    question: "¿Cómo puedo agregar mi empresa a la plataforma?",
    answer:
      "Si tu empresa no está en WorkWise, podés contactarnos y la agregamos. Es simple y rápido.",
  },
  {
    question: "¿La información de salarios es actual?",
    answer:
      "Sí, la información se actualiza constantemente con datos de trabajadores actuales. Mostramos rangos reales basados en experiencias recientes.",
  },
];

export const LandingFAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Preguntas <span className="text-sky-600">frecuentes</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Todo lo que necesitás saber sobre WorkWise. Si tenés alguna otra
            pregunta, contactanos sin problema.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset rounded-xl"
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.includes(index)}
              >
                <h3 className="text-lg font-semibold text-slate-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Toggle FAQ</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-50 to-sky-50 rounded-2xl p-8 border border-sky-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              ¿Tenés más preguntas?
            </h3>
            <p className="text-slate-600 mb-6">
              Nuestro equipo está disponible para ayudarte con cualquier
              consulta que tengas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors">
                Contactanos
              </button>
              <button className="border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                Ver más info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
