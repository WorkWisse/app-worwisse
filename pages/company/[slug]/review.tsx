import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import ReviewForm from "@/modules/company/components/ReviewForm";
import { mockCompanies } from "@/data/mockCompanies";

interface ReviewPageProps {
  companySlug: string;
}

export default function ReviewPage({ companySlug }: ReviewPageProps) {
  const company = mockCompanies.find((c) => c.slug === companySlug);

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <>
      <Head>
        <title>Calificar {company.name} - WorkWisse</title>
        <meta
          name="description"
          content={`Comparte tu experiencia trabajando en ${company.name}. Tu opinión es importante para que otras personas tomen mejores decisiones.`}
        />
      </Head>
      <ReviewForm />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mockCompanies.map((company) => ({
    params: { slug: company.slug, page: "review" },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const companySlug = params?.slug as string;

  return {
    props: {
      companySlug,
    },
  };
};
