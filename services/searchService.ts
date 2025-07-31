import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/config/firebase";
import { CompanyDocument } from "@/types";

const COMPANIES_COLLECTION = "companies";

export interface SearchSuggestion {
  id: string;
  name: string;
  reviewsCount: number;
  rating: number;
  industry: string;
  location: {
    country: string;
    state: string;
  };
}

export class SearchService {
  // Get search suggestions based on query
  static async getSearchSuggestions(
    searchQuery: string,
    maxResults: number = 5
  ): Promise<SearchSuggestion[]> {
    try {
      if (!searchQuery || searchQuery.trim().length < 1) {
        return [];
      }

      const queryLower = searchQuery.toLowerCase().trim();

      // Get all approved companies first (we'll filter on client side)
      const q = query(
        collection(db, COMPANIES_COLLECTION),
        orderBy("reviewsCount", "desc"),
        limit(50) // Get more results to filter client-side
      );

      const querySnapshot = await getDocs(q);

      const allCompanies = querySnapshot.docs.map((doc) => {
        const data = doc.data() as CompanyDocument;

        return {
          id: doc.id,
          name: data.companyName || "",
          reviewsCount: data.reviewsCount || 0,
          rating: data.rating || 0,
          industry: data.industry || "",
          location: {
            country: data.country || "",
            state: data.state || "",
          },
        };
      });

      // Filter and sort results client-side
      const suggestions = allCompanies
        .filter((company) => company.name.toLowerCase().includes(queryLower))
        .sort((a, b) => {
          // Prioritize exact matches at the beginning
          const aStartsWith = a.name.toLowerCase().startsWith(queryLower);
          const bStartsWith = b.name.toLowerCase().startsWith(queryLower);

          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;

          // Then sort by review count
          return b.reviewsCount - a.reviewsCount;
        })
        .slice(0, maxResults);

      return suggestions;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error getting search suggestions:", error);

      return [];
    }
  }

  // Perform full company search
  static async searchCompanies(
    searchQuery: string,
    maxResults: number = 20
  ): Promise<CompanyDocument[]> {
    try {
      if (!searchQuery || searchQuery.trim().length < 1) {
        // Return popular companies if no search query
        return this.getPopularCompanies(maxResults);
      }

      const q = query(
        collection(db, COMPANIES_COLLECTION),
        where("name", ">=", searchQuery),
        where("name", "<=", searchQuery + "\uf8ff"),
        orderBy("name"),
        orderBy("reviewsCount", "desc"),
        limit(maxResults)
      );

      const querySnapshot = await getDocs(q);

      const companies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CompanyDocument[];

      // Filter results for better matching
      const query_lower = searchQuery.toLowerCase().trim();

      return companies.filter((company) =>
        company.companyName.toLowerCase().includes(query_lower)
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error searching companies:", error);
      throw error;
    }
  }

  // Get popular companies (fallback when no search query)
  static async getPopularCompanies(
    maxResults: number = 20
  ): Promise<CompanyDocument[]> {
    try {
      const q = query(
        collection(db, COMPANIES_COLLECTION),
        orderBy("reviewsCount", "desc"),
        orderBy("rating", "desc"),
        limit(maxResults)
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CompanyDocument[];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error getting popular companies:", error);
      throw error;
    }
  }
}
