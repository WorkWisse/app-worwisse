import { useState } from 'react';
import { Button } from '@heroui/button';
import { Card } from '@heroui/card';
import DefaultLayout from '@/layouts/default';
import { MigrationService } from '@/services/migrationService';
import { CompanyService } from '@/services/companyService';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [companies, setCompanies] = useState<any[]>([]);

  const testConnection = async () => {
    setLoading(true);
    setMessage('Testing Firebase connection...');
    
    try {
      const result = await MigrationService.testFirebaseConnection();
      if (result.success) {
        setMessage('✅ Firebase connection successful!');
      } else {
        setMessage(`❌ Firebase connection failed: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const migrateData = async () => {
    setLoading(true);
    setMessage('Starting migration... This may take a few minutes.');
    
    try {
      const result = await MigrationService.migrateCompanies();
      if (result.success) {
        setMessage(`✅ Successfully migrated ${result.count} companies!`);
      }
    } catch (error) {
      setMessage(`❌ Migration failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    setLoading(true);
    setMessage('Loading companies from Firebase...');
    
    try {
      const data = await CompanyService.getCompanies({ limit: 10 });
      setCompanies(data);
      setMessage(`✅ Loaded ${data.length} companies from Firebase`);
    } catch (error) {
      setMessage(`❌ Error loading companies: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Firebase Admin Panel</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Firebase Connection</h2>
            <p className="text-slate-600 mb-4">
              Test if Firebase is properly configured and accessible.
            </p>
            <Button 
              color="primary" 
              onClick={testConnection}
              disabled={loading}
            >
              Test Connection
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Data Migration</h2>
            <p className="text-slate-600 mb-4">
              Migrate mock companies to Firebase. Only run this once!
            </p>
            <Button 
              color="warning" 
              onClick={migrateData}
              disabled={loading}
            >
              Migrate Mock Data
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Load Companies</h2>
            <p className="text-slate-600 mb-4">
              Test loading companies from Firebase.
            </p>
            <Button 
              color="success" 
              onClick={loadCompanies}
              disabled={loading}
            >
              Load Companies
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">
                {loading ? 'Loading...' : message || 'Ready to test Firebase operations'}
              </pre>
            </div>
          </Card>
        </div>

        {companies.length > 0 && (
          <Card className="p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Companies from Firebase</h2>
            <div className="space-y-2">
              {companies.map((company, index) => (
                <div key={company.id || index} className="border-b pb-2">
                  <h3 className="font-medium">{company.name}</h3>
                  <p className="text-sm text-slate-600">
                    {company.industry} • {company.location?.country} • Rating: {company.rating}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Make sure your Firebase project is created and configured</li>
            <li>Update your <code>.env.local</code> file with Firebase credentials</li>
            <li>Test the connection first</li>
            <li>Run the migration to populate your database</li>
            <li>Test loading data from Firebase</li>
            <li>Configure Firestore security rules</li>
          </ol>
          <p className="mt-4 text-sm text-slate-600">
            See <code>FIREBASE_SETUP.md</code> for detailed setup instructions.
          </p>
        </Card>
      </div>
    </DefaultLayout>
  );
}
