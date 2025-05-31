import { useTranslation } from "react-i18next";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";

export default function TermsCTA() {
    const { t } = useTranslation();

    return (
        <section className="py-16 lg:py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100">
            <div className="max-w-4xl mx-auto">
                <Card className="p-8 lg:p-12 text-center bg-white/95 backdrop-blur-sm border border-white/20 shadow-xl">
                    <div className="mb-6">
                        <div className="text-4xl mb-4">🤝</div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                            {t("terms.cta.title")}
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            {t("terms.cta.subtitle")}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            as="a"
                            href="/company/add"
                            size="lg"
                            className="bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            {t("terms.cta.addCompanyButton")}
                        </Button>

                        <Button
                            as="a"
                            href="/"
                            size="lg"
                            variant="bordered"
                            className="border-sky-600 text-sky-600 hover:bg-sky-50 font-semibold px-8 py-3 transition-all duration-200"
                        >
                            {t("terms.cta.backHomeButton")}
                        </Button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <p className="text-sm text-slate-500">
                            {t("terms.cta.footer")}
                        </p>
                    </div>
                </Card>
            </div>
        </section>
    );
}
