import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import { useTranslation } from "react-i18next";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmissionState {
  isSubmitting: boolean;
  success: boolean;
  error: string | null;
}

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    success: false,
    error: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmissionState({
      isSubmitting: true,
      success: false,
      error: null,
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      // Éxito: limpiar formulario y mostrar mensaje
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmissionState({
        isSubmitting: false,
        success: true,
        error: null,
      });

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmissionState((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setSubmissionState({
        isSubmitting: false,
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      });

      // Ocultar mensaje de error después de 5 segundos
      setTimeout(() => {
        setSubmissionState((prev) => ({ ...prev, error: null }));
      }, 5000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-14 px-4 bg-white dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("contact.form.title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t("contact.form.description")}
          </p>
        </div> */}

        <Card className="p-8 shadow-xl bg-white dark:bg-slate-800 border dark:border-slate-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                required
                classNames={{
                  input: "text-slate-900 dark:text-white",
                  label: "text-slate-700 dark:text-slate-300 font-medium",
                }}
                label={t("contact.form.fields.name.label")}
                placeholder={t("contact.form.fields.name.placeholder")}
                size="lg"
                value={formData.name}
                variant="bordered"
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <Input
                required
                classNames={{
                  input: "text-slate-900 dark:text-white",
                  label: "text-slate-700 dark:text-slate-300 font-medium",
                }}
                label={t("contact.form.fields.email.label")}
                placeholder={t("contact.form.fields.email.placeholder")}
                size="lg"
                type="email"
                value={formData.email}
                variant="bordered"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <Input
              required
              classNames={{
                input: "text-slate-900 dark:text-white",
                label: "text-slate-700 dark:text-slate-300 font-medium",
              }}
              label={t("contact.form.fields.subject.label")}
              placeholder={t("contact.form.fields.subject.placeholder")}
              size="lg"
              value={formData.subject}
              variant="bordered"
              onChange={(e) => handleChange("subject", e.target.value)}
            />

            <div className="space-y-2">
              <label
                className="block text-slate-700 dark:text-slate-300 font-medium text-sm"
                htmlFor="message"
              >
                {t("contact.form.fields.message.label")}
              </label>
              <textarea
                required
                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800 transition-colors duration-200"
                id="message"
                placeholder={t("contact.form.fields.message.placeholder")}
                rows={6}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                className="bg-sky-600 dark:bg-sky-600 text-white hover:bg-sky-700 dark:hover:bg-sky-700 font-semibold px-12 py-3 transition-colors duration-200"
                disabled={submissionState.isSubmitting}
                type="submit"
              >
                {submissionState.isSubmitting
                  ? t("contact.form.button.sending")
                  : t("contact.form.button.send")}
              </Button>
            </div>

            {/* Mensaje de éxito */}
            {submissionState.success && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200 text-center font-medium">
                  {t("contact.form.messages.success")}
                </p>
              </div>
            )}

            {/* Mensaje de error */}
            {submissionState.error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-center font-medium">
                  {submissionState.error}
                </p>
              </div>
            )}
          </form>
        </Card>
      </div>
    </section>
  );
}
