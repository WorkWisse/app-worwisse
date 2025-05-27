import DefaultLayout from "@/layouts/default";
import ContactHero from "@/modules/contact/components/ContactHero";
import ContactForm from "@/modules/contact/components/ContactForm";

export default function ContactPage() {
  return (
    <DefaultLayout>
      <ContactHero />
      <ContactForm />

    </DefaultLayout>
  );
}
