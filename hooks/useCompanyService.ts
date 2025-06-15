import { useState } from 'react';
import { CompanyService } from '@/services/companyService';
import { CompanyDocument } from '@/types';

interface UseCompanyServiceReturn {
  // Estados
  loading: boolean;
  error: string | null;
  success: boolean;
  
  // Funciones
  addCompany: (data: Omit<CompanyDocument, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string | null>;
  getCompanies: (params?: any) => Promise<CompanyDocument[] | null>;
  getCompanyBySlug: (slug: string) => Promise<CompanyDocument | null>;
  clearError: () => void;
  clearSuccess: () => void;
}

/**
 * Hook personalizado para usar CompanyService de manera más fácil
 */
export const useCompanyService = (): UseCompanyServiceReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(false);

  const addCompany = async (
    data: Omit<CompanyDocument, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const companyId = await CompanyService.addCompany(data);
      setSuccess(true);
      return companyId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getCompanies = async (params: any = {}): Promise<CompanyDocument[] | null> => {
    setLoading(true);
    setError(null);

    try {
      const companies = await CompanyService.getCompanies(params);
      return companies;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener empresas';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getCompanyBySlug = async (slug: string): Promise<CompanyDocument | null> => {
    setLoading(true);
    setError(null);

    try {
      const company = await CompanyService.getCompanyBySlug(slug);
      return company;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener empresa';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    addCompany,
    getCompanies,
    getCompanyBySlug,
    clearError,
    clearSuccess
  };
};

// Hook específico para formularios de agregar empresa
export const useAddCompanyForm = () => {
  const { addCompany, loading, error, success, clearError, clearSuccess } = useCompanyService();

  const submitCompanyForm = async (formData: {
    name: string;
    industry: string;
    country: string;
    state: string;
    website: string;
    benefits: string[];
  }, options: {
    industries: Array<{key: string, label: string}>;
    countries: Array<{key: string, label: string}>;
    currentRegions: Array<{key: string, label: string}>;
    userId?: string;
  }) => {
    // Generar slug
    const slug = formData.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    // Obtener labels
    const industryLabel = options.industries.find(i => i.key === formData.industry)?.label || formData.industry;
    const countryLabel = options.countries.find(c => c.key === formData.country)?.label || formData.country;
    const stateLabel = options.currentRegions.find(r => r.key === formData.state)?.label || formData.state;

    // Crear datos para Firebase
    const companyData: Omit<CompanyDocument, 'id' | 'createdAt' | 'updatedAt'> = {
      name: formData.name.trim(),
      slug: slug,
      logo: `https://picsum.photos/seed/${slug}/200/200`,
      industry: industryLabel,
      location: {
        country: countryLabel,
        state: stateLabel,
        city: undefined
      },
      website: formData.website?.trim() || undefined,
      founded: undefined,
      employees: undefined,
      description: `Empresa de ${industryLabel} ubicada en ${stateLabel}, ${countryLabel}.`,
      rating: 0,
      reviewsCount: 0,
      benefits: [...formData.benefits],
      workEnvironment: {
        workLifeBalance: 0,
        careerOpportunities: 0,
        compensation: 0,
        culture: 0,
        management: 0
      },
      href: `/company/${slug}`,
      isVerified: false,
      status: 'pending',
      submittedBy: options.userId || 'anonymous'
    };

    return await addCompany(companyData);
  };

  return {
    submitCompanyForm,
    loading,
    error,
    success,
    clearError,
    clearSuccess
  };
};
