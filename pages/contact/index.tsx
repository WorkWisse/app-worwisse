import DefaultLayout from "@/layouts/default";
import ContactHero from "@/modules/contact/components/ContactHero";
import ContactForm from "@/modules/contact/components/ContactForm";
import ContactMap from "@/modules/contact/components/ContactMap";
import ContactFAQ from "@/modules/contact/components/ContactFAQ";

export default function ContactPage() {
  return (
    <DefaultLayout>
      <ContactHero />
      <ContactForm />
      <ContactFAQ />
      <ContactMap />
    </DefaultLayout>
  );
}
