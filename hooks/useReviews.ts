import { useQuery } from "@tanstack/react-query";

import { ReviewService, CompanyService } from "@/services";
import { ReviewDocument, CompanyDocument } from "@/types";

// Tipo extendido para reseñas con datos de empresa
export interface ReviewWithCompany extends ReviewDocument {
  company?: CompanyDocument;
}

// Hook para obtener reseñas más recientes con datos de empresa optimizado
export function useLatestReviews(limit: number = 5) {
  return useQuery({
    queryKey: ["reviews", "latest", limit],
    queryFn: async (): Promise<ReviewWithCompany[]> => {
      // Obtener reseñas más recientes
      const reviews = await ReviewService.getLatestReviews(limit);

      // Obtener IDs únicos de empresas
      const uniqueCompanyIds = [
        ...new Set(reviews.map((review) => review.companyId).filter(Boolean)),
      ];

      // Obtener datos de empresas en paralelo (máximo 5 llamadas)
      const companiesPromises = uniqueCompanyIds.map((id) =>
        CompanyService.getCompanyById(id).catch(() => null),
      );

      const companies = await Promise.all(companiesPromises);

      // Crear un mapa de empresas por ID
      const companiesMap = new Map<string, CompanyDocument>();

      companies.forEach((company, index) => {
        if (company) {
          companiesMap.set(uniqueCompanyIds[index], company);
        }
      });

      // Combinar reseñas con datos de empresa
      return reviews.map((review) => ({
        ...review,
        company: review.companyId
          ? companiesMap.get(review.companyId)
          : undefined,
      }));
    },
    staleTime: 3 * 60 * 1000, // 3 minutos (datos más dinámicos)
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Hook para obtener reseñas de una empresa específica
export function useCompanyReviews(companyId: string, pageSize: number = 3) {
  return useQuery({
    queryKey: ["reviews", "company", companyId, pageSize],
    queryFn: () => ReviewService.getCompanyReviews(companyId, pageSize),
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: !!companyId,
  });
}

// Hook para obtener el conteo de reseñas de una empresa
export function useCompanyReviewsCount(companyId: string) {
  return useQuery({
    queryKey: ["reviews", "count", companyId],
    queryFn: () => ReviewService.getCompanyReviewsCount(companyId),
    staleTime: 10 * 60 * 1000, // 10 minutos
    enabled: !!companyId,
  });
}

// Hook para obtener una reseña por ID
export function useReview(id: string) {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => ReviewService.getReviewById(id),
    staleTime: 10 * 60 * 1000, // 10 minutos
    enabled: !!id,
  });
}
