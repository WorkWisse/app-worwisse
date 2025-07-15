import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration errors by not rendering until mounted
  if (!mounted) {
    return (
      <Button
        aria-label="Language selector loading"
        className="min-w-unit-16 px-2"
        size="sm"
        variant="light"
      >
        <span className="text-xl">🌐</span>
      </Button>
    );
  }

  const currentLanguage = i18n.language || "es";

  const languages = [
    {
      key: "es",
      label: "Español",
      flag: "🇪🇸",
    },
    {
      key: "en",
      label: "English",
      flag: "🇺🇸",
    },
    {
      key: "pt",
      label: "Português",
      flag: "🇵🇹",
    },
  ];

  const getCurrentLanguageInfo = () => {
    return (
      languages.find((lang) => lang.key === currentLanguage) || languages[0]
    );
  };

  const handleLanguageChange = (languageKey: string) => {
    i18n.changeLanguage(languageKey);
  };

  const currentLangInfo = getCurrentLanguageInfo();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          aria-label={`Current language: ${currentLangInfo.label}`}
          className="min-w-unit-16 px-2 gap-1 data-[hover=true]:bg-slate-100"
          size="sm"
          variant="light"
        >
          <span className="text-xl">{currentLangInfo.flag}</span>
          <svg
            className="opacity-50"
            fill="none"
            height="12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="12"
          >
            <title>Dropdown arrow</title>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Language selection"
        selectedKeys={new Set([currentLanguage])}
        selectionMode="single"
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys)[0] as string;

          if (selectedKey) {
            handleLanguageChange(selectedKey);
          }
        }}
      >
        {languages.map((language) => (
          <DropdownItem
            key={language.key}
            aria-label={`Switch to ${language.label}`}
            className="gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{language.flag}</span>
              <span className="font-medium">{language.label}</span>
              {currentLanguage === language.key && (
                <svg
                  className="text-sky-600"
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <title>Selected language indicator</title>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
