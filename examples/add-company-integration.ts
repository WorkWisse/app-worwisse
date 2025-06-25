// Ejemplo de cómo usar CompanyService.addCompany en tu formulario actual

// 1. Importar el servicio y los tipos (ya lo tienes)
import { CompanyService } from '@/services/companyService';
import { CompanyDocument } from '@/types';

// 2. Función helper para generar slug
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
};

// 3. Mapear los keys de tu formulario a los labels
const getIndustryLabel = (key: string, industries: any[]): string => {
  return industries.find(i => i.key === key)?.label || key;
};

const getCountryLabel = (key: string, countries: any[]): string => {
  return countries.find(c => c.key === key)?.label || key;
};

const getStateLabel = (key: string, regions: any[]): string => {
  return regions.find(r => r.key === key)?.label || key;
};

// 4. Tu función handleSubmit actualizada
const handleSubmit = async () => {
  if (!acceptedTerms) {
    alert(t("addCompany.form.acceptTermsRequired"));
    return;
  }

  setIsSubmitting(true);
  
  try {
    // Generar slug único
    const slug = generateSlug(formData.name);
    
    // Obtener labels para mostrar
    const industryLabel = getIndustryLabel(formData.industry, industries);
    const countryLabel = getCountryLabel(formData.country, countries);
    const stateLabel = getStateLabel(formData.state, currentRegions);

    // Crear objeto para Firebase
    const companyData: Omit<CompanyDocument, 'id' | 'createdAt' | 'updatedAt'> = {
      name: formData.name.trim(),
      slug: slug,
      logo: `https://picsum.photos/seed/${slug}/200/200`, // Logo temporal
      industry: industryLabel,
      location: {
        country: countryLabel,
        state: stateLabel,
        city: undefined // Puedes agregarlo si necesitas
      },
      website: formData.website?.trim() || undefined,
      founded: undefined, // Puedes agregar este campo al formulario
      employees: undefined, // Puedes agregar este campo al formulario
      description: \`Empresa de \${industryLabel} ubicada en \${stateLabel}, \${countryLabel}.\`, // Descripción básica
      rating: 0, // Se calculará con las reseñas
      reviewsCount: 0, // Se actualizará automáticamente
      salaryRange: undefined, // Puedes agregarlo si lo necesitas
      benefits: [...formData.benefits], // Copia del array
      workEnvironment: {
        workLifeBalance: 0,
        careerOpportunities: 0,
        compensation: 0,
        culture: 0,
        management: 0
      }, // Se calculará con las reseñas
      href: \`/company/\${slug}\`,
      // Campos específicos de Firebase
      isVerified: false, // Empresas nuevas no están verificadas
      status: 'pending', // Necesitan aprobación de admin
      submittedBy: 'anonymous' // O userId si tienes autenticación
    };

    // Guardar en Firebase
    const companyId = await CompanyService.addCompany(companyData);
    
    console.log('✅ Empresa guardada exitosamente:', {
      id: companyId,
      name: formData.name,
      slug: slug
    });

    // Mostrar mensaje de éxito
    alert(\`\${t("addCompany.form.submitSuccess")} ID: \${companyId}\`);
    
    // Limpiar formulario
    setFormData({
      name: "",
      industry: "",
      country: "",
      state: "",
      website: "",
      benefits: [],
    });
    setAcceptedTerms(false);
    setBenefitsInput("");
    
    // Opcional: Redirigir a la página de la empresa
    // router.push(\`/company/\${slug}\`);
    
  } catch (error) {
    console.error('❌ Error al guardar empresa:', error);
    
    // Manejar diferentes tipos de error
    let errorMessage = t("addCompany.form.submitError");
    
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        errorMessage = 'No tienes permisos para agregar empresas';
      } else if (error.message.includes('network')) {
        errorMessage = 'Error de conexión. Verifica tu internet';
      } else if (error.message.includes('already exists')) {
        errorMessage = 'Ya existe una empresa con ese nombre';
      }
    }
    
    alert(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

// 5. Ejemplo de validación adicional antes de enviar
const validateFormData = () => {
  const errors = [];
  
  if (!formData.name.trim()) {
    errors.push('El nombre de la empresa es requerido');
  }
  
  if (formData.name.length < 3) {
    errors.push('El nombre debe tener al menos 3 caracteres');
  }
  
  if (!formData.industry) {
    errors.push('La industria es requerida');
  }
  
  if (!formData.country) {
    errors.push('El país es requerido');
  }
  
  if (!formData.state) {
    errors.push('El estado/provincia es requerido');
  }
  
  if (formData.website && !isValidUrl(formData.website)) {
    errors.push('La URL del sitio web no es válida');
  }
  
  return errors;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// 6. Versión mejorada del handleSubmit con validación
const handleSubmitWithValidation = async () => {
  // Validar términos
  if (!acceptedTerms) {
    alert(t("addCompany.form.acceptTermsRequired"));
    return;
  }

  // Validar datos del formulario
  const validationErrors = validateFormData();
  if (validationErrors.length > 0) {
    alert(\`Errores en el formulario:\\n\${validationErrors.join('\\n')}\`);
    return;
  }

  setIsSubmitting(true);
  
  try {
    // ... resto del código igual que arriba
    
  } catch (error) {
    // ... manejo de errores igual que arriba
  } finally {
    setIsSubmitting(false);
  }
};

export { handleSubmit, handleSubmitWithValidation, validateFormData };
