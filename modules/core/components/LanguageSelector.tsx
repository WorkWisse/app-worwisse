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
        variant="light"
        size="sm"
        className="min-w-unit-16 px-2"
        aria-label="Language selector loading"
      >
        <span className="text-xl">🇪🇸</span>
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
          variant="light"
          size="sm"
          className="min-w-unit-16 px-2 gap-1 data-[hover=true]:bg-slate-100"
          aria-label={`Current language: ${currentLangInfo.label}`}
        >
          <span className="text-xl">{currentLangInfo.flag}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
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
            className="gap-2"
            aria-label={`Switch to ${language.label}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{language.flag}</span>
              <span className="font-medium">{language.label}</span>
              {currentLanguage === language.key && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-sky-600"
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
