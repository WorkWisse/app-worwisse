import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";

import { LandingHeader } from "@/modules/core/components";
import { mockCompanies } from "@/data/mockCompanies";

interface ReviewFormData {
  // Información laboral
  role: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;

  // Calificaciones con sistema de estrellas (1-5)
  workEnvironmentRating: number;
  compensationRating: number;
  benefitsRating: number;
  cultureRating: number;
  leadershipRating: number;
  careerGrowthRating: number;
  workLifeBalanceRating: number;
  inclusionRating: number;
  overallRating: number;

  // Experiencia
  pros: string;
  cons: string;

  // Otros
  wouldRecommend: boolean;
  acceptedTerms: boolean;
}

// Componente para el sistema de estrellas
interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  label: string;
  description?: string;
}

const StarRating = ({ rating, onRatingChange, label, description }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const { t } = useTranslation();

  const getRatingText = (score: number) => {
    return t(`reviewForm.ratingScale.${score}`);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {description}
            </p>
          )}
        </div>
        <span className="text-sm font-medium text-sky-600 dark:text-sky-400">
          {getRatingText(hoverRating || rating)}
        </span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`w-10 h-10 transition-all duration-200 hover:scale-110 ${star <= (hoverRating || rating)
              ? "text-yellow-400 hover:text-yellow-500"
              : "text-slate-300 dark:text-slate-600 hover:text-yellow-300"
              }`}
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <svg className="w-full h-full fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function ReviewForm() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation();

  // Obtener información de la empresa
  const company = mockCompanies.find((c) => c.slug === slug);

  const [formData, setFormData] = useState<ReviewFormData>({
    role: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    workEnvironmentRating: 0,
    compensationRating: 0,
    benefitsRating: 0,
    cultureRating: 0,
    leadershipRating: 0,
    careerGrowthRating: 0,
    workLifeBalanceRating: 0,
    inclusionRating: 0,
    overallRating: 0,
    pros: "",
    cons: "",
    wouldRecommend: false,
    acceptedTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptedTerms) {
      alert(t("reviewForm.validation.acceptTermsRequired"));
      return;
    }

    // Validar que se hayan completado las calificaciones principales
    if (formData.overallRating === 0 || formData.workEnvironmentRating === 0) {
      alert(t("reviewForm.validation.ratingsRequired"));
      return;
    }

    setIsSubmitting(true);

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Review submitted:", formData);
    setIsSubmitting(false);

    // Redirigir a la página de la empresa
    router.push(`/company/${slug}`);
  };

  const handleChange = (field: keyof ReviewFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < Math.floor(rating)
          ? "text-yellow-400 fill-current"
          : index < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-slate-300 dark:text-slate-600"
          }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
      {/* Compact Company Header - Identical to CompanyDetail */}
      {company && (
        <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Back Button and Company Logo and Basic Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Back Button */}
                <div className="flex-shrink-0">
                  <Button
                    className="bg-slate-600 hover:bg-slate-700 text-white font-semibold px-3 sm:px-4 py-2 text-sm sm:text-base"
                    size="sm"
                    onPress={() => router.push(`/company/${slug}`)}
                  >
                    ← Volver
                  </Button>
                </div>

                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => router.push(`/company/${slug}`)}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <img
                      alt={`Logo de ${company.name}`}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg shadow-md object-cover"
                      src={company.logo}
                    />
                  </button>
                </div>

                {/* Company Info */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {company.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-medium">{company.industry}</span>
                    <span className="text-slate-400 hidden sm:inline">•</span>
                    <span className="truncate">{company.location.city}, {company.location.country}</span>
                    {company.website && (
                      <>
                        <span className="text-slate-400 hidden md:inline">•</span>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors hidden md:inline"
                        >
                          {t("companyDetail.website")}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-start sm:justify-end">
                <div className="flex scale-75 sm:scale-100">{renderStars(company.rating)}</div>
                <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {company.rating}
                </span>
                <span className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  ({company.reviewsCount} {t("reviewForm.hero.reviews")})
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Form Section */}
      <section className="py-14 px-4 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Form Column */}
            <div className="flex-1">
              <Card className="p-8 shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-colors duration-200">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Información Laboral */}
                  <div className="space-y-6">
                    <div className="text-center border-b border-slate-200 dark:border-slate-700 pb-4">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {t("reviewForm.workInfo.title")}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        {t("reviewForm.workInfo.description")}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <Input
                        label={t("reviewForm.workInfo.role")}
                        placeholder={t("reviewForm.workInfo.rolePlaceholder")}
                        value={formData.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                        isRequired
                        size="lg"
                        variant="bordered"
                        classNames={{
                          input: "text-slate-900 dark:text-white",
                          label: "text-slate-700 dark:text-slate-300 font-medium",
                        }}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label={t("reviewForm.workInfo.startDate")}
                          type="month"
                          value={formData.startDate}
                          onChange={(e) => handleChange("startDate", e.target.value)}
                          isRequired
                          size="lg"
                          variant="bordered"
                          classNames={{
                            input: "text-slate-900 dark:text-white",
                            label: "text-slate-700 dark:text-slate-300 font-medium",
                          }}
                        />

                        {!formData.currentlyWorking && (
                          <Input
                            label={t("reviewForm.workInfo.endDate")}
                            type="month"
                            value={formData.endDate}
                            onChange={(e) => handleChange("endDate", e.target.value)}
                            isRequired={!formData.currentlyWorking}
                            size="lg"
                            variant="bordered"
                            classNames={{
                              input: "text-slate-900 dark:text-white",
                              label: "text-slate-700 dark:text-slate-300 font-medium",
                            }}
                          />
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          isSelected={formData.currentlyWorking}
                          onValueChange={(checked) => {
                            handleChange("currentlyWorking", checked);
                            if (checked) handleChange("endDate", "");
                          }}
                          classNames={{
                            label: "text-slate-700 dark:text-slate-300 font-medium",
                          }}
                        >
                          {t("reviewForm.workInfo.currentlyWorking")}
                        </Checkbox>
                      </div>
                    </div>
                  </div>

                  {/* Calificaciones */}
                  <div className="space-y-6">
                    <div className="text-center border-b border-slate-200 dark:border-slate-700 pb-4">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {t("reviewForm.ratings.title")}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        {t("reviewForm.ratings.description")}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <StarRating
                        rating={formData.workEnvironmentRating}
                        onRatingChange={(rating) => handleChange("workEnvironmentRating", rating)}
                        label={t("reviewForm.ratings.workEnvironment")}
                        description={t("reviewForm.ratings.workEnvironmentDesc")}
                      />

                      <StarRating
                        rating={formData.compensationRating}
                        onRatingChange={(rating) => handleChange("compensationRating", rating)}
                        label={t("reviewForm.ratings.compensation")}
                        description={t("reviewForm.ratings.compensationDesc")}
                      />

                      <StarRating
                        rating={formData.benefitsRating}
                        onRatingChange={(rating) => handleChange("benefitsRating", rating)}
                        label={t("reviewForm.ratings.benefits")}
                        description={t("reviewForm.ratings.benefitsDesc")}
                      />

                      <StarRating
                        rating={formData.cultureRating}
                        onRatingChange={(rating) => handleChange("cultureRating", rating)}
                        label={t("reviewForm.ratings.culture")}
                        description={t("reviewForm.ratings.cultureDesc")}
                      />

                      <StarRating
                        rating={formData.leadershipRating}
                        onRatingChange={(rating) => handleChange("leadershipRating", rating)}
                        label={t("reviewForm.ratings.communication")}
                        description={t("reviewForm.ratings.communicationDesc")}
                      />

                      <StarRating
                        rating={formData.careerGrowthRating}
                        onRatingChange={(rating) => handleChange("careerGrowthRating", rating)}
                        label={t("reviewForm.ratings.careerGrowth")}
                        description={t("reviewForm.ratings.careerGrowthDesc")}
                      />

                      <StarRating
                        rating={formData.workLifeBalanceRating}
                        onRatingChange={(rating) => handleChange("workLifeBalanceRating", rating)}
                        label={t("reviewForm.ratings.workLifeBalance")}
                        description={t("reviewForm.ratings.workLifeBalanceDesc")}
                      />

                      <StarRating
                        rating={formData.inclusionRating}
                        onRatingChange={(rating) => handleChange("inclusionRating", rating)}
                        label={t("reviewForm.ratings.inclusion")}
                        description={t("reviewForm.ratings.inclusionDesc")}
                      />

                      <StarRating
                        rating={formData.overallRating}
                        onRatingChange={(rating) => handleChange("overallRating", rating)}
                        label={t("reviewForm.ratings.overall")}
                        description={t("reviewForm.ratings.overallDesc")}
                      />
                    </div>
                  </div>

                  {/* Experiencia Detallada */}
                  <div className="space-y-6">
                    <div className="text-center border-b border-slate-200 dark:border-slate-700 pb-4">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {t("reviewForm.experience.title")}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        {t("reviewForm.experience.description")}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="pros"
                          className="block text-slate-700 dark:text-slate-300 font-medium text-sm"
                        >
                          {t("reviewForm.experience.pros")}
                        </label>
                        <textarea
                          id="pros"
                          placeholder={t("reviewForm.experience.prosPlaceholder")}
                          value={formData.pros}
                          onChange={(e) => handleChange("pros", e.target.value)}
                          required
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800 transition-colors duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="cons"
                          className="block text-slate-700 dark:text-slate-300 font-medium text-sm"
                        >
                          {t("reviewForm.experience.cons")}
                        </label>
                        <textarea
                          id="cons"
                          placeholder={t("reviewForm.experience.consPlaceholder")}
                          value={formData.cons}
                          onChange={(e) => handleChange("cons", e.target.value)}
                          required
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800 transition-colors duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recomendación y Términos */}
                  <div className="space-y-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        isSelected={formData.wouldRecommend}
                        onValueChange={(checked) => handleChange("wouldRecommend", checked)}
                        classNames={{
                          label: "text-slate-700 dark:text-slate-300 font-medium",
                        }}
                      >
                        {t("reviewForm.wouldRecommend")}
                      </Checkbox>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        isSelected={formData.acceptedTerms}
                        onValueChange={(checked) => handleChange("acceptedTerms", checked)}
                        isRequired
                        classNames={{
                          label: "text-slate-700 dark:text-slate-300",
                        }}
                      >
                        <span className="text-sm">
                          <Trans
                            i18nKey="reviewForm.acceptTerms"
                            components={{
                              1: <a
                                href="/terms"
                                className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors underline cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              />
                            }}
                          />
                        </span>
                      </Checkbox>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={!formData.acceptedTerms || isSubmitting}
                      className="bg-sky-600 dark:bg-sky-600 text-white hover:bg-sky-700 dark:hover:bg-sky-700 font-semibold px-8 py-3 transition-colors duration-200 flex-1 sm:flex-initial"
                    >
                      {isSubmitting ? t("reviewForm.submitting") : t("reviewForm.submit")}
                    </Button>
                    <Button
                      variant="bordered"
                      size="lg"
                      onPress={() => router.push(`/company/${slug}`)}
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium px-8 py-3 transition-colors duration-200"
                    >
                      {t("reviewForm.cancel")}
                    </Button>
                  </div>
                </form>
              </Card>            </div>

            {/* Sidebar Information */}
            <div className="lg:w-72">
              <Card className="p-5 shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-200">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-200">
                    {t("addCompany.tips.title")}
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full mt-2 flex-shrink-0"></span>
                      {t("addCompany.tips.tip1")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full mt-2 flex-shrink-0"></span>
                      {t("addCompany.tips.tip2")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full mt-2 flex-shrink-0"></span>
                      {t("addCompany.tips.tip3")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full mt-2 flex-shrink-0"></span>
                      {t("addCompany.tips.tip4")}
                    </li>
                  </ul>
                </div>
              </Card>

              {/* Contact Card */}
              <Card className="p-5 shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-200 mt-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-200">
                  {t("addCompany.contact.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  {t("addCompany.contact.description")}
                </p>
                <Button
                  variant="bordered"
                  size="sm"
                  className="w-full border-sky-200 dark:border-sky-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors duration-200"
                >
                  {t("addCompany.contact.button")}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
