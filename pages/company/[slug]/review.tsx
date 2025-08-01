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
            content={`Comparte tu experiencia trabajando en ${company.companyName}. Tu opinión es importante para que otras personas tomen mejores decisiones.`}
            name="description"
          />
        </Head>
        <ReviewForm company={company} />
      </DefaultLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const companies = await CompanyService.getCompanies();

  const paths = companies.map((company: { slug?: string }) => ({
    params: { slug: company.slug ?? "" },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const companySlug = params?.slug as string;

  let company = null;

  try {
    const fetchedCompany = await CompanyService.getCompanyBySlug(companySlug);
    company = fetchedCompany;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching company:", error);
  }

  return {
    props: {
      company: company || null,
    },
  };
};
