import { useTranslation } from "react-i18next";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";

export default function TermsCTA() {
    const { t } = useTranslation();

    return (
        <section className="py-16 lg:py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
            <div className="max-w-4xl mx-auto">
                <Card className="p-8 lg:p-12 text-center bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-xl transition-colors duration-200">
                    <div className="mb-6">
                        <div className="text-4xl mb-4">🤝</div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-200">
                            {t("terms.cta.title")}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto transition-colors duration-200">
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
                            className="border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 font-semibold px-8 py-3 transition-all duration-200"
                        >
                            {t("terms.cta.backHomeButton")}
                        </Button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600 transition-colors duration-200">
                        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
                            {t("terms.cta.footer")}
                        </p>
                    </div>
                </Card>
            </div>
        </section>
    );
}
