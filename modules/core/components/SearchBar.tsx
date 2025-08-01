import React, { useState, useEffect, useRef } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Link } from "@heroui/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { SearchService, SearchSuggestion } from "@/services";

interface SearchBarProps {
  placeholder?: string;
  variant?: "hero" | "header";
  onSubmit?: (query: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  showButton?: boolean;
  showSuggestions?: boolean;
}

export const SearchBar = ({
  placeholder,
  variant = "header",
  onSubmit,
  onSuggestionSelect,
  showButton = true,
  showSuggestions = true,
}: SearchBarProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const justSelectedSuggestion = useRef(false);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    // Don't search if we just selected a suggestion
    if (justSelectedSuggestion.current) {
      justSelectedSuggestion.current = false;
      return;
    }

    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim().length > 0 && showSuggestions) {
        setShowDropdown(true); // Show dropdown as soon as user types
        setIsLoading(true);
        try {
          const results = await SearchService.getSearchSuggestions(
            searchQuery,
            5
          );

          setSuggestions(results);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 200); // Reduced from 300ms to 200ms for better responsiveness

    return () => clearTimeout(timeoutId);
  }, [searchQuery, showSuggestions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        justSelectedSuggestion.current = false;
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      justSelectedSuggestion.current = false;
      setShowDropdown(false);
      setSuggestions([]);
      setSearchQuery("");
      setIsRedirecting(false);
    };

    const handleRouteError = () => {
      setIsRedirecting(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeError", handleRouteError);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeError", handleRouteError);
    };
  }, [router]);

  const handleInputChange = (value: string) => {
    justSelectedSuggestion.current = false;
    setSearchQuery(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit && searchQuery?.trim()) {
      justSelectedSuggestion.current = false;
      onSubmit(searchQuery.trim());
      setShowDropdown(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    justSelectedSuggestion.current = true;
    setSearchQuery(suggestion.name);
    setShowDropdown(false);
    setSuggestions([]);

    // Show redirecting loader when navigating to company
    if (onSuggestionSelect) {
      setIsRedirecting(true);
      onSuggestionSelect(suggestion);
    } else if (onSubmit) {
      onSubmit(suggestion.name);
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.trim().length > 0 && suggestions.length >= 0) {
      setShowDropdown(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      justSelectedSuggestion.current = false;
      setShowDropdown(false);
      setSuggestions([]);
      inputRef.current?.blur();
    }
  };

  const isHero = variant === "hero";
  const inputSize = isHero ? "lg" : "md";
  const buttonSize = isHero ? "lg" : "md";

  return (
    <div
      ref={searchRef}
      className={`relative ${isHero ? "max-w-lg" : "w-[34rem]"}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            fullWidth
            aria-label="Buscar empresa"
            className={`${isHero ? "shadow-lg hover:shadow-xl" : "shadow-lg hover:shadow-xl"} transition-all duration-500 rounded-lg ${
              isHero ? "transform hover:scale-[1.02]" : "flex-1 transform hover:scale-[1.01]"
            }`}
            classNames={{
              inputWrapper: isHero
                ? "bg-gradient-to-br from-white via-sky-50 to-blue-100 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-700 dark:to-slate-900 border-2 border-sky-200/60 dark:border-sky-600 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/30 focus-within:shadow-lg focus-within:shadow-sky-500/25 transition-all duration-300 shadow-xl backdrop-blur-sm"
                : "bg-gradient-to-br from-white via-sky-50/30 to-blue-50 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-700 dark:to-slate-900 border-2 border-sky-200/40 dark:border-sky-600/50 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:shadow-lg transition-all duration-300 shadow-md backdrop-blur-sm",
              input: [
                "text-slate-900",
                "dark:text-slate-200",
                "placeholder:text-slate-400",
                "dark:placeholder:text-slate-500",
                "caret-sky-500", // Custom caret color
                isHero ? "text-base font-medium" : "text-sm font-medium",
                isHero ? "focus:placeholder:text-sky-400" : "focus:placeholder:text-sky-400",
              ],
            }}
            name="search"
            placeholder={placeholder || t("hero.searchPlaceholder")}
            size={inputSize}
            startContent={
              isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sky-600" />
              ) : (
                <svg
                  aria-hidden="true"
                  className={`text-sky-500 dark:text-sky-400 pointer-events-none transition-all duration-300 hover:text-sky-600 hover:scale-110 ${
                    isHero ? "h-6 w-6 drop-shadow-sm" : "h-5 w-5 drop-shadow-sm"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Search Icon</title>
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={isHero ? 2.5 : 2.2}
                  />
                </svg>
              )
            }
            type="search"
            value={searchQuery}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            onValueChange={handleInputChange}
          />
          {showButton && (
            <Button
              className={`font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg whitespace-nowrap ${
                isHero
                  ? "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white transform hover:scale-105 px-8"
                  : "bg-sky-600 hover:bg-sky-700 text-white px-4"
              }`}
              color="primary"
              size={buttonSize}
              type="submit"
            >
              {t("hero.searchButton")}
            </Button>
          )}
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {showDropdown && showSuggestions && searchQuery.length >= 1 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-[9999] shadow-xl border border-slate-200 dark:border-slate-700 max-h-80 overflow-y-auto bg-white dark:bg-slate-800">
          <div className="p-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600" />
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                  {t("search.searching")}
                </span>
              </div>
            ) : isRedirecting ? (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600" />
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                  {t("search.redirecting")}
                </span>
              </div>
            ) : (
              <div>
                {suggestions.length > 0 && (
                  <div className="space-y-1 mb-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        className="w-full text-left px-3 py-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 group"
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-4 mb-1">
                              <div className="font-medium text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                                {suggestion.name}
                              </div>
                              <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">
                                {suggestion.reviewsCount}{" "}
                                {suggestion.reviewsCount === 1
                                  ? t("search.review")
                                  : t("search.reviews")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                              <span>{suggestion.industry}</span>
                              <span>•</span>
                              <span>{suggestion.location.country}</span>
                              {suggestion.rating > 0 && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center">
                                    <span className="text-yellow-500 mr-1">⭐</span>
                                    <span className="text-yellow-600 dark:text-yellow-400">
                                      {suggestion.rating.toFixed(1)}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            <svg
                              className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M9 5l7 7-7 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {suggestions.length > 0 && (
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-2">
                    <div className="py-2 px-3 text-center text-sm text-slate-500 dark:text-slate-400">
                      {t("search.notWhatYouLookingFor")}{" "}
                      <Button
                        as={Link}
                        className="h-auto p-0 text-sky-600 dark:text-sky-400 font-medium hover:underline"
                        href={`/company/add?name=${encodeURIComponent(searchQuery)}`}
                        size="sm"
                        variant="light"
                        onClick={() => {
                          setShowDropdown(false);
                          setSuggestions([]);
                        }}
                      >
                        {t("search.wannaAddIt")}
                      </Button>
                    </div>
                  </div>
                )}
                {suggestions.length === 0 && (
                  <div className="py-4 px-3 text-center text-sm text-slate-500 dark:text-slate-400">
                    {t("search.noResultsFound", { query: searchQuery })}{" "}
                    <Button
                      as={Link}
                      className="h-auto p-0 text-sky-600 dark:text-sky-400 font-medium hover:underline"
                      href={`/company/add?name=${encodeURIComponent(searchQuery)}`}
                      size="sm"
                      variant="light"
                      onClick={() => {
                        setShowDropdown(false);
                        setSuggestions([]);
                      }}
                    >
                      {t("search.wannaAddIt")}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
