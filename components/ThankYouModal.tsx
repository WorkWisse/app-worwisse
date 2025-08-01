import { useTranslation } from "react-i18next";
import { useEffect } from "react";

// Simple check icon component
const CheckIcon = () => (
  <svg
    className="w-10 h-10 text-green-600 dark:text-green-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "company" | "review";
}

export default function ThankYouModal({
  isOpen,
  onClose,
  type,
}: ThankYouModalProps) {
  const { t } = useTranslation();

  // Auto-close modal after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClose();
          }
        }}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 border dark:border-slate-700">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          type="button"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-2 px-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckIcon />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t(`thankYou.${type}.title`)}
          </h2>
        </div>

        {/* Body */}
        <div className="text-center px-6 pb-6">
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-4">
            {t(`thankYou.${type}.message`)}
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-200 text-sm font-medium mb-2">
              ⏰ {t("thankYou.reviewTime.title")}
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              {t("thankYou.reviewTime.description")}
            </p>
          </div>

          {/* Action Button */}
          <button
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            type="button"
            onClick={onClose}
          >
            Continuar
          </button>
          
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
            Se redirigirá automáticamente en 5 segundos
          </p>
        </div>
      </div>
    </div>
  );
}
