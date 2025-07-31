import { useQuery } from "@tanstack/react-query";

import { CompanyService } from "@/services";
import { SearchParams } from "@/types";

// Hook para obtener empresas destacadas
export function useFeaturedCompanies(limit: number = 5) {
  return useQuery({
    queryKey: ["companies", "featured", limit],
    queryFn: () =>
      CompanyService.getCompanies({
        sortBy: "rating",
        sortOrder: "desc",
        limit,
      }),
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 15 * 60 * 1000, // 15 minutos
  });
}

// Hook para obtener empresas con parámetros de búsqueda
export function useCompanies(params: SearchParams = {}) {
  return useQuery({
    queryKey: ["companies", params],
    queryFn: () => CompanyService.getCompanies(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: !!params, // Solo ejecutar si hay parámetros
  });
}

// Hook para obtener una empresa por ID
export function useCompany(id: string) {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => CompanyService.getCompanyById(id),
    staleTime: 10 * 60 * 1000, // 10 minutos
    enabled: !!id,
  });
}

// Hook para obtener una empresa por slug
export function useCompanyBySlug(slug: string) {
  return useQuery({
    queryKey: ["company", "slug", slug],
    queryFn: () => CompanyService.getCompanyBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutos
    enabled: !!slug,
  });
}
