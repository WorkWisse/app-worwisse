import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Company related types
export interface Company {
  id: string;
  creationDate: string; // ISO date string
  companyName: string;
  nameLowerCase: string; // Lowercase version of companyName for case-insensitive search
  reviewsCount: number; // Total number of reviews
  rating: number; // Average rating from reviews
  logoUrl: string; // URL to the company logo
  industry: string;
  country: string;
  state: string;
  website: string;
  benefits: string; // Description of benefits
  terms: boolean;
  approved: boolean;
  approvalDate?: string | null; // ISO date string or null
}

export interface Review {
  id: string;
  companyId: string; // Reference to the company being reviewed
  companyName?: string; // Optional, can be used for display purposes
  creationDate: string; // ISO date string
  role: string;
  startDate: string; // ISO date string
  endDate: string | null; // ISO date string or null
  workEnvironment: number;
  salary: number;
  benefits: number;
  companyCulture: number;
  internalCommunication: number;
  professionalGrowth: number;
  workLifeBalance: number;
  overallRating: number;
  workInclusion: number;
  positiveAspects: string;
  areasForImprovement: string;
  recommend: boolean;
  terms: boolean;
  approved: boolean;
  approvalDate?: string | null; // ISO date string or null
}

export interface JobPosition {
  id: string;
  companyId: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  isActive: boolean;
  postedDate: string;
}

// Firebase specific types
export interface FirebaseDocument {
  id?: string;
  createdAt?: Date | any; // Firebase Timestamp
  updatedAt?: Date | any; // Firebase Timestamp
}

// Extended Company type for Firebase
export interface CompanyDocument
  extends Omit<Company, "id" | "reviewsCount" | "rating">,
    FirebaseDocument {
  // Additional fields for Firebase storage
  isVerified?: boolean;
  status?: "pending" | "approved" | "rejected";
  submittedBy?: string; // User ID who submitted the company
  // Statistics
  rating?: number; // Average rating from reviews
  reviewsCount?: number; // Total number of reviews (optional in Firebase)
  recommendationRate?: number; // Percentage of employees who would recommend (0-100)
  slug?: string; // URL-friendly identifier
}

// Extended Review type for Firebase
export interface ReviewDocument extends Omit<Review, "id">, FirebaseDocument {
  // Additional fields for Firebase storage
  userId?: string; // User ID who submitted the review
  companyName?: string; // Name of the company being reviewed
  moderationNotes?: string;
  ipAddress?: string; // For spam prevention
  userAgent?: string; // For spam prevention

  // Compatibility fields for UI components
  rating?: number; // Overall rating (alias for overallRating)
  timeAgo?: string; // Human-readable time ago
  pros?: string; // Alias for positiveAspects
  cons?: string; // Alias for areasForImprovement
  wouldRecommend?: boolean; // Alias for recommend

  // Optional structured ratings object for advanced rating systems
  ratings?: {
    workEnvironment: number;
    compensation: number;
    benefits: number;
    culture: number;
    communication: number;
    careerGrowth: number;
    workLifeBalance: number;
    inclusion: number;
  };
}

// User type for authentication
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isAnonymous?: boolean;
  createdAt?: Date | any;
  updatedAt?: Date | any;
}

// Search/Filter types
export interface CompanyFilters {
  industry?: string[];
  location?: {
    country?: string;
    state?: string;
    city?: string;
  };
  rating?: {
    min?: number;
    max?: number;
  };
  employees?: string[];
  benefits?: string[];
}

export interface SearchParams {
  query?: string;
  filters?: CompanyFilters;
  sortBy?: "rating" | "reviewsCount" | "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}
