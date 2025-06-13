import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Company related types
export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  industry: string;
  location: {
    country: string;
    state: string;
    city?: string;
  };
  website?: string;
  founded?: number;
  employees?: string;
  description: string;
  rating: number;
  reviewsCount: number;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  benefits: string[];
  workEnvironment: {
    workLifeBalance: number;
    careerOpportunities: number;
    compensation: number;
    culture: number;
    management: number;
  };
  href: string;
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
