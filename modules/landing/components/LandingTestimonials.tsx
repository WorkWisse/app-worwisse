import { useTranslation, Trans } from "react-i18next";

interface Testimonial {
  nameKey: string;
  roleKey: string;
  companyKey: string;
  quoteKey: string;
  avatar: string;
}

interface Stat {
  valueKey: string;
  labelKey: string;
  descriptionKey: string;
}

const testimonials: Testimonial[] = [
  {
    nameKey: "testimonials.reviews.maria.name",
    roleKey: "testimonials.reviews.maria.role",
    companyKey: "testimonials.reviews.maria.company",
    quoteKey: "testimonials.reviews.maria.quote",
    avatar: "mariar",
  },
  {
    nameKey: "testimonials.reviews.carlos.name",
    roleKey: "testimonials.reviews.carlos.role",
    companyKey: "testimonials.reviews.carlos.company",
    quoteKey: "testimonials.reviews.carlos.quote",
    avatar: "carlosm",
  },
  {
    nameKey: "testimonials.reviews.ana.name",
    roleKey: "testimonials.reviews.ana.role",
    companyKey: "testimonials.reviews.ana.company",
    quoteKey: "testimonials.reviews.ana.quote",
    avatar: "anas",
  },
];

const stats: Stat[] = [
  {
    valueKey: "testimonials.stats.workers.value",
    labelKey: "testimonials.stats.workers.label",
    descriptionKey: "testimonials.stats.workers.description",
  },
  {
    valueKey: "testimonials.stats.companies.value",
    labelKey: "testimonials.stats.companies.label",
    descriptionKey: "testimonials.stats.companies.description",
  },
  {
    valueKey: "testimonials.stats.satisfaction.value",
    labelKey: "testimonials.stats.satisfaction.label",
    descriptionKey: "testimonials.stats.satisfaction.description",
  },
  {
    valueKey: "testimonials.stats.availability.value",
    labelKey: "testimonials.stats.availability.label",
    descriptionKey: "testimonials.stats.availability.description",
  },
];

export const LandingTestimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-sky-50 to-slate-50 dark:from-slate-800 dark:to-slate-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 transition-colors duration-200">
            <Trans
              components={{
                1: <span className="text-sky-600 dark:text-sky-400" />,
              }}
              i18nKey="testimonials.title"
            />
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
            {t("testimonials.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.labelKey}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-bold text-sky-600 dark:text-sky-400 mb-2 transition-colors duration-200">
                  {t(stat.valueKey)}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1 transition-colors duration-200">
                  {t(stat.labelKey)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-200">
                  {t(stat.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.nameKey}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <img
                  alt={t(testimonial.nameKey)}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  src={`https://picsum.photos/seed/${testimonial.avatar}/60/60`}
                />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 transition-colors duration-200">
                    {t(testimonial.nameKey)}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-200">
                    {t(testimonial.roleKey)} en {t(testimonial.companyKey)}
                  </p>
                </div>
              </div>

              <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 transition-colors duration-200">
                &ldquo;{t(testimonial.quoteKey)}&rdquo;
              </blockquote>

              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <title>Rating Star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
