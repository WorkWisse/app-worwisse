import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import CompanyDetail from "../../modules/company/components/CompanyDetail";
import { CompanyDocument, ReviewDocument } from "../../types";

import DefaultLayout from "@/layouts/default";
import { CompanyService, ReviewService } from "@/services";

interface CompanyPageProps {
  company: CompanyDocument;
  totalReviewsCount: number;
}

export default function CompanyPage({
  company,
  totalReviewsCount,
}: CompanyPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-300">
            Cargando información de la empresa...
          </p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Empresa no encontrada
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            La empresa que buscas no existe o ha sido eliminada.
          </p>
          <button
            className="text-sky-600 hover:text-sky-700 font-medium"
            onClick={() => router.push("/")}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <DefaultLayout>
        <Head>
          <title>
            {company.companyName || "Unknown Company"} - Opiniones y Salarios |
            WorkWisse
          </title>
          <meta
            content={`Descubre qué opinan los empleados de ${company.companyName || "Unknown Company"}. Rating: ${company.rating || 0}/5 con ${company.reviewsCount || 0} opiniones verificadas. Información sobre salarios, beneficios y ambiente laboral.`}
            name="description"
          />
          <meta
            content={`${company.companyName || "Unknown Company"} - Opiniones y Salarios | WorkWisse`}
            property="og:title"
          />
          <meta
            content={`Información y opiniones sobre trabajar en ${company.companyName || "Unknown Company"}. Rating: ${company.rating || 0}/5 con ${company.reviewsCount || 0} reseñas.`}
            property="og:description"
          />
          <meta content="website" property="og:type" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta
            content={`${company.companyName || "Unknown Company"} - Opiniones y Salarios | WorkWisse`}
            name="twitter:title"
          />
          <meta
            content={`Información y opiniones sobre trabajar en ${company.companyName || "Unknown Company"}. Rating: ${company.rating || 0}/5 con ${company.reviewsCount || 0} reseñas.`}
            name="twitter:description"
          />
          <link
            href={`https://workwisse.com/company/${company.slug || company.id}`}
            rel="canonical"
          />
        </Head>

        <CompanyDetail
          company={company}
          totalReviewsCount={totalReviewsCount}
        />
      </DefaultLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    let company = await CompanyService.getCompanyById(slug);

    if (!company) {
      return {
        props: {
          company: null,
          totalReviewsCount: 0,
        },
      };
    }

    const totalReviewsCount = await ReviewService.getCompanyReviewsCount(
      company.id!,
    );

    // No pasamos lastDoc serializado, lo manejamos desde el cliente

    const companySerializable = {
      ...company,
      createdAt: company.createdAt?.toDate?.().toISOString?.() || null,
      updatedAt: company.updatedAt?.toDate?.().toISOString?.() || null,
    };

    return {
      props: {
        company: companySerializable,
        totalReviewsCount,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Error fetching company data:", error);
    }

    return {
      props: {
        company: null,
        totalReviewsCount: 0,
      },
    };
  }
};
