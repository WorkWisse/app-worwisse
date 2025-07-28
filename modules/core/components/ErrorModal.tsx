import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useTranslation } from "react-i18next";

interface ErrorModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

export default function ErrorModal({
  isOpen,
  title,
  message,
  onClose,
}: ErrorModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      classNames={{
        backdrop: "bg-slate-900/50 backdrop-blur-sm",
        base: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
        header: "border-b border-slate-200 dark:border-slate-700",
        body: "py-6",
        footer: "border-t border-slate-200 dark:border-slate-700",
      }}
      isOpen={isOpen}
      placement="center"
      size="md"
      onOpenChange={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title || t("common.error.title")}
          </h3>
        </ModalHeader>
        <ModalBody>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {message}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-slate-600 hover:bg-slate-700 text-white font-medium"
            color="primary"
            onPress={onClose}
          >
            {t("common.error.close")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
