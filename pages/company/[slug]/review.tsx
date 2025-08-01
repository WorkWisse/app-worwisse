import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

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
  const router = useRouter();

  // Show loading state while page is being generated
  if (router.isFallback) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Cargando...</div>
        </div>
      </DefaultLayout>
    );
  }

  if (!company) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Empresa no encontrada</div>
        </div>
      </DefaultLayout>
    );
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

  const paths = companies
    .filter((company: { slug?: string }) => company.slug && company.slug.trim() !== "")
    .map((company: { slug?: string }) => ({
      params: { slug: company.slug! },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const companySlug = params?.slug as string;

  let company = null;

  try {
    const fetchedCompany = await CompanyService.getCompanyBySlug(companySlug);

    if (fetchedCompany) {
      // Serialize Date objects to strings to avoid JSON serialization errors
      company = {
        ...fetchedCompany,
        createdAt: fetchedCompany.createdAt
          ? new Date(fetchedCompany.createdAt.seconds * 1000).toISOString()
          : null,
        updatedAt: fetchedCompany.updatedAt
          ? new Date(fetchedCompany.updatedAt.seconds * 1000).toISOString()
          : null,
      };
    }
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
