import { GetServerSideProps } from "next";

import { siteConfig } from "@/config/site";

function generateSiteMap(pages: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map((page) => {
         return `
       <url>
           <loc>${siteConfig.siteUrl}${page}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>${page === "" ? "1.0" : "0.8"}</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Páginas estáticas principales
  const staticPages = [
    "",
    "/search",
    "/about",
    "/contact",
    "/terms",
    "/rankings",
  ];

  // TODO: Agregar páginas dinámicas de empresas
  // const companies = await getCompanies(); // Implementar según tu servicio
  // const companyPages = companies.map(company => `/company/${company.slug}`);

  const allPages = [...staticPages];

  // Generar el XML del sitemap
  const sitemap = generateSiteMap(allPages);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate",
  );
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
