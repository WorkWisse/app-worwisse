import { Button } from "@heroui/button";
import { useTranslation } from "react-i18next";

interface SubmitButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  submitText?: string;
  className?: string;
  onPress?: () => void;
  type?: "button" | "submit";
  size?: "sm" | "md" | "lg";
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

export default function SubmitButton({
  isDisabled = false,
  isLoading = false,
  loadingText,
  submitText,
  className = "",
  onPress,
  type = "button",
  size = "lg",
  variant = "solid",
  color = "primary",
}: SubmitButtonProps) {
  const { t } = useTranslation();

  const defaultLoadingText = loadingText || t("common.submitting");
  const defaultSubmitText = submitText || t("common.submit");

  const baseClassName =
    "w-full bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-500 dark:to-blue-500 hover:from-sky-700 hover:to-blue-700 dark:hover:from-sky-600 dark:hover:to-blue-600 text-white font-semibold text-sm h-11 transition-all duration-200";

  return (
    <Button
      className={`${baseClassName} ${className}`}
      color={color}
      isDisabled={isDisabled}
      isLoading={isLoading}
      size={size}
      type={type}
      variant={variant}
      onPress={onPress}
    >
      {isLoading ? defaultLoadingText : defaultSubmitText}
    </Button>
  );
}
