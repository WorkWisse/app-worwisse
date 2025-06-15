// Ejemplo de cómo usar el hook useAddCompanyForm en tu componente AddCompanyForm.tsx

// 1. Importar el hook
import { useAddCompanyForm } from '@/hooks/useCompanyService';

// 2. En tu componente, reemplazar el estado isSubmitting y la función handleSubmit:

export default function AddCompanyForm() {
  const { t } = useTranslation();
  
  // Tu estado existente del formulario
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    country: "",
    state: "",
    website: "",
    benefits: [] as string[],
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [benefitsInput, setBenefitsInput] = useState("");
  const [showBenefitsSuggestions, setShowBenefitsSuggestions] = useState(false);

  // CAMBIO: Usar el hook en lugar de isSubmitting
  const { 
    submitCompanyForm, 
    loading: isSubmitting, 
    error, 
    success, 
    clearError, 
    clearSuccess 
  } = useAddCompanyForm();

  // Tu configuración existente (industries, countries, etc.)
  const industries = [
    // ... tu array existente
  ];
  const countries = [
    // ... tu array existente  
  ];
  const currentRegions = formData.country
    ? countryRegions[formData.country as keyof typeof countryRegions] || []
    : [];

  // CAMBIO: Nueva función handleSubmit más simple
  const handleSubmit = async () => {
    if (!acceptedTerms) {
      alert(t("addCompany.form.acceptTermsRequired"));
      return;
    }

    // Limpiar errores previos
    clearError();
    clearSuccess();

    try {
      const companyId = await submitCompanyForm(formData, {
        industries,
        countries,
        currentRegions,
        userId: 'anonymous' // O el ID del usuario logueado
      });

      if (companyId) {
        alert(`${t("addCompany.form.submitSuccess")} ID: ${companyId}`);
        
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
      }
    } catch (error) {
      // El error ya está manejado por el hook
      alert(t("addCompany.form.submitError"));
    }
  };

  // OPCIONAL: Mostrar errores de manera más elegante
  const handleSubmitWithBetterErrorHandling = async () => {
    if (!acceptedTerms) {
      alert(t("addCompany.form.acceptTermsRequired"));
      return;
    }

    clearError();
    clearSuccess();

    const companyId = await submitCompanyForm(formData, {
      industries,
      countries,
      currentRegions,
      userId: 'anonymous'
    });

    if (success && companyId) {
      // Éxito
      alert(`${t("addCompany.form.submitSuccess")} ID: ${companyId}`);
      
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
      
    } else if (error) {
      // Error específico
      let errorMessage = t("addCompany.form.submitError");
      
      if (error.includes('permission-denied')) {
        errorMessage = 'No tienes permisos para agregar empresas';
      } else if (error.includes('network')) {
        errorMessage = 'Error de conexión. Verifica tu internet';
      }
      
      alert(errorMessage);
    }
  };

  // Tu JSX existente, solo cambiar onPress del botón:
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
      {/* ... tu JSX existente ... */}
      
      {/* CAMBIO: Solo en el botón de submit */}
      <Button
        color="primary"
        size="lg"
        className="w-full bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-500 dark:to-blue-500 hover:from-sky-700 hover:to-blue-700 dark:hover:from-sky-600 dark:hover:to-blue-600 text-white font-semibold text-sm h-11 transition-all duration-200"
        onPress={handleSubmit} // O handleSubmitWithBetterErrorHandling
        isLoading={isSubmitting}
        isDisabled={!acceptedTerms}
      >
        {isSubmitting
          ? t("addCompany.form.submitting")
          : t("addCompany.form.submit")}
      </Button>

      {/* OPCIONAL: Mostrar error en la UI */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm">{error}</p>
          <button 
            onClick={clearError}
            className="text-xs underline mt-2"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* OPCIONAL: Mostrar éxito en la UI */}
      {success && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <p className="text-sm">¡Empresa agregada exitosamente!</p>
          <button 
            onClick={clearSuccess}
            className="text-xs underline mt-2"
          >
            Cerrar
          </button>
        </div>
      )}
      
      {/* ... resto de tu JSX ... */}
    </div>
  );
}
