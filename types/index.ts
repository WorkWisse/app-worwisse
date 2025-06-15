import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Company related types
export interface Company {
  id: string;
  name: string;
  industry: string;
  location: {
    country: string;
    state: string;
    city?: string;
  };
  website?: string;
  benefits: string[];
  workEnvironment: {
    workLifeBalance: number;
    careerOpportunities: number;
    compensation: number;
    culture: number;
    management: number;
  };
}

export interface Review {
  id: string;
  companyId: string;
  rating: number;
  role: string;
  department?: string;
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'internship';
  timeWorked?: string;
  timeAgo: string;
  pros: string;
  cons: string;
  advice?: string;
  wouldRecommend: boolean;
  isAnonymous: boolean;
  isVerified: boolean;
  // Calificaciones específicas
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

export interface JobPosition {
  id: string;
  companyId: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
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
export interface CompanyDocument extends Omit<Company, 'id'>, FirebaseDocument {
  // Additional fields for Firebase storage
  isVerified?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  submittedBy?: string; // User ID who submitted the company
}

// Extended Review type for Firebase
export interface ReviewDocument extends Omit<Review, 'id' | 'timeAgo'>, FirebaseDocument {
  // Additional fields for Firebase storage
  userId?: string; // User ID who submitted the review
  status?: 'pending' | 'approved' | 'rejected';
  moderationNotes?: string;
  ipAddress?: string; // For spam prevention
  userAgent?: string; // For spam prevention
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
  sortBy?: 'rating' | 'reviewsCount' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
