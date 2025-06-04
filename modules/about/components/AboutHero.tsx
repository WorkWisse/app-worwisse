import { Button } from "@heroui/button";
import { useTranslation, Trans } from "react-i18next";

export default function AboutHero() {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-slate-800 py-20 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                <Trans
                  i18nKey="about.hero.title"
                  components={{
                    1: <span className="text-sky-600 dark:text-sky-400" />,
                    2: <span className="text-sky-600 dark:text-sky-400" />,
                  }}
                />
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {t("about.hero.description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-sky-600 dark:bg-sky-600 text-white hover:bg-sky-700 dark:hover:bg-sky-700 font-semibold px-8 transition-colors duration-200"
                onClick={() => scrollToSection('team')}
              >
                {t("about.hero.ctaTeam")}
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 font-semibold px-8 transition-colors duration-200"
                onClick={() => scrollToSection('history')}
              >
                {t("about.hero.ctaHistory")}
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="relative">
              <img
                src="/images/about-us.png"
                alt="Trabajadores tomando decisiones informadas"
                className="w-full max-w-lg h-auto object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-600/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
