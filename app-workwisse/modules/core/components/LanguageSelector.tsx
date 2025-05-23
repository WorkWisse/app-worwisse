import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
];

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          size="sm"
          className="text-slate-600 hover:text-slate-800 font-medium px-3"
          startContent={currentLanguage.flag}
          endContent={
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Dropdown Arrow</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          }
        >
          {currentLanguage.name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={t("header.language")}
        onAction={(key) => handleLanguageChange(key as string)}
        selectedKeys={[i18n.language]}
        selectionMode="single"
      >
        {languages.map((language) => (
          <DropdownItem
            key={language.code}
            startContent={language.flag}
            className={
              i18n.language === language.code ? "bg-sky-50 text-sky-600" : ""
            }
          >
            {language.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
