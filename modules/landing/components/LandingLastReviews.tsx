import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

// Using the simple Card component structure defined earlier
const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-6 ${className}`}>{children}</div>;

// Placeholder for icons, replace with actual icon components if available
const ChevronLeftIcon = () => (
  <svg
    aria-labelledby="chevLeftTitle"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id="chevLeftTitle">Previous</title>
    <path
      d="M15 19l-7-7 7-7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    aria-labelledby="chevRightTitle"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id="chevRightTitle">Next</title>
    <path
      d="M9 5l7 7-7 7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

interface Review {
  id: string;
  companyName: string;
  companyLogoInitial: string;
  companyType: string;
  date: string;
  rating: number;
  pros: string;
  cons: string;
}

const lastReviewsData: Review[] = [
  {
    id: "1",
    companyName: "BBVA",
    companyLogoInitial: "B",
    companyType: "Banco",
    date: "Hace 13 días",
    rating: 8.0,
    pros: "Las ventajas de estar dentro de Bancarios y que el edificio es 'nuevo'.",
    cons: "Políticas de trabajo del 1900, los líderes no tienen la mas pálida idea de hacer Infosec, llegas a liderar un área por se el pesado que pregunta siempre 'Como'.",
  },
  // Add more reviews if needed for carousel functionality
];

export const LandingLastReviews = () => {
  // Basic state for carousel, would need more logic for actual sliding
  // const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <section className="py-16 px-6 md:px-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-purple-600">
            Últimas Calificaciones
          </h2>

        </div>
        {/* This would be part of a carousel/slider in a real implementation */}
        {lastReviewsData.map((review) => (
          <Card key={review.id} className="shadow-lg">
            <CardBody>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-gray-200 text-gray-700 flex items-center justify-center rounded-full text-xl font-semibold">
                    {review.companyLogoInitial}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {review.companyName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {review.companyType} &middot; {review.date}
                    </p>
                  </div>
                </div>
                <div className="text-yellow-500 text-2xl font-bold">
                  ★ {review.rating.toFixed(1)}/10
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Pros:</h4>
                <p className="text-gray-600 mb-3 text-sm">{review.pros}</p>
                <h4 className="font-semibold text-gray-700 mb-1">Cons:</h4>
                <p className="text-gray-600 mb-3 text-sm">{review.cons}</p>
                <Link
                  className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
                  href={`/reviews/${review.id}`}
                >
                  Ver más
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};
