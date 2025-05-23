import { Link } from "@heroui/link";
import { useTranslation } from "react-i18next";

const SocialIcon = ({ title, href }: { title: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-slate-200 hover:bg-sky-600 hover:text-white rounded-full flex items-center justify-center text-slate-600 transition-all duration-300 font-semibold text-sm"
    aria-label={title}
  >
    {title.substring(0, 1)}
  </a>
);

export const LandingFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center text-2xl font-bold">
              <img
                src="https://picsum.photos/seed/workwisselogo/40/40"
                alt="WorkWise Logo"
                className="h-8 w-8 mr-2 rounded-full"
              />
              workwisse
            </div>
            <p className="text-slate-300 leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex space-x-3">
              <SocialIcon title="LinkedIn" href="#" />
              <SocialIcon title="Twitter" href="#" />
              <SocialIcon title="Instagram" href="#" />
              <SocialIcon title="Facebook" href="#" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t("footer.workers.title")}
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link
                  href="/companies"
                  className="hover:text-sky-400 transition-colors"
                >
                  {t("footer.workers.links.search")}
                </Link>
              </li>
              <li>
                <Link
                  href="/rankings"
                  className="hover:text-sky-400 transition-colors"
                >
                  {t("footer.workers.links.rankings")}
                </Link>
              </li>
              <li>
                <Link
                  href="/salaries"
                  className="hover:text-sky-400 transition-colors"
                >
                  {t("footer.workers.links.salaries")}
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="hover:text-sky-400 transition-colors"
                >
                  {t("footer.workers.links.reviews")}
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-sky-400 transition-colors"
                >
                  {t("footer.workers.links.jobs")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t("footer.companies.title")}
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link
                  href="/company/add"
                  className="hover:text-sky-400 transition-colors"
                >
                  {t("footer.companies.links.add")}
                </Link>
              </li>
              <li>
                <Link
                  href="/enterprise"
                  className="hover:text-sky-400 transition-colors"
                >
                  {t("footer.companies.links.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/employer-branding"
                  className="hover:text-sky-400 transition-colors"
                >
                  {t("footer.companies.links.branding")}
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  className="hover:text-sky-400 transition-colors"
                >
                  {t("footer.companies.links.analytics")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t("footer.newsletter.title")}
            </h3>
            <p className="text-slate-300 text-sm">
              {t("footer.newsletter.description")}
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors"
              />
              <button className="w-full bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                {t("footer.newsletter.button")}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400 text-center md:text-left">
              <p className="mb-1">
                {t("footer.legal.copyright", {
                  year: new Date().getFullYear(),
                })}
              </p>
              <p>{t("footer.legal.tagline")}</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link
                href="/about"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                {t("footer.legal.about")}
              </Link>
              <Link
                href="/privacy"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                {t("footer.legal.privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                {t("footer.legal.terms")}
              </Link>
              <Link
                href="/contact"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                {t("footer.legal.contact")}
              </Link>
              <Link
                href="/help"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                {t("footer.legal.help")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
