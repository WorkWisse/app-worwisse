import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {t("contact.form.title")}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("contact.form.description")}
          </p>
        </div> */}

        <Card className="p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label={t("contact.form.fields.name.label")}
                placeholder={t("contact.form.fields.name.placeholder")}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                size="lg"
                variant="bordered"
                classNames={{
                  input: "text-slate-900",
                  label: "text-slate-700 font-medium",
                }}
              />
              <Input
                label={t("contact.form.fields.email.label")}
                placeholder={t("contact.form.fields.email.placeholder")}
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                size="lg"
                variant="bordered"
                classNames={{
                  input: "text-slate-900",
                  label: "text-slate-700 font-medium",
                }}
              />
            </div>

            <Input
              label={t("contact.form.fields.subject.label")}
              placeholder={t("contact.form.fields.subject.placeholder")}
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              required
              size="lg"
              variant="bordered"
              classNames={{
                input: "text-slate-900",
                label: "text-slate-700 font-medium",
              }}
            />

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-slate-700 font-medium text-sm"
              >
                {t("contact.form.fields.message.label")}
              </label>
              <textarea
                id="message"
                placeholder={t("contact.form.fields.message.placeholder")}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-sky-500 focus:outline-none resize-none text-slate-900 placeholder-slate-400"
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                className="bg-sky-600 text-white hover:bg-sky-700 font-semibold px-12 py-3"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t("contact.form.button.sending")
                  : t("contact.form.button.send")}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
