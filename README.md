# WorkWisse - Plataforma de Reseñas de Empresas

![WorkWisse Logo](public/images/workwisse-logo.png)

**WorkWisse** es una plataforma innovadora que permite a los trabajadores compartir sus experiencias laborales reales para ayudar a otros a tomar decisiones informadas sobre dónde trabajar. Descubre la verdad sobre tu próximo trabajo antes de postularte.

## 🚀 Características Principales

- **📝 Reseñas Verificadas**: Opiniones auténticas de empleados que realmente trabajaron en las empresas
- **💰 Información Salarial**: Datos reales sobre salarios y beneficios
- **🏢 Ambiente Laboral**: Insights sobre cultura empresarial y ambiente de trabajo
- **🔍 Búsqueda Avanzada**: Encuentra empresas por nombre, industria o ubicación
- **⭐ Sistema de Calificaciones**: Rankings honestos basados en experiencias reales
- **🌐 Multiidioma**: Soporte para español, inglés y portugués
- **📱 Responsive**: Optimizado para dispositivos móviles y desktop
- **🔒 Privacidad**: Reseñas 100% anónimas para proteger a los usuarios

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [Next.js 14](https://nextjs.org/) (Pages Router)
- **UI Framework**: [HeroUI v2](https://heroui.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **Internationalization**: [react-i18next](https://react.i18next.com/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **SEO**: Optimizado con metadatos dinámicos y datos estructurados

## 📦 Instalación

### Prerrequisitos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun
- Cuenta de Firebase (para base de datos y autenticación)

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/workwisse.git
cd workwisse
```

### Instalar dependencias

```bash
# Con npm
npm install

# Con yarn
yarn install

# Con pnpm
pnpm install

# Con bun
bun install
```

### Configuración de pnpm (opcional)

Si usas `pnpm`, agrega esto a tu archivo `.npmrc`:

```bash
public-hoist-pattern[]=*@heroui/*
```

Luego ejecuta `pnpm install` nuevamente.

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Configuration (opcional)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=tu_email@gmail.com
EMAIL_SERVER_PASSWORD=tu_password
EMAIL_FROM=noreply@workwisse.com
```

### Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Firestore Database
3. Configura las reglas de seguridad de Firestore
4. Habilita Authentication (opcional)
5. Copia las credenciales a tu archivo `.env.local`

Para más detalles, consulta [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

## 🚀 Desarrollo

### Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint

# Verificación de tipos
npm run type-check

# Formateo de código
npm run format
```

## 📁 Estructura del Proyecto

```
workwisse/
├── components/          # Componentes globales
├── config/             # Configuraciones (Firebase, i18n, etc.)
├── hooks/              # Custom hooks
├── layouts/            # Layouts de página
├── locales/            # Archivos de traducción
├── modules/            # Módulos organizados por funcionalidad
│   ├── about/          # Página "Acerca de"
│   ├── company/        # Gestión de empresas
│   ├── contact/        # Página de contacto
│   ├── core/           # Componentes y utilidades core
│   ├── landing/        # Página principal
│   └── terms/          # Términos y condiciones
├── pages/              # Páginas de Next.js
├── public/             # Archivos estáticos
├── services/           # Servicios de API
├── styles/             # Estilos globales
└── types/              # Definiciones de TypeScript
```

## 🌐 Funcionalidades

### Para Usuarios
- Buscar empresas por nombre o industria
- Leer reseñas verificadas de empleados
- Ver información salarial y de beneficios
- Conocer el ambiente laboral real
- Comparar diferentes empresas

### Para Empleados
- Escribir reseñas anónimas sobre sus empleadores
- Compartir información salarial
- Evaluar diferentes aspectos del trabajo
- Ayudar a otros trabajadores

### Para Empresas
- Ver feedback de sus empleados
- Mejorar basándose en las opiniones
- Atraer mejor talento con transparencia

## 🔧 Personalización

### Temas
La aplicación soporta modo claro y oscuro automáticamente. Puedes personalizar los colores en `tailwind.config.js`.

### Idiomas
Para agregar un nuevo idioma:
1. Crea un archivo JSON en `locales/`
2. Agrega las traducciones
3. Actualiza la configuración en `config/i18n.ts`

## 📈 SEO y Performance

- ✅ Metadatos dinámicos optimizados
- ✅ Datos estructurados (JSON-LD)
- ✅ Sitemap XML automático
- ✅ Robots.txt configurado
- ✅ PWA ready con manifest
- ✅ Optimización de imágenes
- ✅ Lazy loading
- ✅ Core Web Vitals optimizados

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código existentes
- Escribe tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Usa commits descriptivos

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- **Website**: [https://workwisse.com](https://workwisse.com)
- **Email**: contacto@workwisse.com
- **Twitter**: [@workwisse](https://twitter.com/workwisse)

## 🙏 Agradecimientos

- [HeroUI](https://heroui.com) por el excelente framework de UI
- [Next.js](https://nextjs.org) por el framework de React
- [Firebase](https://firebase.google.com) por los servicios de backend
- Todos los contribuidores que hacen posible este proyecto

---

**¿Listo para conocer la verdad sobre tu próximo trabajo?** 🚀

[Visita WorkWisse](https://workwisse.com) | [Documentación](docs/) | [API](docs/api.md)
