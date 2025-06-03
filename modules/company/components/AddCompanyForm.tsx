import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Textarea } from "@heroui/input";
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
            { key: "rio-negro", label: "Río Negro" },
            { key: "formosa", label: "Formosa" },
            { key: "neuquen", label: "Neuquén" },
            { key: "chubut", label: "Chubut" },
            { key: "san-luis", label: "San Luis" },
            { key: "catamarca", label: "Catamarca" },
            { key: "la-rioja", label: "La Rioja" },
            { key: "san-juan", label: "San Juan" },
            { key: "la-pampa", label: "La Pampa" },
            { key: "santa-cruz", label: "Santa Cruz" },
            { key: "tierra-del-fuego", label: "Tierra del Fuego" },
        ],
        br: [
            { key: "acre", label: "Acre" },
            { key: "alagoas", label: "Alagoas" },
            { key: "amapa", label: "Amapá" },
            { key: "amazonas", label: "Amazonas" },
            { key: "bahia", label: "Bahía" },
            { key: "ceara", label: "Ceará" },
            { key: "distrito-federal", label: "Distrito Federal" },
            { key: "espirito-santo", label: "Espírito Santo" },
            { key: "goias", label: "Goiás" },
            { key: "maranhao", label: "Maranhão" },
            { key: "mato-grosso", label: "Mato Grosso" },
            { key: "mato-grosso-do-sul", label: "Mato Grosso do Sul" },
            { key: "minas-gerais", label: "Minas Gerais" },
            { key: "para", label: "Pará" },
            { key: "paraiba", label: "Paraíba" },
            { key: "parana", label: "Paraná" },
            { key: "pernambuco", label: "Pernambuco" },
            { key: "piaui", label: "Piauí" },
            { key: "rio-de-janeiro", label: "Rio de Janeiro" },
            { key: "rio-grande-do-norte", label: "Rio Grande do Norte" },
            { key: "rio-grande-do-sul", label: "Rio Grande do Sul" },
            { key: "rondonia", label: "Rondônia" },
            { key: "roraima", label: "Roraima" },
            { key: "santa-catarina", label: "Santa Catarina" },
            { key: "sao-paulo", label: "São Paulo" },
            { key: "sergipe", label: "Sergipe" },
            { key: "tocantins", label: "Tocantins" },
        ],
        cl: [
            { key: "arica-parinacota", label: "Arica y Parinacota" },
            { key: "tarapaca", label: "Tarapacá" },
            { key: "antofagasta", label: "Antofagasta" },
            { key: "atacama", label: "Atacama" },
            { key: "coquimbo", label: "Coquimbo" },
            { key: "valparaiso", label: "Valparaíso" },
            { key: "metropolitana", label: "Metropolitana de Santiago" },
            { key: "ohiggins", label: "Libertador General Bernardo O'Higgins" },
            { key: "maule", label: "Maule" },
            { key: "nuble", label: "Ñuble" },
            { key: "biobio", label: "Biobío" },
            { key: "araucania", label: "La Araucanía" },
            { key: "los-rios", label: "Los Ríos" },
            { key: "los-lagos", label: "Los Lagos" },
            { key: "aysen", label: "Aysén del General Carlos Ibáñez del Campo" },
            { key: "magallanes", label: "Magallanes y de la Antártica Chilena" },
        ],
        co: [
            { key: "amazonas", label: "Amazonas" },
            { key: "antioquia", label: "Antioquia" },
            { key: "arauca", label: "Arauca" },
            { key: "atlantico", label: "Atlántico" },
            { key: "bogota", label: "Bogotá D.C." },
            { key: "bolivar", label: "Bolívar" },
            { key: "boyaca", label: "Boyacá" },
            { key: "caldas", label: "Caldas" },
            { key: "caqueta", label: "Caquetá" },
            { key: "casanare", label: "Casanare" },
            { key: "cauca", label: "Cauca" },
            { key: "cesar", label: "Cesar" },
            { key: "choco", label: "Chocó" },
            { key: "cordoba", label: "Córdoba" },
            { key: "cundinamarca", label: "Cundinamarca" },
            { key: "guainia", label: "Guainía" },
            { key: "guaviare", label: "Guaviare" },
            { key: "huila", label: "Huila" },
            { key: "la-guajira", label: "La Guajira" },
            { key: "magdalena", label: "Magdalena" },
            { key: "meta", label: "Meta" },
            { key: "narino", label: "Nariño" },
            { key: "norte-santander", label: "Norte de Santander" },
            { key: "putumayo", label: "Putumayo" },
            { key: "quindio", label: "Quindío" },
            { key: "risaralda", label: "Risaralda" },
            { key: "san-andres", label: "San Andrés y Providencia" },
            { key: "santander", label: "Santander" },
            { key: "sucre", label: "Sucre" },
            { key: "tolima", label: "Tolima" },
            { key: "valle-del-cauca", label: "Valle del Cauca" },
            { key: "vaupes", label: "Vaupés" },
            { key: "vichada", label: "Vichada" },
        ],
        mx: [
            { key: "aguascalientes", label: "Aguascalientes" },
            { key: "baja-california", label: "Baja California" },
            { key: "baja-california-sur", label: "Baja California Sur" },
            { key: "campeche", label: "Campeche" },
            { key: "chiapas", label: "Chiapas" },
            { key: "chihuahua", label: "Chihuahua" },
            { key: "ciudad-de-mexico", label: "Ciudad de México" },
            { key: "coahuila", label: "Coahuila" },
            { key: "colima", label: "Colima" },
            { key: "durango", label: "Durango" },
            { key: "guanajuato", label: "Guanajuato" },
            { key: "guerrero", label: "Guerrero" },
            { key: "hidalgo", label: "Hidalgo" },
            { key: "jalisco", label: "Jalisco" },
            { key: "mexico", label: "México" },
            { key: "michoacan", label: "Michoacán" },
            { key: "morelos", label: "Morelos" },
            { key: "nayarit", label: "Nayarit" },
            { key: "nuevo-leon", label: "Nuevo León" },
            { key: "oaxaca", label: "Oaxaca" },
            { key: "puebla", label: "Puebla" },
            { key: "queretaro", label: "Querétaro" },
            { key: "quintana-roo", label: "Quintana Roo" },
            { key: "san-luis-potosi", label: "San Luis Potosí" },
            { key: "sinaloa", label: "Sinaloa" },
            { key: "sonora", label: "Sonora" },
            { key: "tabasco", label: "Tabasco" },
            { key: "tamaulipas", label: "Tamaulipas" },
            { key: "tlaxcala", label: "Tlaxcala" },
            { key: "veracruz", label: "Veracruz" },
            { key: "yucatan", label: "Yucatán" },
            { key: "zacatecas", label: "Zacatecas" },
        ],
        pe: [
            { key: "amazonas", label: "Amazonas" },
            { key: "ancash", label: "Áncash" },
            { key: "apurimac", label: "Apurímac" },
            { key: "arequipa", label: "Arequipa" },
            { key: "ayacucho", label: "Ayacucho" },
            { key: "cajamarca", label: "Cajamarca" },
            { key: "callao", label: "Callao" },
            { key: "cusco", label: "Cusco" },
            { key: "huancavelica", label: "Huancavelica" },
            { key: "huanuco", label: "Huánuco" },
            { key: "ica", label: "Ica" },
            { key: "junin", label: "Junín" },
            { key: "la-libertad", label: "La Libertad" },
            { key: "lambayeque", label: "Lambayeque" },
            { key: "lima", label: "Lima" },
            { key: "loreto", label: "Loreto" },
            { key: "madre-de-dios", label: "Madre de Dios" },
            { key: "moquegua", label: "Moquegua" },
            { key: "pasco", label: "Pasco" },
            { key: "piura", label: "Piura" },
            { key: "puno", label: "Puno" },
            { key: "san-martin", label: "San Martín" },
            { key: "tacna", label: "Tacna" },
            { key: "tumbes", label: "Tumbes" },
            { key: "ucayali", label: "Ucayali" },
        ],
        uy: [
            { key: "artigas", label: "Artigas" },
            { key: "canelones", label: "Canelones" },
            { key: "cerro-largo", label: "Cerro Largo" },
            { key: "colonia", label: "Colonia" },
            { key: "durazno", label: "Durazno" },
            { key: "flores", label: "Flores" },
            { key: "florida", label: "Florida" },
            { key: "lavalleja", label: "Lavalleja" },
            { key: "maldonado", label: "Maldonado" },
            { key: "montevideo", label: "Montevideo" },
            { key: "paysandu", label: "Paysandú" },
            { key: "rio-negro", label: "Río Negro" },
            { key: "rivera", label: "Rivera" },
            { key: "rocha", label: "Rocha" },
            { key: "salto", label: "Salto" },
            { key: "san-jose", label: "San José" },
            { key: "soriano", label: "Soriano" },
            { key: "tacuarembo", label: "Tacuarembó" },
            { key: "treinta-y-tres", label: "Treinta y Tres" },
        ],
    };

    // Labels dinámicos según el país
    const getRegionLabel = (countryKey: string) => {
        const labels = {
            ar: t("addCompany.form.region.labels.ar"),
            br: t("addCompany.form.region.labels.br"),
            cl: t("addCompany.form.region.labels.cl"),
            co: t("addCompany.form.region.labels.co"),
            mx: t("addCompany.form.region.labels.mx"),
            pe: t("addCompany.form.region.labels.pe"),
            uy: t("addCompany.form.region.labels.uy"),
        };
        return labels[countryKey as keyof typeof labels] || t("addCompany.form.region.labels.default");
    };

    // Placeholder dinámico según el país
    const getRegionPlaceholder = (countryKey: string) => {
        const placeholders = {
            ar: t("addCompany.form.region.placeholders.ar"),
            br: t("addCompany.form.region.placeholders.br"),
            cl: t("addCompany.form.region.placeholders.cl"),
            co: t("addCompany.form.region.placeholders.co"),
            mx: t("addCompany.form.region.placeholders.mx"),
            pe: t("addCompany.form.region.placeholders.pe"),
            uy: t("addCompany.form.region.placeholders.uy"),
        };
        return placeholders[countryKey as keyof typeof placeholders] || t("addCompany.form.region.placeholders.default");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!acceptedTerms) {
            alert(t("addCompany.messages.termsRequired"));
            return;
        }

        setIsSubmitting(true);

        // Simular envío del formulario
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Empresa agregada:", formData);
        setIsSubmitting(false);

        // Mostrar mensaje de éxito
        alert(t("addCompany.messages.success"));

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
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => {
            const newData = { ...prev, [field]: value };
            // Si cambia el país, resetear el estado/provincia/departamento
            if (field === "country") {
                newData.state = "";
            }
            return newData;
        });
    };

    return (
        <section className="py-8 lg:py-12 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen transition-colors duration-200">
            <div className="max-w-[90vw] 2xl:max-w-[1400px] mx-auto">
                <div className="grid xl:grid-cols-4 gap-6 lg:gap-8 items-start">
                    {/* Formulario - Más compacto */}
                    <div className="xl:col-span-3">
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-center text-3xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-3 lg:mb-4 leading-tight transition-colors duration-200">
                                <Trans
                                    i18nKey="addCompany.title"
                                    components={{ 1: <span className="text-sky-600 dark:text-sky-400" /> }}
                                />
                            </h1>
                            <p className="text-center text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200">
                                {t("addCompany.description")}
                            </p>
                        </div>

                        <Card className="p-6 lg:p-8 xl:p-10 shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 transition-colors duration-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Primera row: Nombre e Industria */}
                                <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                                    <div>
                                        <Input
                                            label={t("addCompany.form.companyName.label")}
                                            placeholder={t("addCompany.form.companyName.placeholder")}
                                            value={formData.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            required
                                            size="md"
                                            variant="bordered"
                                            classNames={{
                                                input: "text-slate-900 dark:text-white",
                                                label: "text-slate-700 dark:text-slate-300 font-medium text-md",
                                                inputWrapper: "min-h-[48px] dark:border-slate-600",
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <Select
                                            label={t("addCompany.form.industry.label")}
                                            placeholder={t("addCompany.form.industry.placeholder")}
                                            selectedKeys={formData.industry ? [formData.industry] : []}
                                            onSelectionChange={(keys) => {
                                                const selected = Array.from(keys)[0] as string;
                                                handleChange("industry", selected);
                                            }}
                                            size="md"
                                            variant="bordered"
                                            classNames={{
                                                label: "text-slate-700 dark:text-slate-300 font-medium text-md",
                                                trigger: "border-slate-300 dark:border-slate-600 min-h-[48px]",
                                            }}
                                        >
                                            {industries.map((industry) => (
                                                <SelectItem key={industry.key}>
                                                    {industry.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                {/* Segunda row: Sitio Web (solo ocupa la mitad) */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                    <div>
                                        <Input
                                            label={t("addCompany.form.website.label")}
                                            placeholder={t("addCompany.form.website.placeholder")}
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => handleChange("website", e.target.value)}
                                            size="md"
                                            variant="bordered"
                                            classNames={{
                                                input: "text-slate-900 dark:text-white",
                                                label: "text-slate-700 dark:text-slate-300 font-medium text-md",
                                                inputWrapper: "min-h-[48px] dark:border-slate-600",
                                            }}
                                        />
                                    </div>
                                    <div className="hidden lg:block"></div> {/* Espacio vacío para mantener la estructura */}
                                </div>

                                {/* Tercera row: País y Estado/Provincia */}
                                <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                                    <Select
                                        label={t("addCompany.form.country.label")}
                                        placeholder={t("addCompany.form.country.placeholder")}
                                        selectedKeys={formData.country ? [formData.country] : []}
                                        onSelectionChange={(keys) => {
                                            const selected = Array.from(keys)[0] as string;
                                            handleChange("country", selected);
                                        }}
                                        size="md"
                                        variant="bordered"
                                        classNames={{
                                            label: "text-slate-700 dark:text-slate-300 font-medium text-md",
                                            trigger: "border-slate-300 dark:border-slate-600 min-h-[48px]",
                                        }}
                                    >
                                        {countries.map((country) => (
                                            <SelectItem key={country.key}>
                                                {country.label}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label={getRegionLabel(formData.country)}
                                        placeholder={formData.country ? getRegionPlaceholder(formData.country) : t("addCompany.form.region.placeholders.default")}
                                        selectedKeys={formData.state ? [formData.state] : []}
                                        onSelectionChange={(keys) => {
                                            const selected = Array.from(keys)[0] as string;
                                            handleChange("state", selected);
                                        }}
                                        size="md"
                                        variant="bordered"
                                        classNames={{
                                            label: "text-slate-700 dark:text-slate-300 font-medium text-md",
                                            trigger: "border-slate-300 dark:border-slate-600 min-h-[48px]",
                                        }}
                                        isDisabled={!formData.country || formData.country === "other"}
                                    >
                                        {formData.country && formData.country !== "other"
                                            ? countryRegions[formData.country as keyof typeof countryRegions]?.map((region) => (
                                                <SelectItem key={region.key}>
                                                    {region.label}
                                                </SelectItem>
                                            ))
                                            : null}
                                    </Select>
                                </div>

                                {/* Cuarta row: Beneficios y cultura laboral */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="benefits"
                                        className="block text-slate-700 dark:text-slate-300 font-medium text-md transition-colors duration-200"
                                    >
                                        {t("addCompany.form.benefits.label")}
                                    </label>
                                    <textarea
                                        id="benefits"
                                        placeholder={t("addCompany.form.benefits.placeholder")}
                                        value={formData.benefits}
                                        onChange={(e) => handleChange("benefits", e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 leading-relaxed bg-white dark:bg-slate-700 transition-colors duration-200"
                                    />
                                </div>

                                {/* Quinta row: He leído y acepto... */}
                                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors duration-200">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={acceptedTerms}
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        className="mt-0.5 w-4 h-4 text-sky-600 border-slate-300 dark:border-slate-500 rounded focus:ring-sky-500 dark:bg-slate-600"
                                    />
                                    <label htmlFor="terms" className="text-md text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200">
                                        {t("addCompany.form.terms.label")}{" "}
                                        <a
                                            href="/terms"
                                            className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 underline font-medium transition-colors duration-200"
                                        >
                                            {t("addCompany.form.terms.link")}
                                        </a>{" "}
                                        {t("addCompany.form.terms.suffix")}
                                    </label>
                                </div>

                                {/* Botón más moderado */}
                                <div className="flex justify-center pt-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 font-semibold px-12 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? t("addCompany.form.submitting") : t("addCompany.form.submitButton")}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>

                    {/* Panel lateral más compacto */}
                    <div className="xl:col-span-1 space-y-4">
                        <Card className="p-5 lg:p-6 bg-gradient-to-br from-sky-50 to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-sky-100 dark:border-slate-600 shadow-lg transition-colors duration-200">
                            <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-200">
                                {t("addCompany.sidebar.experience.title")}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-md transition-colors duration-200">
                                {t("addCompany.sidebar.experience.description")}
                            </p>
                            <div className="space-y-3">
                                <h4 className="font-bold text-slate-900 dark:text-white transition-colors duration-200">
                                    {t("addCompany.sidebar.rules.title")}
                                </h4>
                                <ul className="space-y-2 text-md text-slate-600 dark:text-slate-300 transition-colors duration-200">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                                        <span>{t("addCompany.sidebar.rules.items.0")}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                                        <span>{t("addCompany.sidebar.rules.items.1")}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                                        <span>{t("addCompany.sidebar.rules.items.2")}</span>
                                    </li>
                                </ul>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
