import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  placeholder?: string;
  variant?: "hero" | "header";
  onSubmit?: (query: string) => void;
  showButton?: boolean;
}

export const SearchBar = ({
  placeholder,
  variant = "header",
  onSubmit,
  showButton = true,
}: SearchBarProps) => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    if (onSubmit && query?.trim()) {
      onSubmit(query.trim());
    }
  };

  const isHero = variant === "hero";
  const inputSize = isHero ? "lg" : "md";
  const buttonSize = isHero ? "lg" : "md";

  return (
    <form onSubmit={handleSubmit} className={isHero ? "max-w-lg" : "w-[34rem]"}>
      <div className="flex items-center gap-2">
        <Input
          name="search"
          type="search"
          placeholder={placeholder || t("hero.searchPlaceholder")}
          aria-label="Buscar empresa"
          fullWidth
          size={inputSize}
          className={`shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg ${
            isHero ? "" : "flex-1"
          }`}
          classNames={{
            inputWrapper: isHero
              ? "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus-within:border-sky-500 focus-within:ring-sky-500 transition-colors duration-200"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-within:border-sky-500 focus-within:ring-sky-500 transition-colors duration-200",
            input: isHero
              ? "text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-base"
              : "text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm",
          }}
          startContent={
            <svg
              className={`text-slate-400 dark:text-slate-500 pointer-events-none transition-colors duration-200 ${
                isHero ? "h-5 w-5" : "h-4 w-4"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <title>Search Icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />
        {showButton && (
          <Button
            type="submit"
            color="primary"
            size={buttonSize}
            className={`font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg whitespace-nowrap ${
              isHero
                ? "bg-sky-600 hover:bg-sky-700 text-white transform hover:scale-105 px-8"
                : "bg-sky-600 hover:bg-sky-700 text-white px-4"
            }`}
          >
            {t("hero.searchButton")}
          </Button>
        )}
      </div>
    </form>
  );
};
