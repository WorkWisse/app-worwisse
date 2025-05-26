import { useState } from "react";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

// Consider using an actual SVG or a dedicated Icon component if you have one in HeroUI
const Logo = () => (
  <img
    src="https://picsum.photos/seed/workwisselogo/40/40" // Seeded for consistency
    alt="Workwisse Logo Placeholder"
    className="h-8 w-8 mr-2 rounded-full group-hover:opacity-90 transition-opacity duration-300"
  />
);

export const LandingHeader = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      closeMenu();
    }
  };

  return (
    <>
      <header className="py-5 px-4 sm:px-6 lg:px-8 bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto">
          {/* Desktop and Mobile Header */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center text-2xl font-semibold text-slate-800 group transition-opacity duration-300 hover:opacity-80"
              aria-label="Workwisse Home"
            >
              <Logo />
              WorkWisse
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/about"
                className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors duration-300"
              >
                {t("header.about")}
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors duration-300"
              >
                {t("header.contact")}
              </Link>
              <Link
                href="/company/add"
                className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t("header.addCompany")}
              </Link>
              <LanguageSelector />
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Menu Icon</title>
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="py-4 border-t border-slate-200 mt-4 bg-white relative z-50">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/about"
                  className="text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 transition-colors duration-300 py-3 px-2 rounded-lg"
                  onClick={closeMenu}
                >
                  {t("header.about")}
                </Link>

                <Link
                  href="/contact"
                  className="text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 transition-colors duration-300 py-3 px-2 rounded-lg"
                  onClick={closeMenu}
                >
                  {t("header.contact")}
                </Link>

                <Link
                  href="/company/add"
                  className="bg-sky-600 text-white text-base font-semibold hover:bg-sky-700 transition-colors duration-300 py-3 px-4 rounded-lg text-center"
                  onClick={closeMenu}
                >
                  {t("header.addCompany")}
                </Link>

                {/* Language Selector in Mobile Menu */}
                <div className="py-3 px-2 border-t border-slate-100 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      {t("header.language")}:
                    </span>
                    <div className="z-50">
                      <LanguageSelector />
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - moved outside header */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          style={{ top: "84px" }} // Adjust based on header height
          onClick={closeMenu}
          onKeyDown={handleOverlayKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}
    </>
  );
};
