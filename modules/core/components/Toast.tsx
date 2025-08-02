import { useState, useEffect } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

export interface ToastProps {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose(id);
    }, 300);
  };

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          cardClass:
            "border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20",
          iconColor: "text-green-600 dark:text-green-400",
          icon: (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          ),
        };
      case "error":
        return {
          cardClass: "border-l-4 border-red-500 bg-red-900 dark:bg-red-900",
          iconColor: "text-red-600 dark:text-red-400",
          icon: (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          ),
        };
      case "warning":
        return {
          cardClass:
            "border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
          iconColor: "text-yellow-600 dark:text-yellow-400",
          icon: (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          ),
        };
      case "info":
        return {
          cardClass:
            "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20",
          iconColor: "text-blue-600 dark:text-blue-400",
          icon: (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          ),
        };
      default:
        return {
          cardClass:
            "border-l-4 border-slate-500 bg-slate-50 dark:bg-slate-900/20",
          iconColor: "text-slate-600 dark:text-slate-400",
          icon: null,
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isLeaving ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <Card className={`p-4 shadow-lg ${styles.cardClass} min-w-80 max-w-md`}>
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`flex-shrink-0 ${styles.iconColor}`}>
            {styles.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
              {title}
            </h4>
            {message && (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {message}
              </p>
            )}
          </div>

          {/* Close button */}
          <Button
            isIconOnly
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            size="sm"
            variant="light"
            onPress={handleClose}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </Button>
        </div>
      </Card>
    </div>
  );
};
