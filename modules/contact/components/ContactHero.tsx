import { useTranslation, Trans } from "react-i18next";

export default function ContactHero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-slate-800 py-20 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight transition-colors duration-200">
              <Trans
                components={{
                  1: <span className="text-sky-600 dark:text-sky-400" />,
                }}
                i18nKey="contact.hero.title"
              />
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto transition-colors duration-200">
              {t("contact.form.description")}
            </p>
          </div>

          {/* TODO: VER SI ESTO VA */}

          {/* <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Email icon"
                >
                  <title>Email icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {t("contact.hero.email")}
              </h3>
              <p className="text-slate-600">{t("contact.hero.emailAddress")}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Phone icon"
                >
                  <title>Phone icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {t("contact.hero.phone")}
              </h3>
              <p className="text-slate-600">{t("contact.hero.phoneNumber")}</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
