import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/config/firebase";
import { CompanyDocument, SearchParams } from "@/types";

const COMPANIES_COLLECTION = "companies";

export class CompanyService {
  // Get all companies with optional filters and pagination
  static async getCompanies(params: SearchParams = {}) {
    try {
      let q = collection(db, COMPANIES_COLLECTION);
      const constraints = [];

      // Add status filter (only approved companies)
      constraints.push(where("approved", "==", true));

      // Add search query
      if (params.query) {
        // Note: Firestore doesn't support full-text search natively
        // You might want to use Algolia or implement a more complex search
        constraints.push(where("companyName", ">=", params.query));
        constraints.push(where("companyName", "<=", params.query + "\uf8ff"));
      }

      // Add filters
      if (params.filters?.industry?.length) {
        constraints.push(where("industry", "in", params.filters.industry));
      }

      if (params.filters?.location?.country) {
        constraints.push(
          where("location.country", "==", params.filters.location.country),
        );
      }

      if (params.filters?.location?.state) {
        constraints.push(
          where("location.state", "==", params.filters.location.state),
        );
      }

      // Add sorting
      const sortField = params.sortBy || "rating";
      const sortDirection = params.sortOrder || "desc";
      constraints.push(orderBy(sortField, sortDirection));

      // Add limit
      if (params.limit) {
        constraints.push(limit(params.limit));
      }

      const querySnapshot = await getDocs(query(q, ...constraints));

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CompanyDocument[];
    } catch (error) {
      console.error("Error getting companies:", error);
      throw error;
    }
  }

  // Get company by ID
  static async getCompanyById(id: string) {
    try {
      const docRef = doc(db, COMPANIES_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as CompanyDocument;
      }
      return null;
    } catch (error) {
      console.error("Error getting company:", error);
      throw error;
    }
  }

  // Get company by slug
  static async getCompanyBySlug(slug: string) {
    try {
      const q = query(
        collection(db, COMPANIES_COLLECTION),
        where("slug", "==", slug),
        where("status", "==", "approved"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as CompanyDocument;
      }
      return null;
    } catch (error) {
      console.error("Error getting company by slug:", error);
      throw error;
    }
  }

  // Add new company
  static async addCompany(
    companyData: Omit<CompanyDocument, "id" | "createdAt" | "updatedAt">
  ) {
    try {
      const docRef = await addDoc(collection(db, COMPANIES_COLLECTION), {
        ...companyData,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return docRef.id;
    } catch (error) {
      console.error("Error adding company:", error);
      throw error;
    }
  }

  // Update company
  static async updateCompany(id: string, updates: Partial<CompanyDocument>) {
    try {
      const docRef = doc(db, COMPANIES_COLLECTION, id);

      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    }
  }

  // Delete company
  static async deleteCompany(id: string) {
    try {
      const docRef = doc(db, COMPANIES_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting company:", error);
      throw error;
    }
  }

  // Get companies with pagination
  static async getCompaniesPaginated(
    pageSize: number = 10,
    lastDoc?: DocumentSnapshot,
    filters: SearchParams = {}
  ) {
    try {
      let q = collection(db, COMPANIES_COLLECTION);
      const constraints = [];

      constraints.push(where("status", "==", "approved"));
      constraints.push(
        orderBy(filters.sortBy || "rating", filters.sortOrder || "desc")
      );
      constraints.push(limit(pageSize));

      if (lastDoc) {
        constraints.push(startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(query(q, ...constraints));

      return {
        companies: querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CompanyDocument[],
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
        hasMore: querySnapshot.docs.length === pageSize,
      };
    } catch (error) {
      console.error("Error getting paginated companies:", error);
      throw error;
    }
  }
}
