import { Link } from "@heroui/link";
import { useTranslation } from "react-i18next";

const SocialIcon = ({ title, href }: { title: string; href: string }) => {
  // Definir el ícono adecuado según el título
  const getIcon = () => {
    switch (title) {
      case "LinkedIn":
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>LinkedIn</title>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
          </svg>
        );
      case "Twitter":
      case "X":
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>X (Twitter)</title>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "Instagram":
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Instagram</title>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        );
      case "Facebook":
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Facebook</title>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "TikTok":
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>TikTok</title>
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        );
      default:
        return title.substring(0, 1);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-slate-200 hover:bg-sky-600 hover:text-white rounded-full flex items-center justify-center text-slate-600 transition-all duration-300"
      aria-label={title}
    >
      {getIcon()}
    </a>
  );
};

export const LandingFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center text-2xl font-bold">
              <img
                src="https://picsum.photos/seed/workwisselogo/40/40"
                alt="WorkWisse Logo"
                className="h-8 w-8 mr-2 rounded-full"
              />
              WorkWisse
            </div>
            <p className="text-slate-300 leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex space-x-3">
              <SocialIcon title="LinkedIn" href="#" />
              <SocialIcon title="X" href="#" />
              <SocialIcon title="Instagram" href="#" />
              <SocialIcon title="Facebook" href="#" />
              <SocialIcon title="TikTok" href="#" />
            </div>
          </div>

          <div className="space-y-4 space-y-4 md:justify-self-end md:text-right ">
            <h3 className="text-lg font-semibold">
              {t("footer.workers.title")}
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
                  href="/reviews"
                  className="hover:text-sky-400 transition-colors"
                >
                  {t("footer.workers.links.reviews")}
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="space-y-4">
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
          </div> */}
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
