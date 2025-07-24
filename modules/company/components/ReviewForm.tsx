import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";

import { ReviewService } from "@/services";
import { ReviewDocument } from "@/types";
import ThankYouModal from "@/components/ThankYouModal";
import CompanyHeader from "./CompanyHeader";

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

const StarRating = ({
  rating,
  onRatingChange,
  label,
  description,
}: StarRatingProps) => {
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
            className={`w-10 h-10 transition-all duration-200 hover:scale-110 ${
              star <= (hoverRating || rating)
                ? "text-yellow-400 hover:text-yellow-500"
                : "text-slate-300 dark:text-slate-600 hover:text-yellow-300"
            }`}
            type="button"
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

export default function ReviewForm({ company }: { company: any }) {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation();

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
  const [dateError, setDateError] = useState<string>("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const handleModalClose = () => {
    setShowThankYouModal(false);
    // Redirigir a la página de la empresa después de cerrar el modal
    router.push(`/company/${slug}`);
  };

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

    // Validar que la fecha de inicio sea menor que la fecha de fin
    if (!formData.currentlyWorking && formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (startDate >= endDate) {
        alert("La fecha de inicio debe ser anterior a la fecha de fin.");

        return;
      }
    }

    // Validar si hay errores de fecha pendientes
    if (dateError) {
      alert(dateError);

      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar los datos para Firebase
      const reviewData: Omit<ReviewDocument, "id" | "createdAt" | "updatedAt"> =
        {
          companyId: company.id,
          companyName: company.companyName,
          creationDate: new Date().toISOString(),
          role: formData.role,
          startDate: formData.startDate,
          endDate: formData.currentlyWorking ? null : formData.endDate,
          workEnvironment: formData.workEnvironmentRating,
          salary: formData.compensationRating,
          benefits: formData.benefitsRating,
          companyCulture: formData.cultureRating,
          internalCommunication: formData.leadershipRating,
          professionalGrowth: formData.careerGrowthRating,
          workLifeBalance: formData.workLifeBalanceRating,
          overallRating: formData.overallRating,
          workInclusion: formData.inclusionRating,
          positiveAspects: formData.pros,
          areasForImprovement: formData.cons,
          recommend: formData.wouldRecommend,
          terms: formData.acceptedTerms,
          approved: false,
        };

      // Enviar a Firebase
      await ReviewService.addReview(reviewData);

      // Mostrar modal de agradecimiento
      setShowThankYouModal(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error submitting review:", error);
      alert(t("reviewForm.error.message"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ReviewFormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Validar fechas cuando se actualiza startDate o endDate
      if (
        (field === "startDate" || field === "endDate") &&
        !newData.currentlyWorking
      ) {
        if (newData.startDate && newData.endDate) {
          const startDate = new Date(newData.startDate);
          const endDate = new Date(newData.endDate);

          if (startDate >= endDate) {
            setDateError(
              "La fecha de inicio debe ser anterior a la fecha de fin.",
            );
          } else {
            setDateError("");
          }
        } else {
          setDateError("");
        }
      }

      // Limpiar error de fecha si se marca como trabajo actual
      if (field === "currentlyWorking" && value) {
        setDateError("");
      }

      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
      {/* Reusable Company Header */}
      {company && (
        <CompanyHeader
          company={company}
          showBackButton
          totalReviewsCount={company.reviewsCount || 0}
        />
      )}

      {/* Main Form Section */}
      <section className="py-14 px-4 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Form Column */}
            <div className="flex-1">
              <Card className="p-8 shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-colors duration-200">
                <form className="space-y-8" onSubmit={handleSubmit}>
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
                        isRequired
                        classNames={{
                          input: "text-slate-900 dark:text-white",
                          label:
                            "text-slate-700 dark:text-slate-300 font-medium",
                        }}
                        label={t("reviewForm.workInfo.role")}
                        placeholder={t("reviewForm.workInfo.rolePlaceholder")}
                        size="lg"
                        value={formData.role}
                        variant="bordered"
                        onChange={(e) => handleChange("role", e.target.value)}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          isRequired
                          classNames={{
                            input: "text-slate-900 dark:text-white",
                            label:
                              "text-slate-700 dark:text-slate-300 font-medium",
                          }}
                          label={t("reviewForm.workInfo.startDate")}
                          size="lg"
                          type="month"
                          value={formData.startDate}
                          variant="bordered"
                          onChange={(e) =>
                            handleChange("startDate", e.target.value)
                          }
                        />

                        {!formData.currentlyWorking && (
                          <Input
                            classNames={{
                              input: "text-slate-900 dark:text-white",
                              label:
                                "text-slate-700 dark:text-slate-300 font-medium",
                            }}
                            isRequired={!formData.currentlyWorking}
                            label={t("reviewForm.workInfo.endDate")}
                            size="lg"
                            type="month"
                            value={formData.endDate}
                            variant="bordered"
                            onChange={(e) =>
                              handleChange("endDate", e.target.value)
                            }
                          />
                        )}
                      </div>

                      {/* Error message for date validation */}
                      {dateError && (
                        <div className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                          {dateError}
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          classNames={{
                            label:
                              "text-slate-700 dark:text-slate-300 font-medium",
                          }}
                          isSelected={formData.currentlyWorking}
                          onValueChange={(checked) => {
                            handleChange("currentlyWorking", checked);
                            if (checked) handleChange("endDate", "");
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
                        description={t(
                          "reviewForm.ratings.workEnvironmentDesc",
                        )}
                        label={t("reviewForm.ratings.workEnvironment")}
                        rating={formData.workEnvironmentRating}
                        onRatingChange={(rating) =>
                          handleChange("workEnvironmentRating", rating)
                        }
                      />

                      <StarRating
                        description={t("reviewForm.ratings.compensationDesc")}
                        label={t("reviewForm.ratings.compensation")}
                        rating={formData.compensationRating}
                        onRatingChange={(rating) =>
                          handleChange("compensationRating", rating)
                        }
                      />

                      <StarRating
                        description={t("reviewForm.ratings.benefitsDesc")}
                        label={t("reviewForm.ratings.benefits")}
                        rating={formData.benefitsRating}
                        onRatingChange={(rating) =>
                          handleChange("benefitsRating", rating)
                        }
                      />

                      <StarRating
                        description={t("reviewForm.ratings.cultureDesc")}
                        label={t("reviewForm.ratings.culture")}
                        rating={formData.cultureRating}
                        onRatingChange={(rating) =>
                          handleChange("cultureRating", rating)
                        }
                      />

                      <StarRating
                        description={t("reviewForm.ratings.communicationDesc")}
                        label={t("reviewForm.ratings.communication")}
                        rating={formData.leadershipRating}
                        onRatingChange={(rating) =>
                          handleChange("leadershipRating", rating)
                        }
                      />

                      <StarRating
                        description={t("reviewForm.ratings.careerGrowthDesc")}
                        label={t("reviewForm.ratings.careerGrowth")}
                        rating={formData.careerGrowthRating}
                        onRatingChange={(rating) =>
                          handleChange("careerGrowthRating", rating)
                        }
                      />

                      <StarRating
                        description={t(
                          "reviewForm.ratings.workLifeBalanceDesc",
                        )}
                        label={t("reviewForm.ratings.workLifeBalance")}
                        rating={formData.workLifeBalanceRating}
                        onRatingChange={(rating) =>
                          handleChange("workLifeBalanceRating", rating)
                        }
                      />

                      <StarRating
                        description={t("reviewForm.ratings.inclusionDesc")}
                        label={t("reviewForm.ratings.inclusion")}
                        rating={formData.inclusionRating}
                        onRatingChange={(rating) =>
                          handleChange("inclusionRating", rating)
                        }
                      />

                      <StarRating
                        description={t("reviewForm.ratings.overallDesc")}
                        label={t("reviewForm.ratings.overall")}
                        rating={formData.overallRating}
                        onRatingChange={(rating) =>
                          handleChange("overallRating", rating)
                        }
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
                          className="block text-slate-700 dark:text-slate-300 font-medium text-sm"
                          htmlFor="pros"
                        >
                          {t("reviewForm.experience.pros")}
                        </label>
                        <textarea
                          required
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800 transition-colors duration-200"
                          id="pros"
                          placeholder={t(
                            "reviewForm.experience.prosPlaceholder",
                          )}
                          rows={4}
                          value={formData.pros}
                          onChange={(e) => handleChange("pros", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          className="block text-slate-700 dark:text-slate-300 font-medium text-sm"
                          htmlFor="cons"
                        >
                          {t("reviewForm.experience.cons")}
                        </label>
                        <textarea
                          required
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800 transition-colors duration-200"
                          id="cons"
                          placeholder={t(
                            "reviewForm.experience.consPlaceholder",
                          )}
                          rows={4}
                          value={formData.cons}
                          onChange={(e) => handleChange("cons", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recomendación y Términos */}
                  <div className="space-y-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        classNames={{
                          label:
                            "text-slate-700 dark:text-slate-300 font-medium",
                        }}
                        isSelected={formData.wouldRecommend}
                        onValueChange={(checked) =>
                          handleChange("wouldRecommend", checked)
                        }
                      >
                        {t("reviewForm.wouldRecommend")}
                      </Checkbox>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors duration-200">
                      <input
                        checked={formData.acceptedTerms}
                        className="mt-1 w-4 h-4 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 rounded focus:ring-sky-500 dark:focus:ring-sky-400 focus:ring-2"
                        id="terms"
                        type="checkbox"
                        onChange={(e) =>
                          handleChange("acceptedTerms", e.target.checked)
                        }
                      />
                      <label
                        className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed cursor-pointer"
                        htmlFor="terms"
                      >
                        <Trans
                          components={{
                            1: (
                              // eslint-disable-next-line jsx-a11y/anchor-has-content
                              <a
                                className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 underline"
                                href="/terms"
                                rel="noopener noreferrer"
                                target="_blank"
                              />
                            ),
                          }}
                          i18nKey="addCompany.form.terms"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      className={`font-semibold px-8 py-3 transition-all duration-200 flex-1 sm:flex-initial ${
                        !formData.acceptedTerms || isSubmitting || !!dateError
                          ? "bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed opacity-60"
                          : "bg-sky-600 dark:bg-sky-600 text-white hover:bg-sky-700 dark:hover:bg-sky-700 hover:scale-105 shadow-md hover:shadow-lg"
                      }`}
                      disabled={
                        !formData.acceptedTerms || isSubmitting || !!dateError
                      }
                      size="lg"
                      type="submit"
                    >
                      {isSubmitting
                        ? t("reviewForm.submitting")
                        : t("reviewForm.submit")}
                    </Button>
                    <Button
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium px-8 py-3 transition-colors duration-200"
                      size="lg"
                      variant="bordered"
                      onPress={() => router.push(`/company/${slug}`)}
                    >
                      {t("reviewForm.cancel")}
                    </Button>
                  </div>
                </form>
              </Card>{" "}
            </div>

            {/* Sidebar Information */}
            <div className="lg:w-72">
              <Card className="p-5 shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-200">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-200">
                    {t("addCompany.tips.title")}
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full mt-2 flex-shrink-0" />
                      {t("addCompany.tips.tip1")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full mt-2 flex-shrink-0" />
                      {t("addCompany.tips.tip2")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full mt-2 flex-shrink-0" />
                      {t("addCompany.tips.tip3")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full mt-2 flex-shrink-0" />
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
                  className="w-full border-sky-200 dark:border-sky-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors duration-200"
                  size="sm"
                  variant="bordered"
                >
                  {t("addCompany.contact.button")}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Modal */}
      <ThankYouModal
        isOpen={showThankYouModal}
        type="review"
        onClose={handleModalClose}
      />
    </div>
  );
}
