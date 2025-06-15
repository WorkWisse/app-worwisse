import { useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Card } from '@heroui/card';
import { Select, SelectItem } from '@heroui/select';
import { useAddCompanyForm } from '@/hooks/useCompanyService';

/**
 * Ejemplo simplificado de formulario usando el hook useAddCompanyForm
 */
export default function SimpleAddCompanyExample() {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    country: '',
    state: '',
    website: '',
    benefits: [] as string[]
  });

  const { 
    submitCompanyForm, 
    loading, 
    error, 
    success, 
    clearError, 
    clearSuccess 
  } = useAddCompanyForm();

  const industries = [
    { key: 'tech', label: 'Tecnología' },
    { key: 'finance', label: 'Finanzas' },
    { key: 'consulting', label: 'Consultoría' }
  ];

  const countries = [
    { key: 'ar', label: 'Argentina' },
    { key: 'br', label: 'Brasil' },
    { key: 'cl', label: 'Chile' }
  ];

  const currentRegions = [
    { key: 'caba', label: 'Ciudad Autónoma de Buenos Aires' },
    { key: 'buenos-aires', label: 'Buenos Aires' },
    { key: 'cordoba', label: 'Córdoba' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.name || !formData.industry || !formData.country || !formData.state) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    clearError();
    clearSuccess();

    const companyId = await submitCompanyForm(formData, {
      industries,
      countries,
      currentRegions,
      userId: 'demo-user'
    });

    if (companyId) {
      alert(`¡Empresa agregada exitosamente! ID: ${companyId}`);
      // Limpiar formulario
      setFormData({
        name: '',
        industry: '',
        country: '',
        state: '',
        website: '',
        benefits: []
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Agregar Empresa - Ejemplo Simple</h1>
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre de la empresa */}
          <Input
            label="Nombre de la empresa"
            placeholder="Ej: Mi Empresa SRL"
            value={formData.name}
            onValueChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
            isRequired
          />

          {/* Industria */}
          <Select
            label="Industria"
            placeholder="Selecciona una industria"
            selectedKeys={formData.industry ? [formData.industry] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              setFormData(prev => ({ ...prev, industry: selectedKey }));
            }}
            isRequired
          >
            {industries.map((industry) => (
              <SelectItem key={industry.key}>{industry.label}</SelectItem>
            ))}
          </Select>

          {/* País */}
          <Select
            label="País"
            placeholder="Selecciona un país"
            selectedKeys={formData.country ? [formData.country] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              setFormData(prev => ({ ...prev, country: selectedKey, state: '' }));
            }}
            isRequired
          >
            {countries.map((country) => (
              <SelectItem key={country.key}>{country.label}</SelectItem>
            ))}
          </Select>

          {/* Estado/Provincia */}
          <Select
            label="Estado/Provincia"
            placeholder="Selecciona un estado"
            selectedKeys={formData.state ? [formData.state] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              setFormData(prev => ({ ...prev, state: selectedKey }));
            }}
            isDisabled={!formData.country}
            isRequired
          >
            {currentRegions.map((region) => (
              <SelectItem key={region.key}>{region.label}</SelectItem>
            ))}
          </Select>

          {/* Website */}
          <Input
            label="Sitio web (opcional)"
            placeholder="https://miempresa.com"
            value={formData.website}
            onValueChange={(value) => setFormData(prev => ({ ...prev, website: value }))}
          />

          {/* Mostrar errores */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="text-sm">{error}</p>
              <button 
                type="button"
                onClick={clearError}
                className="text-xs underline mt-1"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Mostrar éxito */}
          {success && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              <p className="text-sm">¡Empresa agregada exitosamente!</p>
              <button 
                type="button"
                onClick={clearSuccess}
                className="text-xs underline mt-1"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Botón de envío */}
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
            isDisabled={loading}
          >
            {loading ? 'Agregando empresa...' : 'Agregar Empresa'}
          </Button>
        </form>
      </Card>

      {/* Información adicional */}
      <Card className="p-4 mt-6 bg-blue-50">
        <h3 className="font-semibold mb-2">ℹ️ Información:</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>• La empresa se guardará en Firebase con status "pending"</li>
          <li>• Se generará automáticamente un slug basado en el nombre</li>
          <li>• Los datos se pueden ver en Firebase Console</li>
          <li>• El rating inicial será 0 hasta que reciba reseñas</li>
        </ul>
      </Card>
    </div>
  );
}
