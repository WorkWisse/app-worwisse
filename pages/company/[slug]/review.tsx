import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import ReviewForm from "@/modules/company/components/ReviewForm";
import DefaultLayout from "@/layouts/default";
import { CompanyService } from "@/services";

interface ReviewPageProps {
  company: {
    id: string;
    companyName: string;
    // Add other necessary fields from the company object
  } | null;
}

export default function ReviewPage({ company }: ReviewPageProps) {
  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <>
      <DefaultLayout>
        <Head>
          <title>Calificar {company.companyName} - WorkWisse</title>
          <meta
            name="description"
            content={`Comparte tu experiencia trabajando en ${company.companyName}. Tu opinión es importante para que otras personas tomen mejores decisiones.`}
          />
        </Head>
        <ReviewForm company={company} />
      </DefaultLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const companies = await CompanyService.getCompanies();

  const paths = companies.map((company: { id?: string }) => ({
    params: { slug: company.id ?? "" },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("params:", params);

  const companySlug = params?.slug as string;

  let company = null;

  try {
    const fetchedCompany = await CompanyService.getCompanyById(companySlug);

    // Serializar fechas si existen
    if (fetchedCompany) {
      company = {
        ...fetchedCompany,
        createdAt: fetchedCompany.createdAt?.toDate?.().toISOString?.() ?? null,
        updatedAt: fetchedCompany.updatedAt?.toDate?.().toISOString?.() ?? null,
      };
    }
    console.log("Fetched company:", company);
  } catch (error) {
    console.error("Error fetching company:", error);
  }

  return {
    props: {
      companySlug,
      company: company || null,
    },
  };
};
