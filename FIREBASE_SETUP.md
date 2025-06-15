# Firebase Setup Guide

## 1. Crear un proyecto de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Add project" (Agregar proyecto)
3. Sigue los pasos del asistente:
   - Nombre del proyecto: `workwisse-app` (o el nombre que prefieras)
   - Habilita Google Analytics si deseas (opcional)
   - Selecciona tu cuenta de Google Analytics

## 2. Configurar Firebase para aplicación web

1. En el dashboard de tu proyecto, haz clic en el ícono web `</>`
2. Registra tu app:
   - App nickname: `WorkWisse Web App`
   - ✅ Setup Firebase Hosting (opcional)
3. Copia la configuración que te proporciona Firebase

## 3. Configurar variables de entorno

1. Copia las credenciales de Firebase de la consola
2. Reemplaza los valores en tu archivo `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123DEF (opcional)
```

## 4. Configurar Firestore Database

1. En Firebase Console, ve a "Firestore Database"
2. Haz clic en "Create database"
3. Selecciona modo de inicio:
   - **Test mode** (para desarrollo): permite lectura/escritura por 30 días
   - **Production mode**: requiere reglas de seguridad
4. Selecciona la ubicación del servidor (recomendado: South America)

## 5. Configurar reglas de seguridad de Firestore

Ve a "Firestore Database" > "Rules" y usa estas reglas básicas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Companies - read for all, write only for authenticated users
    match /companies/{companyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Reviews - read approved reviews, write for authenticated users
    match /reviews/{reviewId} {
      allow read: if resource.data.status == 'approved' || request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Users - only owners can access their data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 6. Configurar Authentication (opcional)

Si planeas usar autenticación:

1. Ve a "Authentication" > "Get started"
2. En la pestaña "Sign-in method", habilita los métodos que necesites:
   - Email/Password
   - Google
   - Anonymous (para reseñas anónimas)

## 7. Migrar datos existentes

Una vez configurado Firebase, puedes migrar tus datos mock:

```typescript
import { MigrationService } from '@/services/migrationService';

// Test Firebase connection
await MigrationService.testFirebaseConnection();

// Migrate mock companies (solo una vez)
await MigrationService.migrateCompanies();
```

## 8. Usar los servicios

```typescript
import { CompanyService } from '@/services/companyService';
import { ReviewService } from '@/services/reviewService';

// Get companies
const companies = await CompanyService.getCompanies();

// Get company by slug
const company = await CompanyService.getCompanyBySlug('tech-solutions-inc');

// Get company reviews
const reviews = await ReviewService.getCompanyReviews(companyId);

// Add new review
const reviewId = await ReviewService.addReview({
  companyId: 'company-id',
  rating: 5,
  role: 'Developer',
  pros: 'Great work environment',
  cons: 'Could improve benefits',
  wouldRecommend: true,
  isAnonymous: true
});
```

## 9. Hooks personalizados

Usa el hook `useFirestore` para operaciones simples:

```typescript
import { useFirestore } from '@/hooks/useFirestore';

function CompanyList() {
  const { getDocuments, loading, error } = useFirestore('companies');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await getDocuments();
      setCompanies(data);
    } catch (err) {
      console.error('Error loading companies:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {companies.map(company => (
        <div key={company.id}>{company.name}</div>
      ))}
    </div>
  );
}
```

## 10. Consideraciones de producción

### Seguridad
- Revisa y ajusta las reglas de Firestore antes de producción
- Usa Firebase Security Rules para proteger datos sensibles
- Implementa validación tanto en cliente como servidor

### Performance
- Usa índices compuestos para consultas complejas
- Implementa paginación para listas grandes
- Considera usar Firebase Storage para imágenes

### Monitoreo
- Habilita Firebase Performance Monitoring
- Configura alertas para errores y uso excesivo

### Costos
- Revisa el pricing de Firestore
- Optimiza consultas para reducir lecturas
- Considera usar Firebase Analytics para entender el uso

## Estructura de datos recomendada

```
/companies/{companyId}
  - name: string
  - slug: string
  - industry: string
  - location: object
  - rating: number
  - reviewsCount: number
  - status: 'pending' | 'approved' | 'rejected'
  - createdAt: timestamp
  - updatedAt: timestamp

/reviews/{reviewId}
  - companyId: string
  - rating: number
  - role: string
  - pros: string
  - cons: string
  - wouldRecommend: boolean
  - status: 'pending' | 'approved' | 'rejected'
  - createdAt: timestamp

/users/{userId}
  - email: string
  - displayName: string
  - createdAt: timestamp
```
