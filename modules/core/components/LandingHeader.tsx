import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Link } from "@heroui/link";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

import { LanguageSelector } from "./LanguageSelector";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

// Consider using an actual SVG or a dedicated Icon component if you have one in HeroUI
const Logo = () => (
  <img
    alt="WorkWisse Logo Placeholder"
    className="h-8 w-8 mr-2 rounded-full group-hover:opacity-90 transition-opacity duration-300"
    src="https://picsum.photos/seed/workwisselogo/40/40" // Seeded for consistency
  />
);

export const LandingHeader = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Don't show search on landing page only
  const shouldShowSearch = router.pathname !== "/";

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Prevent hydration errors by showing fallback content until mounted
  if (!mounted) {
    return (
      <header className="py-5 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 transition-colors duration-200">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link
              aria-label="WorkWisse Home"
              className="flex items-center text-2xl font-semibold text-slate-800 dark:text-slate-200 group transition-opacity duration-300 hover:opacity-80"
              href="/"
            >
              <Logo />
              WorkWisse
            </Link>

            {/* <nav className="hidden md:flex items-center space-x-6">
              <Link
                className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-all duration-300 shadow-sm hover:shadow-md"
                href="/company/add"
              >
                Sumá tu empresa
              </Link>
              <ThemeToggle />
              <LanguageSelector />
            </nav> */}

            <button
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Menu Icon</title>
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="py-5 bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 transition-colors duration-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop and Mobile Header */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              aria-label="WorkWisse Home"
              className="flex items-center text-2xl font-semibold text-slate-800 dark:text-slate-200 group transition-opacity duration-300 hover:opacity-80"
              href="/"
            >
              <Logo />
              WorkWisse
            </Link>

            {/* Center - Search Bar */}
            {shouldShowSearch && (
              <div className="flex-1 max-w-md mx-4 hidden md:block">
                <SearchBar
                  showButton={false}
                  variant="header"
                  onSubmit={(query) => {
                    router.push(
                      `/companies?search=${encodeURIComponent(query)}`
                    );
                  }}
                  onSuggestionSelect={(suggestion) => {
                    router.push(`/company/${suggestion.id}`);
                  }}
                />
              </div>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {router.pathname === "/" && (
                <>
                  <Link
                    className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
                    href="/rankings"
                  >
                    {t("header.rankings")}
                  </Link>
                  <Link
                    className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
                    href="/about"
                  >
                    {t("header.about")}
                  </Link>
                  <Link
                    className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
                    href="/contact"
                  >
                    {t("header.contact")}
                  </Link>
                </>
              )}
              
              {/* Navigation Dropdown - Only show when search is visible */}
              {shouldShowSearch && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300 gap-1"
                      aria-label="Menú de navegación"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <title>Menú</title>
                        <path d="M3 12h18M3 6h18M3 18h18" />
                      </svg>
                      <svg
                        className="w-4 h-4 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Navigation menu">
                    <DropdownItem key="home">
                      <Link
                        className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300 w-full block"
                        href="/"
                      >
                        Inicio
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="rankings">
                      <Link
                        className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300 w-full block"
                        href="/rankings"
                      >
                        {t("header.rankings")}
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="about">
                      <Link
                        className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300 w-full block"
                        href="/about"
                      >
                        {t("header.about")}
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="contact">
                      <Link
                        className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300 w-full block"
                        href="/contact"
                      >
                        {t("header.contact")}
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="add-company">
                      <Link
                        className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300 w-full block"
                        href="/company/add"
                      >
                        Agregar Empresa
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
              
              <ThemeToggle />
              <LanguageSelector />
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
              onClick={toggleMenu}
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
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                ) : (
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
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
            <nav className="py-4 border-t border-slate-200 dark:border-slate-700 mt-4 bg-white dark:bg-slate-900 relative z-50">
              <div className="flex flex-col space-y-2">
                {shouldShowSearch && (
                  <div className="py-3 px-2 mb-2">
                    <SearchBar
                      variant="header"
                      onSubmit={(query) => {
                        router.push(
                          `/companies?search=${encodeURIComponent(query)}`
                        );
                        closeMenu();
                      }}
                      onSuggestionSelect={(suggestion) => {
                        router.push(`/company/${suggestion.id}`);
                        closeMenu();
                      }}
                    />
                  </div>
                )}

                {router.pathname === "/" && (
                  <>
                    <Link
                      className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 py-3 px-2 rounded-lg"
                      href="/rankings"
                      onClick={closeMenu}
                    >
                      {t("header.rankings")}
                    </Link>

                    <Link
                      className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 py-3 px-2 rounded-lg"
                      href="/about"
                      onClick={closeMenu}
                    >
                      {t("header.about")}
                    </Link>

                    <Link
                      className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 py-3 px-2 rounded-lg"
                      href="/contact"
                      onClick={closeMenu}
                    >
                      {t("header.contact")}
                    </Link>
                  </>
                )}

                {/* Theme Toggle in Mobile Menu */}
                <div className="py-3 px-2 border-t border-slate-100 dark:border-slate-700 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {t("header.theme")}:
                    </span>
                    <ThemeToggle />
                  </div>
                </div>

                {/* Language Selector in Mobile Menu */}
                <div className="py-3 px-2 border-t border-slate-100 dark:border-slate-700 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
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
          aria-label="Close menu"
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50 z-40"
          role="button"
          style={{ top: "84px" }} // Adjust based on header height
          tabIndex={0}
          onClick={closeMenu}
          onKeyDown={handleOverlayKeyDown}
        />
      )}
    </>
  );
};
