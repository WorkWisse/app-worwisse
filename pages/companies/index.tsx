import { GetStaticProps } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { Card, CardBody } from '@heroui/card';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { Chip } from '@heroui/chip';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Company } from '../../types';
import { mockCompanies } from '../../data/mockCompanies';

interface CompaniesPageProps {
  companies: Company[];
}

export default function CompaniesPage({ companies }: CompaniesPageProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  // Get unique industries and countries for filters
  const industries = Array.from(new Set(companies.map(company => company.industry)));
  const countries = Array.from(new Set(companies.map(company => company.location.country)));

  // Filter companies based on search and filters
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
    const matchesCountry = !selectedCountry || company.location.country === selectedCountry;
    
    return matchesSearch && matchesIndustry && matchesCountry;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : index < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-slate-300 dark:text-slate-600"
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <>
      <Head>
        <title>Empresas - Opiniones y Salarios | WorkWisse</title>
        <meta 
          name="description" 
          content="Descubre las mejores empresas para trabajar en Latinoamérica. Opiniones verificadas, salarios reales y información sobre ambiente laboral de {companies.length} empresas."
        />
        <meta property="og:title" content="Empresas - Opiniones y Salarios | WorkWisse" />
        <meta property="og:description" content="Encuentra la empresa perfecta para tu carrera profesional con información real de empleados." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://workwisse.com/companies" />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Empresas
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Descubre qué dicen los empleados sobre las mejores empresas para trabajar.
                Información real sobre salarios, ambiente laboral y beneficios.
              </p>
              <div className="mt-6 flex justify-center">
                <Chip size="lg" color="primary" variant="flat">
                  {companies.length} empresas disponibles
                </Chip>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Buscar empresas..."
                value={searchTerm}
                onValueChange={setSearchTerm}
                startContent={
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                classNames={{
                  input: "text-slate-900 dark:text-white",
                  inputWrapper: "border-slate-200 dark:border-slate-600",
                }}
              />

              <Select
                placeholder="Todas las industrias"
                selectedKeys={selectedIndustry ? [selectedIndustry] : []}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  setSelectedIndustry(selectedKey);
                }}
                classNames={{
                  value: "text-slate-900 dark:text-white",
                  trigger: "border-slate-200 dark:border-slate-600",
                }}
              >
                {industries.map((industry) => (
                  <SelectItem key={industry} className="text-slate-900 dark:text-white">
                    {industry}
                  </SelectItem>
                ))}
              </Select>

              <Select
                placeholder="Todos los países"
                selectedKeys={selectedCountry ? [selectedCountry] : []}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  setSelectedCountry(selectedKey);
                }}
                classNames={{
                  value: "text-slate-900 dark:text-white",
                  trigger: "border-slate-200 dark:border-slate-600",
                }}
              >
                {countries.map((country) => (
                  <SelectItem key={country} className="text-slate-900 dark:text-white">
                    {country}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {(searchTerm || selectedIndustry || selectedCountry) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchTerm && (
                  <Chip
                    onClose={() => setSearchTerm('')}
                    variant="flat"
                    color="primary"
                  >
                    Búsqueda: {searchTerm}
                  </Chip>
                )}
                {selectedIndustry && (
                  <Chip
                    onClose={() => setSelectedIndustry('')}
                    variant="flat"
                    color="secondary"
                  >
                    Industria: {selectedIndustry}
                  </Chip>
                )}
                {selectedCountry && (
                  <Chip
                    onClose={() => setSelectedCountry('')}
                    variant="flat"
                    color="success"
                  >
                    País: {selectedCountry}
                  </Chip>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-slate-600 dark:text-slate-400">
              {filteredCompanies.length} empresa{filteredCompanies.length !== 1 ? 's' : ''} encontrada{filteredCompanies.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Companies Grid */}
          <div className="grid gap-6">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardBody className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <img
                        src={company.logo}
                        alt={`Logo de ${company.name}`}
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl object-cover"
                      />
                    </div>

                    {/* Company Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            <Link href={company.href} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                              {company.name}
                            </Link>
                          </h3>

                          <div className="flex flex-wrap items-center gap-4 mb-3">
                            <span className="text-slate-600 dark:text-slate-400">
                              {company.industry}
                            </span>
                            <span className="text-slate-500 dark:text-slate-500">•</span>
                            <span className="text-slate-600 dark:text-slate-400">
                              {company.location.city}, {company.location.country}
                            </span>
                            {company.employees && (
                              <>
                                <span className="text-slate-500 dark:text-slate-500">•</span>
                                <span className="text-slate-600 dark:text-slate-400">
                                  {company.employees} empleados
                                </span>
                              </>
                            )}
                          </div>

                          <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                            {company.description}
                          </p>

                          {/* Benefits */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {company.benefits.slice(0, 3).map((benefit, index) => (
                              <Chip key={index} size="sm" variant="flat" color="primary">
                                {benefit}
                              </Chip>
                            ))}
                            {company.benefits.length > 3 && (
                              <Chip size="sm" variant="flat" color="default">
                                +{company.benefits.length - 3} más
                              </Chip>
                            )}
                          </div>
                        </div>

                        {/* Rating & Actions */}
                        <div className="flex-shrink-0 text-right">
                          <div className="flex items-center gap-2 mb-2 lg:justify-end">
                            <div className="flex">{renderStars(company.rating)}</div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">
                              {company.rating}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                            {company.reviewsCount} opiniones
                          </p>

                          <div className="flex flex-col gap-2">
                            <Button
                              as={Link}
                              href={company.href}
                              color="primary"
                              size="sm"
                              className="w-full lg:w-auto"
                            >
                              Ver detalles
                            </Button>
                            <Button
                              variant="bordered"
                              size="sm"
                              className="w-full lg:w-auto border-slate-300 dark:border-slate-600"
                            >
                              Seguir
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* No results */}
          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No se encontraron empresas
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Intenta ajustar los filtros o realizar una búsqueda diferente.
              </p>
              <Button
                color="primary"
                variant="flat"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedIndustry('');
                  setSelectedCountry('');
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      companies: mockCompanies,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
