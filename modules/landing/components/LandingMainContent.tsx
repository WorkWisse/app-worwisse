import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Placeholder data - ideally fetched from an API
const topCompaniesData = [
  {
    rank: 1,
    name: "Tech Solutions Inc.",
    logo: "https://picsum.photos/seed/tsicon/60/60",
    rating: 4.8,
    reviews: 152,
    href: "/company/tech-solutions-inc",
  },
  {
    rank: 2,
    name: "Innovate Hub",
    logo: "https://picsum.photos/seed/ihicon/60/60",
    rating: 4.7,
    reviews: 98,
    href: "/company/innovate-hub",
  },
  {
    rank: 3,
    name: "GreenTech Global",
    logo: "https://picsum.photos/seed/gtgicon/60/60",
    rating: 4.6,
    reviews: 75,
    href: "/company/greentech-global",
  },
  {
    rank: 4,
    name: "NextGen Dynamics",
    logo: "https://picsum.photos/seed/ngdicon/60/60",
    rating: 4.5,
    reviews: 110,
    href: "/company/nextgen-dynamics",
  },
  {
    rank: 5,
    name: "QuantumLeap AI",
    logo: "https://picsum.photos/seed/qlaicon/60/60",
    rating: 4.5,
    reviews: 60,
    href: "/company/quantumleap-ai",
  },
];

const latestReviewsData = [
  {
    id: "review1",
    company: {
      name: "Alpha Corp",
      logo: "https://picsum.photos/seed/acicon/80/80",
      industry: "Software Development",
      href: "/company/alpha-corp",
    },
    rating: 4,
    role: "Senior Developer",
    timeAgo: "Hace 3 días",
    pros: "Excelente ambiente laboral, proyectos desafiantes y oportunidades de crecimiento. El equipo es muy colaborativo.",
    cons: "El salario podría ser más competitivo en comparación con otras empresas del sector. A veces hay picos de trabajo intenso.",
    reviewLink: "/review/alpha-corp-dev-456",
  },
  {
    id: "review2",
    company: {
      name: "Beta Solutions",
      logo: "https://picsum.photos/seed/bsicon/80/80",
      industry: "Fintech",
      href: "/company/beta-solutions",
    },
    rating: 5,
    role: "Product Manager",
    timeAgo: "Hace 1 semana",
    pros: "Cultura innovadora y abierta a nuevas ideas. Horarios flexibles y buen balance vida-trabajo.",
    cons: "Algunos procesos internos podrían ser más ágiles. La cafetería necesita más opciones vegetarianas.",
    reviewLink: "/review/beta-solutions-pm-789",
  },
  {
    id: "review3",
    company: {
      name: "Gamma Creative",
      logo: "https://picsum.photos/seed/gcicon/80/80",
      industry: "Agencia Digital",
      href: "/company/gamma-creative",
    },
    rating: 3,
    role: "Diseñador Gráfico Jr.",
    timeAgo: "Hace 2 semanas",
    pros: "Se aprende mucho y rápido. Los proyectos son variados y para clientes importantes.",
    cons: "Mucha presión y horas extra no siempre compensadas. Alta rotación de personal en algunos equipos.",
    reviewLink: "/review/gamma-creative-design-012",
  },
];

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const ChevronLeftIcon = (props: IconProps) => (
  <svg
    {...props}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <title>Previous</title>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = (props: IconProps) => (
  <svg
    {...props}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <title>Next</title>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const StarIcon = (props: IconProps) => (
  <svg {...props} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <title>Star</title>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const LandingMainContent = () => {
  const [[currentReviewIndex, direction], setCurrentReviewState] = useState([
    0, 0,
  ]);

  const paginate = (newDirection: number) => {
    let newIndex = currentReviewIndex + newDirection;
    if (newIndex < 0) {
      newIndex = latestReviewsData.length - 1;
    } else if (newIndex >= latestReviewsData.length) {
      newIndex = 0;
    }
    setCurrentReviewState([newIndex, newDirection]);
  };

  const currentReview = latestReviewsData[currentReviewIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          {/* Top 5 Companies */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-up delay-300">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                Empresas Destacadas
              </h2>
              <Link
                href="/rankings"
                className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center transition-colors duration-300"
              >
                Ver Todas
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            {topCompaniesData.map((company) => (
              <Card
                key={company.rank}
                as={Link}
                href={company.href}
                isPressable
                className="shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1 bg-white rounded-xl overflow-hidden w-full group"
              >
                <CardBody className="p-5">
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-semibold text-slate-400 w-5 text-center">
                      {company.rank}.
                    </span>
                    <img
                      src={company.logo}
                      alt={`${company.name} logo placeholder`}
                      className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <h3
                        className="font-semibold text-slate-800 truncate group-hover:text-sky-600 transition-colors"
                        title={company.name}
                      >
                        {company.name}
                      </h3>
                      <div className="flex items-center text-sm text-slate-500">
                        <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>
                          {company.rating.toFixed(1)} ({company.reviews}{" "}
                          reseñas)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Latest Reviews */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up delay-500 overflow-x-hidden">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                Últimas Opiniones
              </h2>
              {latestReviewsData.length > 1 && (
                <div className="flex items-center gap-3">
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="rounded-full border-slate-300 text-slate-600 hover:bg-slate-200 hover:border-slate-400"
                    aria-label="Anterior"
                    onClick={() => paginate(-1)}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="rounded-full border-slate-300 text-slate-600 hover:bg-slate-200 hover:border-slate-400"
                    aria-label="Siguiente"
                    onClick={() => paginate(1)}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
            <div className="relative min-h-[500px] overflow-x-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {currentReview && (
                  <motion.div
                    key={currentReview.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="w-full absolute top-0 left-0"
                    style={{ position: "absolute" }}
                  >
                    <Card className="shadow-lg bg-white rounded-xl overflow-hidden">
                      <CardHeader className="p-5 pb-3 border-b border-slate-100">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={currentReview.company.logo}
                              alt={`${currentReview.company.name} logo placeholder`}
                              className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                            />
                            <div>
                              <Link
                                href={currentReview.company.href}
                                className="hover:underline"
                              >
                                <h3 className="text-lg font-semibold text-slate-800 hover:text-sky-600 transition-colors">
                                  {currentReview.company.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-slate-500">
                                {currentReview.company.industry}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center text-lg font-bold text-sky-600">
                              <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                              {currentReview.rating.toFixed(1)}
                              <span className="text-sm text-slate-400 font-normal ml-0.5">
                                /5
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {currentReview.timeAgo}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody className="p-5 space-y-3">
                        <p className="text-sm text-slate-600">
                          <span className="font-semibold text-slate-700">
                            {currentReview.role}
                          </span>
                        </p>
                        <div>
                          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Lo bueno:
                          </h4>
                          <p className="text-sm text-slate-700 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300 ease-in-out">
                            {currentReview.pros}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            A mejorar:
                          </h4>
                          <p className="text-sm text-slate-700 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300 ease-in-out">
                            {currentReview.cons}
                          </p>
                        </div>
                        <div className="pt-1">
                          <Link
                            href={currentReview.reviewLink}
                            className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors duration-300 flex items-center group/link"
                          >
                            Leer opinión completa
                            <ChevronRightIcon className="h-4 w-4 ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 transform group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {latestReviewsData.length === 0 && (
              <p className="text-slate-500 text-center py-10">
                No hay opiniones recientes para mostrar.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
