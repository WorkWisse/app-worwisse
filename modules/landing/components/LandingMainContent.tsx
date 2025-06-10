import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { getTopCompanies } from "../../../data/mockCompanies";

// Get top companies data
const topCompaniesData = getTopCompanies(5).map((company, index) => ({
  href: company.href,
  logo: company.logo.replace("200/200", "60/60"), // Adjust logo size for this view
  name: company.name,
  rank: index + 1,
  rating: company.rating,
  reviews: company.reviewsCount,
}));

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
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <title>Previous</title>
    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = (props: IconProps) => (
  <svg
    {...props}
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <title>Next</title>
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = (props: IconProps) => (
  <svg {...props} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
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
    <section className="py-20 sm:py-28 bg-slate-100 dark:bg-slate-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          {/* Top 5 Companies */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-up delay-300">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight transition-colors duration-200">
                Empresas Destacadas
              </h2>
              <Link
                className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center transition-colors duration-300"
                href="/rankings"
              >
                Ver Todas
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            {topCompaniesData.map((company) => (
              <Card
                key={company.rank}
                isPressable
                as={Link}
                className="shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1 bg-white dark:bg-slate-800 rounded-xl overflow-hidden w-full group"
                href={company.href}
              >
                <CardBody className="p-5">
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-semibold text-slate-400 dark:text-slate-500 w-5 text-center transition-colors duration-200">
                      {company.rank}.
                    </span>
                    <img
                      alt={`${company.name} logo placeholder`}
                      className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                      src={company.logo}
                    />
                    <div className="flex-grow min-w-0">
                      <h3
                        className="font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
                        title={company.name}
                      >
                        {company.name}
                      </h3>
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
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
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight transition-colors duration-200">
                Últimas Opiniones
              </h2>
              {latestReviewsData.length > 1 && (
                <div className="flex items-center gap-3">
                  <Button
                    isIconOnly
                    aria-label="Anterior"
                    className="rounded-full border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors duration-200"
                    variant="ghost"
                    onClick={() => paginate(-1)}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </Button>
                  <Button
                    isIconOnly
                    aria-label="Siguiente"
                    className="rounded-full border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors duration-200"
                    variant="ghost"
                    onClick={() => paginate(1)}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
            <div className="relative min-h-[500px] overflow-x-hidden">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                {currentReview && (
                  <motion.div
                    key={currentReview.id}
                    animate="center"
                    className="w-full absolute top-0 left-0"
                    custom={direction}
                    exit="exit"
                    initial="enter"
                    style={{ position: "absolute" }}
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    variants={slideVariants}
                  >
                    <Card className="shadow-lg bg-white dark:bg-slate-800 rounded-xl overflow-hidden transition-colors duration-200">
                      <CardHeader className="p-5 pb-3 border-b border-slate-100 dark:border-slate-700 transition-colors duration-200">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              alt={`${currentReview.company.name} logo placeholder`}
                              className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                              src={currentReview.company.logo}
                            />
                            <div>
                              <Link
                                className="hover:underline"
                                href={currentReview.company.href}
                              >
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                                  {currentReview.company.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
                                {currentReview.company.industry}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center text-lg font-bold text-sky-600">
                              <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                              {currentReview.rating.toFixed(1)}
                              <span className="text-sm text-slate-400 dark:text-slate-500 font-normal ml-0.5 transition-colors duration-200">
                                /5
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 transition-colors duration-200">
                              {currentReview.timeAgo}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody className="p-5 space-y-3">
                        <p className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-200">
                          <span className="font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-200">
                            {currentReview.role}
                          </span>
                        </p>
                        <div>
                          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 transition-colors duration-200">
                            Lo bueno:
                          </h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300 ease-in-out">
                            {currentReview.pros}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 transition-colors duration-200">
                            A mejorar:
                          </h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300 ease-in-out">
                            {currentReview.cons}
                          </p>
                        </div>
                        <div className="pt-1">
                          <Link
                            className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors duration-300 flex items-center group/link"
                            href={currentReview.reviewLink}
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
              <p className="text-slate-500 dark:text-slate-400 text-center py-10 transition-colors duration-200">
                No hay opiniones recientes para mostrar.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
