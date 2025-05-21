import { Link } from "@heroui/link";

// A simple Card component structure using divs and Tailwind CSS
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

// Placeholder for an icon, replace with actual icon component if available
const TrendIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400 group-hover:text-purple-600"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-labelledby="trendIconTitle"
  >
    <title id="trendIconTitle">Trending up icon</title>
    <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

interface Company {
  id: string;
  name: string;
  rank: number;
  rating: number;
  reviewsCount: number;
  logoInitial: string;
}

const topCompanies: Company[] = [
  {
    id: "1",
    name: "EventBrite",
    rank: 1,
    rating: 8.2,
    reviewsCount: 17,
    logoInitial: "E",
  },
  {
    id: "2",
    name: "10Pines",
    rank: 2,
    rating: 8.0,
    reviewsCount: 33,
    logoInitial: "P",
  },
  {
    id: "3",
    name: "MURAL",
    rank: 3,
    rating: 8.0,
    reviewsCount: 17,
    logoInitial: "M",
  },
  {
    id: "4",
    name: "Auth0",
    rank: 4,
    rating: 7.9,
    reviewsCount: 17,
    logoInitial: "A",
  },
  {
    id: "5",
    name: "VR4",
    rank: 5,
    rating: 7.9,
    reviewsCount: 22,
    logoInitial: "V",
  },
];

export const LandingRankingList = () => {
  return (
    <section className="py-16 px-6 md:px-10 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Top 5 <span className="text-purple-600">Empresas</span>
          </h2>
          <Link
            href="/rankings"
            className="text-purple-600 hover:text-purple-800 font-semibold"
          >
            Ver Rankings Completos &rarr;
          </Link>
        </div>
        <div className="grid md:grid-cols-1 gap-6">
          {topCompanies.map((company) => (
            <Card
              key={company.id}
              className="shadow-lg hover:shadow-xl transition-shadow group"
            >
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full text-xl font-semibold">
                      {company.logoInitial}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        #{company.rank}{" "}
                        <span className="text-lg font-semibold text-gray-800">
                          {company.name}
                        </span>
                      </p>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <span className="font-bold">
                          ★ {company.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({company.reviewsCount} calificaciones)
                        </span>
                      </div>
                    </div>
                  </div>
                  <TrendIcon />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
