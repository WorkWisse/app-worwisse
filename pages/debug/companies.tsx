import { GetServerSideProps } from "next";
import Head from "next/head";

import { CompanyDocument } from "../../types";

import DefaultLayout from "@/layouts/default";
import { CompanyService } from "@/services";

interface DebugCompaniesProps {
  companies: CompanyDocument[];
  error?: string;
}

export default function DebugCompanies({ companies, error }: DebugCompaniesProps) {
  if (error) {
    return (
      <DefaultLayout>
        <div className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Debug - Companies | WorkWisse</title>
      </Head>
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Debug: Companies in Firebase
        </h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <p className="text-lg">
            Total companies found: <span className="font-bold text-blue-600">{companies.length}</span>
          </p>
        </div>

        {companies.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              No Companies Found
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              No companies were found in the Firebase database. This could mean:
            </p>
            <ul className="list-disc list-inside mt-2 text-yellow-700 dark:text-yellow-300">
              <li>Firebase is not properly configured</li>
              <li>No companies have been added to the database yet</li>
              <li>All companies have a status other than "approved"</li>
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            {companies.map((company) => (
              <div key={company.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">ID</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                      {company.id}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Company Name</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {company.companyName || "N/A"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Slug</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {company.slug || "N/A"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Status</h3>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      company.status === "approved" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : company.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    }`}>
                      {company.status || "unknown"}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Industry</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {company.industry || "N/A"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Reviews Count</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {company.reviewsCount || 0}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Actions</h3>
                  <div className="flex gap-2">
                    <a
                      className="text-blue-600 hover:text-blue-700 text-sm underline"
                      href={`/company/${company.slug || company.id}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      View by Slug/ID
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Troubleshooting Steps
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>Check if Firebase is properly configured in <code className="bg-slate-200 dark:bg-slate-600 px-1 rounded">config/firebase.ts</code></li>
            <li>Verify environment variables in <code className="bg-slate-200 dark:bg-slate-600 px-1 rounded">.env.local</code></li>
            <li>Make sure companies have <code className="bg-slate-200 dark:bg-slate-600 px-1 rounded">status: "approved"</code></li>
            <li>Check if companies have both <code className="bg-slate-200 dark:bg-slate-600 px-1 rounded">slug</code> and <code className="bg-slate-200 dark:bg-slate-600 px-1 rounded">companyName</code> fields</li>
            <li>Verify Firebase security rules allow reading from companies collection</li>
          </ol>
        </div>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const companiesData = await CompanyService.getCompanies({ limit: 50 });
    
    return {
      props: {
        companies: companiesData.companies,
      },
    };
  } catch (error) {
    return {
      props: {
        companies: [],
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
};
