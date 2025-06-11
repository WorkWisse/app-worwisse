import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import CompanyDetail from "../../modules/company/components/CompanyDetail";
import { Company, Review } from "../../types";
import {
  mockCompanies,
  mockReviews,
  getCompanyById,
  getCompanyReviews,
} from "../../data/mockCompanies";
import DefaultLayout from "@/layouts/default";

interface CompanyPageProps {
  company: Company;
  reviews: Review[];
}

export default function CompanyPage({ company, reviews }: CompanyPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">
            Cargando información de la empresa...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DefaultLayout>
        <Head>
          <title>{company.name} - Opiniones y Salarios | WorkWisse</title>
          <meta
            name="description"
            content={`Descubre qué opinan los empleados de ${company.name}. Rating: ${company.rating}/5 con ${company.reviewsCount} opiniones verificadas. Información sobre salarios, beneficios y ambiente laboral.`}
          />
          <meta
            property="og:title"
            content={`${company.name} - Opiniones y Salarios | WorkWisse`}
          />
          <meta property="og:description" content={company.description} />
          <meta property="og:image" content={company.logo} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${company.name} - Opiniones y Salarios | WorkWisse`}
          />
          <meta name="twitter:description" content={company.description} />
          <meta name="twitter:image" content={company.logo} />
          <link
            rel="canonical"
            href={`https://workwisse.com/company/${company.slug}`}
          />
        </Head>

        <CompanyDetail company={company} reviews={reviews} />
      </DefaultLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all companies
  const paths = mockCompanies.map((company) => ({
    params: { slug: company.slug },
  }));

  return {
    paths,
    fallback: false, // Set to true if you want to enable ISR for new companies
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Get company data
  const company = getCompanyById(slug);

  if (!company) {
    return {
      notFound: true,
    };
  }

  // Get reviews for this company
  const reviews = getCompanyReviews(company.id);

  return {
    props: {
      company,
      reviews,
    },
    // Enable ISR (Incremental Static Regeneration)
    revalidate: 3600, // Revalidate every hour
  };
};
