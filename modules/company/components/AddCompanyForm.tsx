import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Trans, useTranslation } from "react-i18next";

export default function AddCompanyForm() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        country: "",
        state: "",
        website: "",
        benefits: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const industries = [
        { key: "tech", label: t("addCompany.form.industry.options.tech") },
        { key: "finance", label: t("addCompany.form.industry.options.finance") },
        { key: "healthcare", label: t("addCompany.form.industry.options.healthcare") },
        { key: "education", label: t("addCompany.form.industry.options.education") },
        { key: "retail", label: t("addCompany.form.industry.options.retail") },
        { key: "manufacturing", label: t("addCompany.form.industry.options.manufacturing") },
        { key: "consulting", label: t("addCompany.form.industry.options.consulting") },
        { key: "marketing", label: t("addCompany.form.industry.options.marketing") },
        { key: "real-estate", label: t("addCompany.form.industry.options.real-estate") },
        { key: "logistics", label: t("addCompany.form.industry.options.logistics") },
        { key: "other", label: t("addCompany.form.industry.options.other") },
    ];

    const countries = [
        { key: "ar", label: t("addCompany.form.country.options.ar") },
        { key: "br", label: t("addCompany.form.country.options.br") },
        { key: "cl", label: t("addCompany.form.country.options.cl") },
        { key: "co", label: t("addCompany.form.country.options.co") },
        { key: "mx", label: t("addCompany.form.country.options.mx") },
        { key: "pe", label: t("addCompany.form.country.options.pe") },
        { key: "uy", label: t("addCompany.form.country.options.uy") },
        { key: "other", label: t("addCompany.form.country.options.other") },
    ];

    // Estados/Provincias/Departamentos por país
    const countryRegions = {
        ar: [
            { key: "caba", label: "Ciudad Autónoma de Buenos Aires" },
            { key: "buenos-aires", label: "Buenos Aires" },
            { key: "cordoba", label: "Córdoba" },
            { key: "santa-fe", label: "Santa Fe" },
            { key: "mendoza", label: "Mendoza" },
            { key: "tucuman", label: "Tucumán" },
            { key: "entre-rios", label: "Entre Ríos" },
            { key: "salta", label: "Salta" },
            { key: "chaco", label: "Chaco" },
            { key: "corrientes", label: "Corrientes" },
            { key: "misiones", label: "Misiones" },
            { key: "santiago-del-estero", label: "Santiago del Estero" },
            { key: "jujuy", label: "Jujuy" },
            { key: "formosa", label: "Formosa" },
            { key: "neuquen", label: "Neuquén" },
            { key: "rio-negro", label: "Río Negro" },
            { key: "chubut", label: "Chubut" },
            { key: "santa-cruz", label: "Santa Cruz" },
            { key: "tierra-del-fuego", label: "Tierra del Fuego" },
            { key: "catamarca", label: "Catamarca" },
            { key: "la-rioja", label: "La Rioja" },
            { key: "san-juan", label: "San Juan" },
            { key: "san-luis", label: "San Luis" },
            { key: "la-pampa", label: "La Pampa" },
        ],
        br: [
            { key: "sp", label: "São Paulo" },
            { key: "rj", label: "Rio de Janeiro" },
            { key: "mg", label: "Minas Gerais" },
            { key: "rs", label: "Rio Grande do Sul" },
            { key: "ba", label: "Bahia" },
            { key: "pr", label: "Paraná" },
            { key: "sc", label: "Santa Catarina" },
            { key: "go", label: "Goiás" },
            { key: "pe", label: "Pernambuco" },
            { key: "ce", label: "Ceará" },
        ],
        cl: [
            { key: "rm", label: "Región Metropolitana" },
            { key: "valparaiso", label: "Valparaíso" },
            { key: "biobio", label: "Biobío" },
            { key: "araucania", label: "La Araucanía" },
            { key: "los-lagos", label: "Los Lagos" },
            { key: "antofagasta", label: "Antofagasta" },
            { key: "maule", label: "Maule" },
            { key: "libertador", label: "Libertador General Bernardo O'Higgins" },
        ],
        co: [
            { key: "bogota", label: "Bogotá D.C." },
            { key: "antioquia", label: "Antioquia" },
            { key: "valle", label: "Valle del Cauca" },
            { key: "cundinamarca", label: "Cundinamarca" },
            { key: "atlantico", label: "Atlántico" },
            { key: "santander", label: "Santander" },
            { key: "bolivar", label: "Bolívar" },
            { key: "norte-santander", label: "Norte de Santander" },
        ],
        mx: [
            { key: "cdmx", label: "Ciudad de México" },
            { key: "jalisco", label: "Jalisco" },
            { key: "nuevo-leon", label: "Nuevo León" },
            { key: "puebla", label: "Puebla" },
            { key: "guanajuato", label: "Guanajuato" },
            { key: "veracruz", label: "Veracruz" },
            { key: "yucatan", label: "Yucatán" },
            { key: "sonora", label: "Sonora" },
        ],
        pe: [
            { key: "lima", label: "Lima" },
            { key: "arequipa", label: "Arequipa" },
            { key: "la-libertad", label: "La Libertad" },
            { key: "piura", label: "Piura" },
            { key: "lambayeque", label: "Lambayeque" },
            { key: "cusco", label: "Cusco" },
            { key: "junin", label: "Junín" },
            { key: "ica", label: "Ica" },
        ],
        uy: [
            { key: "montevideo", label: "Montevideo" },
            { key: "canelones", label: "Canelones" },
            { key: "maldonado", label: "Maldonado" },
            { key: "salto", label: "Salto" },
            { key: "paysandu", label: "Paysandú" },
            { key: "rivera", label: "Rivera" },
        ],
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Reset state when country changes
        if (field === "country") {
            setFormData(prev => ({ ...prev, state: "" }));
        }
    };

    const handleSubmit = async () => {
        if (!acceptedTerms) {
            alert(t("addCompany.form.acceptTermsRequired"));
            return;
        }

        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(t("addCompany.form.submitSuccess"));
            // Reset form
            setFormData({
                name: "",
                industry: "",
                country: "",
                state: "",
                website: "",
                benefits: "",
            });
            setAcceptedTerms(false);
        } catch (error) {
            alert(t("addCompany.form.submitError"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentRegions = formData.country ? countryRegions[formData.country as keyof typeof countryRegions] || [] : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-center text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 lg:mb-4 leading-tight transition-colors duration-200">
                                <Trans
                                    i18nKey="addCompany.title"
                                    components={{ 1: <span className="text-sky-600 dark:text-sky-400" /> }}
                                />
                            </h1>
                            <p className="text-center text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200">
                                {t("addCompany.description")}
                            </p>
                        </div>

                        <Card className="p-6 lg:p-8 shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-colors duration-200">
                            <div className="space-y-5">
                                {/* Company Name */}
                                <div>
                                    <Input
                                        type="text"
                                        label={t("addCompany.form.name.label")}
                                        placeholder={t("addCompany.form.name.placeholder")}
                                        value={formData.name}
                                        onValueChange={(value) => handleInputChange("name", value)}
                                        isRequired
                                        size="lg"
                                        variant="bordered"
                                        classNames={{
                                            input: "text-slate-900 dark:text-white",
                                            label: "text-slate-700 dark:text-slate-300 font-medium",
                                        }}
                                    />
                                </div>

                                {/* Industry */}
                                <div>
                                    <Select
                                        label={t("addCompany.form.industry.label")}
                                        placeholder={t("addCompany.form.industry.placeholder")}
                                        selectedKeys={formData.industry ? [formData.industry] : []}
                                        onSelectionChange={(keys) => {
                                            const selectedKey = Array.from(keys)[0] as string;
                                            handleInputChange("industry", selectedKey);
                                        }}
                                        isRequired
                                        size="lg"
                                        variant="bordered"
                                        classNames={{
                                            value: "text-slate-900 dark:text-white",
                                            label: "text-slate-700 dark:text-slate-300 font-medium",
                                        }}
                                    >
                                        {industries.map((industry) => (
                                            <SelectItem key={industry.key} className="text-slate-900 dark:text-white">
                                                {industry.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Country */}
                                    <div>
                                        <Select
                                            label={t("addCompany.form.country.label")}
                                            placeholder={t("addCompany.form.country.placeholder")}
                                            selectedKeys={formData.country ? [formData.country] : []}
                                            onSelectionChange={(keys) => {
                                                const selectedKey = Array.from(keys)[0] as string;
                                                handleInputChange("country", selectedKey);
                                            }}
                                            isRequired
                                            size="lg"
                                            variant="bordered"
                                            classNames={{
                                                value: "text-slate-900 dark:text-white",
                                                label: "text-slate-700 dark:text-slate-300 font-medium",
                                            }}
                                        >
                                            {countries.map((country) => (
                                                <SelectItem key={country.key} className="text-slate-900 dark:text-white">
                                                    {country.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {/* State/Province */}
                                    <div>
                                        <Select
                                            label={t("addCompany.form.state.label")}
                                            placeholder={t("addCompany.form.state.placeholder")}
                                            selectedKeys={formData.state ? [formData.state] : []}
                                            onSelectionChange={(keys) => {
                                                const selectedKey = Array.from(keys)[0] as string;
                                                handleInputChange("state", selectedKey);
                                            }}
                                            isDisabled={!formData.country || currentRegions.length === 0}
                                            isRequired
                                            size="lg"
                                            variant="bordered"
                                            classNames={{
                                                value: "text-slate-900 dark:text-white",
                                                label: "text-slate-700 dark:text-slate-300 font-medium",
                                            }}
                                        >
                                            {currentRegions.map((region) => (
                                                <SelectItem key={region.key} className="text-slate-900 dark:text-white">
                                                    {region.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                {/* Website */}
                                <div>
                                    <Input
                                        type="url"
                                        label={t("addCompany.form.website.label")}
                                        placeholder={t("addCompany.form.website.placeholder")}
                                        value={formData.website}
                                        onValueChange={(value) => handleInputChange("website", value)}
                                        size="lg"
                                        variant="bordered"
                                        classNames={{
                                            input: "text-slate-900 dark:text-white",
                                            label: "text-slate-700 dark:text-slate-300 font-medium",
                                        }}
                                    />
                                </div>

                                {/* Benefits */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="benefits"
                                        className="block text-slate-700 dark:text-slate-300 font-medium text-sm"
                                    >
                                        {t("addCompany.form.benefits.label")}
                                    </label>
                                    <textarea
                                        id="benefits"
                                        placeholder={t("addCompany.form.benefits.placeholder")}
                                        value={formData.benefits}
                                        onChange={(e) => handleInputChange("benefits", e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800 transition-colors duration-200"
                                    />
                                </div>

                                {/* Terms and Conditions */}
                                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors duration-200">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={acceptedTerms}
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        className="mt-1 w-4 h-4 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 rounded focus:ring-sky-500 dark:focus:ring-sky-400 focus:ring-2"
                                    />
                                    <label htmlFor="terms" className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed cursor-pointer">
                                        <Trans
                                            i18nKey="addCompany.form.terms"
                                            components={{
                                                1: <a href="/terms" className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 underline" target="_blank" rel="noopener noreferrer" />
                                            }}
                                        />
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    color="primary"
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-500 dark:to-blue-500 hover:from-sky-700 hover:to-blue-700 dark:hover:from-sky-600 dark:hover:to-blue-600 text-white font-semibold text-sm h-11 transition-all duration-200"
                                    onPress={handleSubmit}
                                    isLoading={isSubmitting}
                                    isDisabled={!acceptedTerms}
                                >
                                    {isSubmitting ? t("addCompany.form.submitting") : t("addCompany.form.submit")}
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
            </div>
        </div>
    );
}
