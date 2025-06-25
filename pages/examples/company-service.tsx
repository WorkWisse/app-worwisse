import { useState } from 'react';
import { Button } from '@heroui/button';
import { Card } from '@heroui/card';
import { CompanyService } from '@/services/companyService';
import { CompanyDocument } from '@/types';

/**
 * Ejemplo de uso del CompanyService.addCompany
 * Este componente muestra cómo usar el servicio para agregar una nueva empresa
 */
export default function CompanyServiceExample() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Ejemplo 1: Agregar una empresa con datos mínimos
  const addBasicCompany = async () => {
    setLoading(true);
    setMessage('Agregando empresa básica...');

    try {
      const companyData: Omit<CompanyDocument, 'id' | 'createdAt' | 'updatedAt'> = {
        name: 'Mi Empresa Tech',
        slug: 'mi-empresa-tech',
        logo: 'https://picsum.photos/seed/miempresa/200/200',
        industry: 'Tecnología',
        location: {
          country: 'Argentina',
          state: 'Buenos Aires',
          city: 'CABA'
        },
        website: 'https://miempresa.com',
        founded: 2020,
        employees: '50-100',
        description: 'Una empresa innovadora de tecnología',
        rating: 0,
        reviewsCount: 0,
        benefits: ['Trabajo remoto', 'Horarios flexibles', 'Seguro médico'],
        workEnvironment: {
          workLifeBalance: 0,
          careerOpportunities: 0,
          compensation: 0,
          culture: 0,
          management: 0
        },
        href: '/company/mi-empresa-tech',
        // Campos específicos de Firebase
        isVerified: false,
        status: 'pending',
        submittedBy: 'user-123' // ID del usuario que la envía
      };

      const companyId = await CompanyService.addCompany(companyData);
      setMessage(`✅ Empresa agregada exitosamente con ID: ${companyId}`);
      
    } catch (error) {
      console.error('Error al agregar empresa:', error);
      setMessage(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Ejemplo 2: Agregar una empresa con datos completos
  const addCompleteCompany = async () => {
    setLoading(true);
    setMessage('Agregando empresa completa...');

    try {
      const companyData: Omit<CompanyDocument, 'id' | 'createdAt' | 'updatedAt'> = {
        name: 'Startup Innovadora SRL',
        slug: 'startup-innovadora-srl',
        logo: 'https://picsum.photos/seed/startup/200/200',
        industry: 'Software & IT',
        location: {
          country: 'Argentina',
          state: 'Córdoba',
          city: 'Córdoba Capital'
        },
        website: 'https://startup-innovadora.com',
        founded: 2018,
        employees: '100-500',
        description: 'Desarrollamos soluciones tecnológicas para empresas de toda Latinoamérica. Especialistas en desarrollo web, mobile y soluciones de inteligencia artificial.',
        rating: 0, // Se calculará automáticamente con las reseñas
        reviewsCount: 0, // Se actualizará automáticamente
        salaryRange: {
          min: 200000,
          max: 800000,
          currency: 'ARS'
        },
        benefits: [
          'Trabajo remoto 100%',
          'Horarios flexibles',
          'Seguro médico privado',
          'Capacitaciones pagas',
          'Gym corporativo',
          'Días de home office',
          'Bonos por performance',
          'Stock options',
          'Almuerzo gratis',
          'Eventos de team building'
        ],
        workEnvironment: {
          workLifeBalance: 0, // Se calculará con las reseñas
          careerOpportunities: 0,
          compensation: 0,
          culture: 0,
          management: 0
        },
        href: '/company/startup-innovadora-srl',
        // Campos específicos de Firebase
        isVerified: true, // Si es una empresa verificada
        status: 'approved', // pending, approved, rejected
        submittedBy: 'admin-user' // ID del usuario que la agregó
      };

      const companyId = await CompanyService.addCompany(companyData);
      setMessage(`✅ Empresa completa agregada con ID: ${companyId}`);
      
    } catch (error) {
      console.error('Error al agregar empresa completa:', error);
      setMessage(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Ejemplo 3: Agregar empresa desde datos de formulario
  const addCompanyFromForm = async () => {
    setLoading(true);
    setMessage('Agregando empresa desde formulario...');

    try {
      // Simular datos que vienen de un formulario como el tuyo
      const formData = {
        name: 'Consultora Digital Plus',
        industry: 'consulting', // key del select
        country: 'ar', // key del select
        state: 'caba', // key del select
        website: 'https://consultora-digital.com',
        benefits: ['Trabajo remoto', 'Capacitaciones', 'Seguro médico']
      };

      // Mapear los datos del formulario al formato de CompanyDocument
      const slug = formData.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-'); // Replace spaces with hyphens

      // Mapear los keys a labels (en una app real, esto vendría de tu configuración)
      const industryMap: Record<string, string> = {
        'consulting': 'Consultoría',
        'tech': 'Tecnología',
        'finance': 'Finanzas'
      };

      const countryMap: Record<string, string> = {
        'ar': 'Argentina',
        'br': 'Brasil',
        'cl': 'Chile'
      };

      const stateMap: Record<string, string> = {
        'caba': 'Ciudad Autónoma de Buenos Aires',
        'buenos-aires': 'Buenos Aires',
        'cordoba': 'Córdoba'
      };

      const companyData: Omit<CompanyDocument, 'id' | 'createdAt' | 'updatedAt'> = {
        name: formData.name,
        slug: slug,
        logo: `https://picsum.photos/seed/${slug}/200/200`,
        industry: industryMap[formData.industry] || formData.industry,
        location: {
          country: countryMap[formData.country] || formData.country,
          state: stateMap[formData.state] || formData.state,
          city: undefined
        },
        website: formData.website,
        founded: undefined,
        employees: undefined,
        description: `Empresa de ${industryMap[formData.industry]} ubicada en ${stateMap[formData.state]}.`,
        rating: 0,
        reviewsCount: 0,
        benefits: formData.benefits,
        workEnvironment: {
          workLifeBalance: 0,
          careerOpportunities: 0,
          compensation: 0,
          culture: 0,
          management: 0
        },
        href: `/company/${slug}`,
        // Campos de Firebase
        isVerified: false,
        status: 'pending', // Todas las empresas enviadas por usuarios empiezan como pending
        submittedBy: 'anonymous' // O el ID del usuario logueado
      };

      const companyId = await CompanyService.addCompany(companyData);
      setMessage(`✅ Empresa desde formulario agregada con ID: ${companyId}`);
      
    } catch (error) {
      console.error('Error al agregar empresa desde formulario:', error);
      setMessage(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ejemplos de uso: CompanyService.addCompany</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Ejemplo 1: Empresa básica */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Empresa Básica</h2>
          <p className="text-slate-600 mb-4 text-sm">
            Agrega una empresa con los campos mínimos requeridos.
          </p>
          <Button 
            color="primary" 
            onClick={addBasicCompany}
            disabled={loading}
            className="w-full"
          >
            Agregar Empresa Básica
          </Button>
        </Card>

        {/* Ejemplo 2: Empresa completa */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Empresa Completa</h2>
          <p className="text-slate-600 mb-4 text-sm">
            Agrega una empresa con todos los campos disponibles.
          </p>
          <Button 
            color="success" 
            onClick={addCompleteCompany}
            disabled={loading}
            className="w-full"
          >
            Agregar Empresa Completa
          </Button>
        </Card>

        {/* Ejemplo 3: Desde formulario */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Desde Formulario</h2>
          <p className="text-slate-600 mb-4 text-sm">
            Simula datos que vienen de un formulario de usuario.
          </p>
          <Button 
            color="warning" 
            onClick={addCompanyFromForm}
            disabled={loading}
            className="w-full"
          >
            Agregar Desde Formulario
          </Button>
        </Card>
      </div>

      {/* Estado y mensajes */}
      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Estado</h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <pre className="text-sm whitespace-pre-wrap">
            {loading ? 'Procesando...' : message || 'Listo para agregar empresas'}
          </pre>
        </div>
      </Card>

      {/* Código de ejemplo */}
      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Código de Ejemplo</h2>
        <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
{`// Importar el servicio
import { CompanyService } from '@/services/companyService';
import { CompanyDocument } from '@/types';

// Crear los datos de la empresa
const companyData: Omit<CompanyDocument, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'Mi Empresa',
  slug: 'mi-empresa',
  logo: 'https://ejemplo.com/logo.png',
  industry: 'Tecnología',
  location: {
    country: 'Argentina',
    state: 'Buenos Aires'
  },
  website: 'https://miempresa.com',
  rating: 0,
  reviewsCount: 0,
  benefits: ['Trabajo remoto', 'Seguro médico'],
  workEnvironment: {
    workLifeBalance: 0,
    careerOpportunities: 0,
    compensation: 0,
    culture: 0,
    management: 0
  },
  href: '/company/mi-empresa',
  isVerified: false,
  status: 'pending',
  submittedBy: 'user-id'
};

// Agregar la empresa
try {
  const companyId = await CompanyService.addCompany(companyData);
  console.log('Empresa agregada con ID:', companyId);
} catch (error) {
  console.error('Error:', error);
}`}
          </pre>
        </div>
      </Card>
    </div>
  );
}
