import {
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
  writeBatch,
} from "firebase/firestore";

import { db } from "@/config/firebase";
import { ReviewDocument } from "@/types";

const REVIEWS_COLLECTION = "reviews";
const COMPANIES_COLLECTION = "companies";

export class ReviewService {
  // Get reviews for a specific company
  static async getCompanyReviews(
    companyId: string,
    pageSize: number = 10,
    lastDoc?: DocumentSnapshot,
  ) {
    try {
      let q = collection(db, REVIEWS_COLLECTION);
      const constraints = [
        where("companyId", "==", companyId),
        where("approved", "==", true),
        orderBy("createdAt", "desc"),
        limit(pageSize),
      ];

      if (lastDoc) {
        constraints.push(startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(query(q, ...constraints));

      return {
        reviews: querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ReviewDocument[],
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
        hasMore: querySnapshot.docs.length === pageSize,
      };
    } catch (error) {
      console.error("Error getting company reviews:", error);
      throw error;
    }
  }

  // Get latest reviews across all companies
  static async getLatestReviews(pageSize: number = 10) {
    try {
      const q = query(
        collection(db, REVIEWS_COLLECTION),
        where("approved", "==", true),
        orderBy("createdAt", "desc"),
        limit(pageSize),
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ReviewDocument[];
    } catch (error) {
      console.error("Error getting latest reviews:", error);
      throw error;
    }
  }

  // Get review by ID
  static async getReviewById(id: string) {
    try {
      const docRef = doc(db, REVIEWS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as ReviewDocument;
      }
      return null;
    } catch (error) {
      console.error("Error getting review:", error);
      throw error;
    }
  }

  // Add new review
  static async addReview(
    reviewData: Omit<ReviewDocument, "id" | "createdAt" | "updatedAt">
  ) {
    try {
      const batch = writeBatch(db);

      // Add review
      const reviewRef = doc(collection(db, REVIEWS_COLLECTION));
      batch.set(reviewRef, {
        ...reviewData,
        status: "approved", // Auto-approve for now - change to "pending" if manual moderation is needed
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Update company stats (this would need to be done more carefully in a real app)
      // For now, we'll just add the review and update company stats separately
      await batch.commit();

      // Update company rating and review count
      await this.updateCompanyStats(reviewData.companyId);

      return reviewRef.id;
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  }

  // Update review
  static async updateReview(id: string, updates: Partial<ReviewDocument>) {
    try {
      const docRef = doc(db, REVIEWS_COLLECTION, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
      });

      // If the review status changed to approved, update company stats
      if (updates.status === "approved") {
        const reviewData = await this.getReviewById(id);
        if (reviewData) {
          await this.updateCompanyStats(reviewData.companyId);
        }
      }
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  }

  // Delete review
  static async deleteReview(id: string) {
    try {
      const reviewData = await this.getReviewById(id);

      const docRef = doc(db, REVIEWS_COLLECTION, id);
      await deleteDoc(docRef);

      // Update company stats after deletion
      if (reviewData) {
        await this.updateCompanyStats(reviewData.companyId);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  }

  // Update company rating and review count based on approved reviews
  private static async updateCompanyStats(companyId: string) {
    try {
      // Get all approved reviews for the company
      const q = query(
        collection(db, REVIEWS_COLLECTION),
        where("companyId", "==", companyId),
        where("status", "==", "approved")
      );

      const querySnapshot = await getDocs(q);
      const reviews = querySnapshot.docs.map(
        (doc) => doc.data() as ReviewDocument
      );

      if (reviews.length === 0) {
        // No approved reviews, set defaults
        const companyRef = doc(db, COMPANIES_COLLECTION, companyId);
        await updateDoc(companyRef, {
          rating: 0,
          reviewsCount: 0,
          updatedAt: new Date(),
        });
        return;
      }

      // Calculate new average rating using overallRating
      const totalRating = reviews.reduce(
        (sum, review) => sum + (review.overallRating || 0),
        0
      );
      const averageRating =
        Math.round((totalRating / reviews.length) * 10) / 10;

      // Calculate recommendation rate
      const recommendations = reviews.filter((review) => review.recommend);
      const recommendationRate = Math.round(
        (recommendations.length / reviews.length) * 100
      );

      // Update company document with new stats
      const companyRef = doc(db, COMPANIES_COLLECTION, companyId);
      await updateDoc(companyRef, {
        rating: averageRating,
        reviewsCount: reviews.length,
        recommendationRate: recommendationRate,
        updatedAt: new Date(),
      });

      console.log(
        `Updated company ${companyId}: ${reviews.length} reviews, ${averageRating} rating`
      );
    } catch (error) {
      console.error("Error updating company stats:", error);
      throw error;
    }
  }

  // Get review statistics for a company
  static async getCompanyReviewStats(companyId: string) {
    try {
      const q = query(
        collection(db, REVIEWS_COLLECTION),
        where("companyId", "==", companyId),
        where("status", "==", "approved")
      );

      const querySnapshot = await getDocs(q);
      const reviews = querySnapshot.docs.map(
        (doc) => doc.data() as ReviewDocument
      );

      if (reviews.length === 0) {
        return {
          totalReviews: 0,
          averageRating: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          recommendationRate: 0,
        };
      }

      // Calculate rating distribution using overallRating
      const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

      reviews.forEach((review) => {
        const rating = Math.round(
          review.overallRating || 0
        ) as keyof typeof ratingDistribution;

        if (rating >= 1 && rating <= 5) {
          ratingDistribution[rating]++;
        }
      });

      // Calculate recommendation rate using recommend field
      const recommendations = reviews.filter((review) => review.recommend);
      const recommendationRate = Math.round(
        (recommendations.length / reviews.length) * 100
      );

      // Calculate average rating using overallRating
      const totalRating = reviews.reduce(
        (sum, review) => sum + (review.overallRating || 0),
        0
      );
      const averageRating =
        Math.round((totalRating / reviews.length) * 10) / 10;

      return {
        totalReviews: reviews.length,
        averageRating,
        ratingDistribution,
        recommendationRate,
      };
    } catch (error) {
      console.error("Error getting company review stats:", error);
      throw error;
    }
  }
}
