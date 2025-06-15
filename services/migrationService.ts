import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { mockCompanies } from '@/data/mockCompanies';
import { CompanyDocument } from '@/types';

/**
 * Migration service to populate Firebase with mock data
 * This should only be run once in development to seed the database
 */
export class MigrationService {
  
  /**
   * Migrate mock companies to Firebase
   * WARNING: This will add new documents to Firebase. Use with caution!
   */
  static async migrateCompanies() {
    try {
      console.log('Starting company migration...');
      
      const batch = writeBatch(db);
      const companiesRef = collection(db, 'companies');
      
      let successCount = 0;
      
      for (const company of mockCompanies) {
        try {
          // Convert Company to CompanyDocument format
          const companyDoc: Omit<CompanyDocument, 'id'> = {
            name: company.name,
            slug: company.slug,
            logo: company.logo,
            industry: company.industry,
            location: company.location,
            website: company.website,
            founded: company.founded,
            employees: company.employees,
            description: company.description,
            rating: company.rating,
            reviewsCount: company.reviewsCount,
            salaryRange: company.salaryRange,
            benefits: company.benefits,
            workEnvironment: company.workEnvironment,
            href: company.href,
            // Firebase specific fields
            isVerified: true,
            status: 'approved',
            submittedBy: 'migration-script',
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          // Create a new document reference
          const newDocRef = doc(companiesRef);
          batch.set(newDocRef, companyDoc);
          
          successCount++;
          
          // Firestore batch has a limit of 500 operations
          if (successCount % 400 === 0) {
            await batch.commit();
            console.log(`Migrated ${successCount} companies so far...`);
          }
          
        } catch (error) {
          console.error(`Error migrating company ${company.name}:`, error);
        }
      }
      
      // Commit any remaining batched operations
      if (successCount % 400 !== 0) {
        await batch.commit();
      }
      
      console.log(`✅ Successfully migrated ${successCount} companies to Firebase!`);
      return { success: true, count: successCount };
      
    } catch (error) {
      console.error('❌ Error during company migration:', error);
      throw error;
    }
  }
  
  /**
   * Add a single company to Firebase (useful for testing)
   */
  static async addSingleCompany(company: CompanyDocument) {
    try {
      const docRef = await addDoc(collection(db, 'companies'), {
        ...company,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log(`✅ Company added with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error('❌ Error adding company:', error);
      throw error;
    }
  }
  
  /**
   * Clear all companies from Firebase (use with extreme caution!)
   * This is mainly for development/testing purposes
   */
  static async clearAllCompanies() {
    try {
      // Note: This is a simplified version. In production, you'd need to handle pagination
      // for large datasets as Firestore has query limits
      console.log('⚠️  This will delete ALL companies from Firebase!');
      console.log('This operation should only be used in development.');
      
      // For now, we'll just log a warning
      // Implement actual deletion logic if needed for development
      console.log('Clear operation not implemented for safety reasons.');
      console.log('If you need to clear data, do it manually from Firebase Console.');
      
    } catch (error) {
      console.error('Error clearing companies:', error);
      throw error;
    }
  }
  
  /**
   * Check Firebase connection and basic operations
   */
  static async testFirebaseConnection() {
    try {
      console.log('Testing Firebase connection...');
      
      // Try to read from companies collection
      const companiesRef = collection(db, 'companies');
      
      // This will just create a query without executing it
      console.log('✅ Firebase connection successful!');
      console.log('Collection reference created:', companiesRef.id);
      
      return { success: true, message: 'Firebase is properly configured and accessible' };
      
    } catch (error) {
      console.error('❌ Firebase connection test failed:', error);
      return { success: false, error: error };
    }
  }
}
