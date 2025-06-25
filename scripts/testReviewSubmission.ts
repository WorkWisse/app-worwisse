// Test script to verify review submission and company stats update
import { ReviewService, CompanyService } from "../services";
import { ReviewDocument } from "../types";

async function testReviewSubmission() {
  try {
    // Test data for a new review
    const testReview: Omit<ReviewDocument, "id" | "createdAt" | "updatedAt"> = {
      companyId: "test-company-id", // Replace with actual company ID
      creationDate: new Date().toISOString(),
      role: "Frontend Developer",
      startDate: "2023-01-01",
      endDate: null,
      workEnvironment: 4,
      salary: 4,
      benefits: 3,
      companyCulture: 5,
      internalCommunication: 4,
      professionalGrowth: 4,
      workLifeBalance: 5,
      overallRating: 4,
      workInclusion: 4,
      positiveAspects: "Great work environment, flexible schedule, good team",
      areasForImprovement: "Could improve benefits package",
      recommend: true,
      terms: true,
      approved: false,
    };

    console.log("Adding new review...");
    const reviewId = await ReviewService.addReview(testReview);
    console.log(`Review added with ID: ${reviewId}`);

    // Wait a moment for the stats to update
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get updated company data
    const company = await CompanyService.getCompanyById(testReview.companyId);
    console.log("Updated company stats:", {
      id: company?.id,
      companyName: company?.companyName,
      rating: company?.rating,
      reviewsCount: company?.reviewsCount,
      recommendationRate: company?.recommendationRate,
    });

  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the test (uncomment to execute)
// testReviewSubmission();
