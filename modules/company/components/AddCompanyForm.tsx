import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Trans, useTranslation } from "react-i18next";

import { CompanyService } from "@/services/companyService";
import { ImageService } from "@/services/imageService";
import { CompanyDocument } from "@/types";
import { useToast } from "@/modules/core/components";
import {
  getPredefinedBenefits,
  getIndustries,
  getCountries,
  countryRegions,
} from "@/modules/company/data/companyFormData";
import ThankYouModal from "@/components/ThankYouModal";
import { useRouter } from "next/router";

export default function AddCompanyForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showError, showWarning } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    country: "",
    state: "",
    website: "",
    terms: false,
    benefits: [] as string[], // Cambiar a array de strings
    logo: null as File | null, // Nuevo campo para el logo
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  // Set initial company name from URL query
  useEffect(() => {
    if (router.query.name && typeof router.query.name === "string") {
      setFormData((prev) => ({ ...prev, name: router.query.name as string }));
    }
  }, [router.query.name]);

  // Nuevo estado para el autocomplete de beneficios
  const [benefitsInput, setBenefitsInput] = useState("");
  const [showBenefitsSuggestions, setShowBenefitsSuggestions] = useState(false);

  // Lista de beneficios preestablecidos
  const predefinedBenefits = getPredefinedBenefits(t);

  const industries = getIndustries(t);

  const countries = getCountries(t);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Reset state when country changes
    if (field === "country") {
      setFormData((prev) => ({ ...prev, state: "" }));
    }
  };

  // Funciones para manejar beneficios
  const handleBenefitsInputChange = (value: string) => {
    setBenefitsInput(value);
    setShowBenefitsSuggestions(value.length > 0);
  };

  const addBenefit = (benefit: string) => {
    const trimmedBenefit = benefit.trim();

    if (trimmedBenefit && !formData.benefits.includes(trimmedBenefit)) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, trimmedBenefit],
      }));
    }
    setBenefitsInput("");
    setShowBenefitsSuggestions(false);
  };

  const removeBenefit = (benefitToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((benefit) => benefit !== benefitToRemove),
    }));
  };

  const handleBenefitsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (benefitsInput.trim()) {
        addBenefit(benefitsInput);
      }
    }
  };

  // Filtrar sugerencias basadas en el input
  const filteredBenefits = predefinedBenefits.filter(
    (benefit) =>
      benefit.toLowerCase().includes(benefitsInput.toLowerCase()) &&
      !formData.benefits.includes(benefit)
  );

  const handleSubmit = async () => {
    if (!acceptedTerms) {
      showWarning(
        t("addCompany.form.acceptTermsRequired"),
        t("addCompany.form.pleaseAcceptTerms")
      );

      return;
    }

    setIsSubmitting(true);
    try {
      // Get the industry and country labels for display
      const industryLabel =
        industries.find((i) => i.key === formData.industry)?.label ||
        formData.industry;
      const countryLabel =
        countries.find((c) => c.key === formData.country)?.label ||
        formData.country;
      const stateLabel =
        currentRegions.find((r) => r.key === formData.state)?.label ||
        formData.state;

      let logoUrl = `https://picsum.photos/seed/${formData.name}/200/200`; // Default logo

      // Upload logo if provided
      if (formData.logo) {
        setIsUploadingLogo(true);
        try {
          logoUrl = await ImageService.uploadImage(
            formData.logo,
            "companies/logos",
            `${formData.name.toLowerCase().replace(/\s+/g, "-")}-logo`,
          );
        } catch (logoError) {
          showError(
            t("addCompany.form.logo.uploadError"),
            (logoError as Error).message,
          );

          return;
        } finally {
          setIsUploadingLogo(false);
        }
      }

      // company data object
      const companyData: Omit<
        CompanyDocument,
        "id" | "createdAt" | "updatedAt"
      > = {
        companyName: formData.name, // Use the correct property name from CompanyDocument
        nameLowerCase: formData.name.toLowerCase(),
        reviewsCount: 0,
        rating: 0,
        industry: industryLabel,
        logoUrl, // Use the uploaded logo URL
        country: countryLabel,
        state: stateLabel,
        website: formData.website,
        benefits: formData.benefits.join(", "),
        terms: formData.terms,
        creationDate: new Date().toISOString(),
        approved: false,
        name: "",
        logo: logoUrl, // Also set this field for compatibility
        location: {
          country: countryLabel,
          state: stateLabel,
        },
      };

      // Save to Firebase
      await CompanyService.addCompany(companyData);

      // Reset form
      setFormData({
        name: "",
        industry: "",
        country: "",
        state: "",
        website: "",
        terms: false,
        benefits: [],
        logo: null,
      });
      setAcceptedTerms(false);
      setBenefitsInput("");
      setLogoPreview(null);
      setShowThankYouModal(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error adding company:", error);
      showError(
        t("addCompany.form.submitError"),
        t("addCompany.form.tryAgainLater")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Funciones para manejar el logo
  const handleLogoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        showError(
          t("addCompany.form.logo.uploadError"),
          t("addCompany.form.logo.invalidType")
        );

        return;
      }

      // Validar tamaño del archivo
      if (file.size > 5 * 1024 * 1024) {
        showError(
          t("addCompany.form.logo.uploadError"),
          t("addCompany.form.logo.invalidSize")
        );

        return;
      }

      // Validar dimensiones
      try {
        await ImageService.validateImageDimensions(file, 250, 250);
      } catch (error) {
        showError(
          t("addCompany.form.logo.uploadError"),
          (error as Error).message
        );

        return;
      }

      // Crear preview
      const preview = URL.createObjectURL(file);

      setLogoPreview(preview);

      // Guardar archivo en el estado
      setFormData((prev) => ({ ...prev, logo: file }));
    } catch {
      showError(
        t("addCompany.form.logo.uploadError"),
        t("addCompany.form.logo.uploadError")
      );
    }
  };

  const removeLogo = () => {
    setFormData((prev) => ({ ...prev, logo: null }));
    setLogoPreview(null);
    // Limpiar el input file
    const fileInput = document.getElementById("logo-input") as HTMLInputElement;

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const currentRegions = formData.country
    ? countryRegions[formData.country as keyof typeof countryRegions] || []
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-center text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 lg:mb-4 leading-tight transition-colors duration-200">
                <Trans
                  components={{
                    1: <span className="text-sky-600 dark:text-sky-400" />,
                  }}
                  i18nKey="addCompany.title"
                />
              </h1>
              <p className="text-center text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200">
                {t("addCompany.description")}
              </p>
            </div>

            <Card className="p-6 lg:p-8 shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-colors duration-200">
              <div className="space-y-5">
                {/* Row 1: Company Name and Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Company Name */}
                  <div>
                    <Input
                      isRequired
                      classNames={{
                        input: "text-slate-900 dark:text-white",
                        label: "text-slate-700 dark:text-slate-300 font-medium",
                      }}
                      label={t("addCompany.form.name.label")}
                      placeholder={t("addCompany.form.name.placeholder")}
                      size="lg"
                      type="text"
                      value={formData.name}
                      variant="bordered"
                      onValueChange={(value) =>
                        handleInputChange("name", value)
                      }
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <Select
                      isRequired
                      classNames={{
                        value: "text-slate-900 dark:text-white",
                        label: "text-slate-700 dark:text-slate-300 font-medium",
                      }}
                      label={t("addCompany.form.industry.label")}
                      placeholder={t("addCompany.form.industry.placeholder")}
                      selectedKeys={
                        formData.industry ? [formData.industry] : []
                      }
                      size="lg"
                      variant="bordered"
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;

                        handleInputChange("industry", selectedKey);
                      }}
                    >
                      {industries.map((industry) => (
                        <SelectItem
                          key={industry.key}
                          className="text-slate-900 dark:text-white"
                        >
                          {industry.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* Row 2: Country and State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Country */}
                  <div>
                    <Select
                      isRequired
                      classNames={{
                        value: "text-slate-900 dark:text-white",
                        label: "text-slate-700 dark:text-slate-300 font-medium",
                      }}
                      label={t("addCompany.form.country.label")}
                      placeholder={t("addCompany.form.country.placeholder")}
                      selectedKeys={formData.country ? [formData.country] : []}
                      size="lg"
                      variant="bordered"
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;

                        handleInputChange("country", selectedKey);
                      }}
                    >
                      {countries.map((country) => (
                        <SelectItem
                          key={country.key}
                          className="text-slate-900 dark:text-white"
                        >
                          {country.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {/* State/Province */}
                  <div>
                    <Select
                      isRequired
                      classNames={{
                        value: "text-slate-900 dark:text-white",
                        label: "text-slate-700 dark:text-slate-300 font-medium",
                      }}
                      isDisabled={
                        !formData.country || currentRegions.length === 0
                      }
                      label={t("addCompany.form.state.label")}
                      placeholder={t("addCompany.form.state.placeholder")}
                      selectedKeys={formData.state ? [formData.state] : []}
                      size="lg"
                      variant="bordered"
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;

                        handleInputChange("state", selectedKey);
                      }}
                    >
                      {currentRegions.map((region) => (
                        <SelectItem
                          key={region.key}
                          className="text-slate-900 dark:text-white"
                        >
                          {region.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* Row 3: Website and Logo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Input
                      classNames={{
                        input: "text-slate-900 dark:text-white",
                        label: "text-slate-700 dark:text-slate-300 font-medium",
                      }}
                      label={t("addCompany.form.website.label")}
                      placeholder={t("addCompany.form.website.placeholder")}
                      size="lg"
                      type="url"
                      value={formData.website}
                      variant="bordered"
                      onValueChange={(value) =>
                        handleInputChange("website", value)
                      }
                    />
                  </div>

                  {/* Logo Upload */}
                  <div>
                    <label
                      className="block text-slate-700 dark:text-slate-300 font-medium text-sm mb-2"
                      htmlFor="logo-input"
                    >
                      {t("addCompany.form.logo.label")}
                    </label>

                    <div className="space-y-3">
                      {/* File input */}
                      <input
                        accept="image/*"
                        className="block w-full text-sm text-slate-500 dark:text-slate-400
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-sky-50 file:text-sky-700
                          hover:file:bg-sky-100
                          dark:file:bg-sky-900/30 dark:file:text-sky-300
                          dark:hover:file:bg-sky-800/30
                          file:cursor-pointer cursor-pointer"
                        id="logo-input"
                        type="file"
                        onChange={handleLogoChange}
                      />

                      {/* Preview */}
                      {logoPreview && (
                        <div className="relative inline-block">
                          <img
                            alt="Logo preview"
                            className="w-20 h-20 object-cover rounded-lg border-2 border-slate-200 dark:border-slate-600"
                            src={logoPreview}
                          />
                          <button
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                            type="button"
                            onClick={removeLogo}
                          >
                            ×
                          </button>
                        </div>
                      )}

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t("addCompany.form.logo.help")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Row 4: Benefits */}
                <div className="space-y-3">
                  <label
                    className="block text-slate-700 dark:text-slate-300 font-medium text-sm"
                    htmlFor="benefits"
                  >
                    {t("addCompany.form.benefits.label")}
                  </label>

                  {/* Benefits chips */}
                  {formData.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-200 rounded-lg text-sm border border-sky-200 dark:border-sky-700"
                        >
                          <span>{benefit}</span>
                          <button
                            className="ml-1 text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200 transition-colors"
                            type="button"
                            onClick={() => removeBenefit(benefit)}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M6 18L18 6M6 6l12 12"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Benefits input with autocomplete */}
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800 transition-colors duration-200"
                      id="benefits"
                      placeholder={t("addCompany.form.benefits.placeholder")}
                      type="text"
                      value={benefitsInput}
                      onBlur={() =>
                        setTimeout(() => setShowBenefitsSuggestions(false), 200)
                      }
                      onChange={(e) =>
                        handleBenefitsInputChange(e.target.value)
                      }
                      onFocus={() =>
                        setShowBenefitsSuggestions(benefitsInput.length > 0)
                      }
                      onKeyDown={handleBenefitsKeyDown}
                    />

                    {/* Autocomplete suggestions */}
                    {showBenefitsSuggestions && filteredBenefits.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredBenefits.slice(0, 8).map((benefit, index) => (
                          <button
                            key={index}
                            className="w-full px-4 py-2 text-left text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                            type="button"
                            onClick={() => addBenefit(benefit)}
                          >
                            {benefit}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("addCompany.form.benefits.help")}
                  </p>
                </div>

                {/* Row 5: Terms and Conditions */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors duration-200">
                  <input
                    checked={acceptedTerms}
                    className="mt-1 w-4 h-4 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 rounded focus:ring-sky-500 dark:focus:ring-sky-400 focus:ring-2"
                    id="terms"
                    type="checkbox"
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
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

                {/* Submit Button */}
                <Button
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-500 dark:to-blue-500 hover:from-sky-700 hover:to-blue-700 dark:hover:from-sky-600 dark:hover:to-blue-600 text-white font-semibold text-sm h-11 transition-all duration-200"
                  color="primary"
                  isDisabled={!acceptedTerms}
                  isLoading={isSubmitting || isUploadingLogo}
                  size="lg"
                  onPress={handleSubmit}
                >
                  {isSubmitting || isUploadingLogo
                    ? t("addCompany.form.submitting")
                    : t("addCompany.form.submit")}
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72">
            <div className="space-y-5">
              {/* Tips Card */}
              <Card className="p-5 shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-200">
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
              </Card>

              {/* Contact Card */}
              <Card className="p-5 shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-200">
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
      </div>

      {/* Thank You Modal */}
      <ThankYouModal
        isOpen={showThankYouModal}
        type="company"
        onClose={() => setShowThankYouModal(false)}
      />
    </div>
  );
}
