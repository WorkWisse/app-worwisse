import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Slider } from "@heroui/slider";
import { Textarea } from "@heroui/input";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { LandingHeader } from "@/modules/core/components";
import { mockCompanies } from "@/data/mockCompanies";

interface ReviewFormData {
  role: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  environmentRating: number;
  codeQualityRating: number;
  growthPoliciesRating: number;
  infrastructureRating: number;
  benefitsRating: number;
  equipmentRating: number;
  salaryRating: number;
  inclusionPoliciesRating: number;
  pros: string;
  cons: string;
  wouldRecommend: boolean;
  acceptedTerms: boolean;
}

export default function ReviewForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug } = router.query;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
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

  // Obtener información de la empresa
  const company = mockCompanies.find((c) => c.slug === slug);

  const [formData, setFormData] = useState<ReviewFormData>({
    role: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    environmentRating: 5,
    codeQualityRating: 5,
    growthPoliciesRating: 5,
    infrastructureRating: 5,
    benefitsRating: 5,
    equipmentRating: 5,
    salaryRating: 5,
    inclusionPoliciesRating: 5,
    pros: "",
    cons: "",
    wouldRecommend: false,
    acceptedTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      alert(t("reviewForm.mustAcceptTerms"));
      return;
    }
    // Aquí iría la lógica para enviar la reseña
    console.log("Review submitted:", formData);
    router.push(`/company/${slug}`);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <LandingHeader />
      {/* Company Header */}
      {company && (
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <img
                  alt={`Logo de ${company.name}`}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl shadow-lg object-cover"
                  src={company.logo}
                />
              </div>

              {/* Company Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                    {company.name}
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
                    {company.industry} • {company.location.city},{" "}
                    {company.location.country}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(company.rating)}</div>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      {company.rating}
                    </span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-300">
                    {company.reviewsCount} opiniones
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 text-sm">
                  {company.website && (
                    <a
                      className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                      href={company.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      <span>{t("companyDetail.website")}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  className="bg-sky-600 hover:bg-sky-700"
                  color="primary"
                  size="lg"
                  onPress={() => router.push(`/company/${slug}`)}
                >
                  {t("reviewForm.viewReview")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardBody>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información Laboral */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {t("reviewForm.workInfo.title")}
                    </h2>

                    <Input
                      label={t("reviewForm.workInfo.role")}
                      placeholder={t("reviewForm.workInfo.rolePlaceholder")}
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      isRequired
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label={t("reviewForm.workInfo.startDate")}
                        type="month"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startDate: e.target.value,
                          })
                        }
                        isRequired
                      />

                      {!formData.currentlyWorking && (
                        <Input
                          label={t("reviewForm.workInfo.endDate")}
                          type="month"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.value,
                            })
                          }
                          isRequired={!formData.currentlyWorking}
                        />
                      )}
                    </div>

                    <Checkbox
                      isSelected={formData.currentlyWorking}
                      onValueChange={(checked) =>
                        setFormData({
                          ...formData,
                          currentlyWorking: checked,
                          endDate: checked ? "" : formData.endDate,
                        })
                      }
                    >
                      {t("reviewForm.workInfo.currentlyWorking")}
                    </Checkbox>
                  </div>

                  {/* Calificaciones */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {t("reviewForm.ratings.title")}
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t("reviewForm.ratings.environment")}:{" "}
                          {formData.environmentRating}/10
                        </label>
                        <Slider
                          size="md"
                          step={1}
                          maxValue={10}
                          minValue={0}
                          value={formData.environmentRating}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              environmentRating: Array.isArray(value)
                                ? value[0]
                                : value,
                            })
                          }
                          className="max-w-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t("reviewForm.ratings.codeQuality")}:{" "}
                          {formData.codeQualityRating}/10
                        </label>
                        <Slider
                          size="md"
                          step={1}
                          maxValue={10}
                          minValue={0}
                          value={formData.codeQualityRating}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              codeQualityRating: Array.isArray(value)
                                ? value[0]
                                : value,
                            })
                          }
                          className="max-w-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t("reviewForm.ratings.growthPolicies")}:{" "}
                          {formData.growthPoliciesRating}/10
                        </label>
                        <Slider
                          size="md"
                          step={1}
                          maxValue={10}
                          minValue={0}
                          value={formData.growthPoliciesRating}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              growthPoliciesRating: Array.isArray(value)
                                ? value[0]
                                : value,
                            })
                          }
                          className="max-w-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t("reviewForm.ratings.infrastructure")}:{" "}
                          {formData.infrastructureRating}/10
                        </label>
                        <Slider
                          size="md"
                          step={1}
                          maxValue={10}
                          minValue={0}
                          value={formData.infrastructureRating}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              infrastructureRating: Array.isArray(value)
                                ? value[0]
                                : value,
                            })
                          }
                          className="max-w-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t("reviewForm.ratings.benefits")}:{" "}
                          {formData.benefitsRating}/10
                        </label>
                        <Slider
                          size="md"
                          step={1}
                          maxValue={10}
                          minValue={0}
                          value={formData.benefitsRating}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              benefitsRating: Array.isArray(value)
                                ? value[0]
                                : value,
                            })
                          }
                          className="max-w-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t("reviewForm.ratings.equipment")}:{" "}
                          {formData.equipmentRating}/8
                        </label>
                        <Slider
                          size="md"
                          step={1}
                          maxValue={8}
                          minValue={0}
                          value={formData.equipmentRating}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              equipmentRating: Array.isArray(value)
                                ? value[0]
                                : value,
                            })
                          }
                          className="max-w-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t("reviewForm.ratings.salary")}:{" "}
                          {formData.salaryRating}/10
                        </label>
                        <Slider
                          size="md"
                          step={1}
                          maxValue={10}
                          minValue={0}
                          value={formData.salaryRating}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              salaryRating: Array.isArray(value)
                                ? value[0]
                                : value,
                            })
                          }
                          className="max-w-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t("reviewForm.ratings.inclusionPolicies")}:{" "}
                          {formData.inclusionPoliciesRating}/10
                        </label>
                        <Slider
                          size="md"
                          step={1}
                          maxValue={10}
                          minValue={0}
                          value={formData.inclusionPoliciesRating}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              inclusionPoliciesRating: Array.isArray(value)
                                ? value[0]
                                : value,
                            })
                          }
                          className="max-w-md"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experiencia */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {t("reviewForm.experience.title")}
                    </h2>

                    <Textarea
                      label={t("reviewForm.experience.pros")}
                      placeholder={t("reviewForm.experience.prosPlaceholder")}
                      value={formData.pros}
                      onChange={(e) =>
                        setFormData({ ...formData, pros: e.target.value })
                      }
                      rows={4}
                      isRequired
                    />

                    <Textarea
                      label={t("reviewForm.experience.cons")}
                      placeholder={t("reviewForm.experience.consPlaceholder")}
                      value={formData.cons}
                      onChange={(e) =>
                        setFormData({ ...formData, cons: e.target.value })
                      }
                      rows={4}
                      isRequired
                    />
                  </div>

                  {/* Recomendación y Términos */}
                  <div className="flex flex-col space-y-4">
                    <Checkbox
                      isSelected={formData.wouldRecommend}
                      onValueChange={(checked) =>
                        setFormData({ ...formData, wouldRecommend: checked })
                      }
                    >
                      {t("reviewForm.wouldRecommend")}
                    </Checkbox>

                    <Checkbox
                      isSelected={formData.acceptedTerms}
                      onValueChange={(checked) =>
                        setFormData({ ...formData, acceptedTerms: checked })
                      }
                      isRequired
                    >
                      <span>
                        {t("reviewForm.acceptTermsPrefix")}{" "}
                        <a
                          href="/terms"
                          className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("reviewForm.acceptTermsLink")}
                        </a>
                      </span>
                    </Checkbox>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      color="primary"
                      type="submit"
                      isDisabled={!formData.acceptedTerms}
                      className="bg-sky-600 hover:bg-sky-700"
                    >
                      {t("reviewForm.submit")}
                    </Button>
                    <Button
                      variant="light"
                      onPress={() => router.push(`/company/${slug}`)}
                    >
                      {t("reviewForm.cancel")}
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t("reviewForm.sidebar.title")}
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {t("reviewForm.sidebar.description")}
                </p>{" "}
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    <a
                      href="/terms"
                      className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("reviewForm.sidebar.rulesTitle")}
                    </a>
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      {t("reviewForm.sidebar.rule1")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      {t("reviewForm.sidebar.rule2")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      {t("reviewForm.sidebar.rule3")}
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
