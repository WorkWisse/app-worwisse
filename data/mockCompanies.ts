import { Company, Review } from '../types';

export const mockCompanies: Company[] = [
  {
    id: "tech-solutions-inc",
    name: "Tech Solutions Inc.",
    slug: "tech-solutions-inc",
    logo: "https://picsum.photos/seed/tsicon/200/200",
    industry: "Tecnología",
    location: {
      country: "Argentina",
      state: "Buenos Aires",
      city: "Ciudad Autónoma de Buenos Aires"
    },
    website: "https://techsolutions.com",
    founded: 2015,
    employees: "500-1000",
    description: "Somos una empresa líder en desarrollo de software y soluciones tecnológicas. Nos especializamos en crear productos innovadores que transforman la forma en que las empresas operan y se conectan con sus clientes.",
    rating: 4.8,
    reviewsCount: 152,
    salaryRange: {
      min: 150000,
      max: 300000,
      currency: "ARS"
    },
    benefits: [
      "Trabajo remoto",
      "Horarios flexibles",
      "Seguro médico",
      "Capacitaciones",
      "Gimnasio",
      "Vacaciones pagadas",
      "Bonos anuales",
      "Seguro dental"
    ],
    workEnvironment: {
      workLifeBalance: 4.7,
      careerOpportunities: 4.8,
      compensation: 4.6,
      culture: 4.9,
      management: 4.7
    },
    href: "/company/tech-solutions-inc"
  },
  {
    id: "innovate-hub",
    name: "Innovate Hub",
    slug: "innovate-hub",
    logo: "https://picsum.photos/seed/ihicon/200/200",
    industry: "Software Development",
    location: {
      country: "Brasil",
      state: "São Paulo",
      city: "São Paulo"
    },
    website: "https://innovatehub.com.br",
    founded: 2018,
    employees: "200-500",
    description: "Hub de innovación que conecta startups con grandes empresas para crear soluciones disruptivas. Nuestro objetivo es acelerar la transformación digital en América Latina.",
    rating: 4.7,
    reviewsCount: 98,
    salaryRange: {
      min: 8000,
      max: 18000,
      currency: "BRL"
    },
    benefits: [
      "Trabajo desde casa",
      "Vale alimentación",
      "Plano de saúde",
      "Day off en el cumpleaños",
      "Eventos de equipo",
      "Capacitación internacional",
      "Stock options"
    ],
    workEnvironment: {
      workLifeBalance: 4.8,
      careerOpportunities: 4.6,
      compensation: 4.5,
      culture: 4.8,
      management: 4.7
    },
    href: "/company/innovate-hub"
  },
  {
    id: "greentech-global",
    name: "GreenTech Global",
    slug: "greentech-global",
    logo: "https://picsum.photos/seed/gtgicon/200/200",
    industry: "Energías Renovables",
    location: {
      country: "Chile",
      state: "Región Metropolitana",
      city: "Santiago"
    },
    website: "https://greentech.cl",
    founded: 2012,
    employees: "100-200",
    description: "Empresa pionera en soluciones de energía renovable en América Latina. Desarrollamos proyectos solares y eólicos que contribuyen a un futuro más sostenible.",
    rating: 4.6,
    reviewsCount: 75,
    salaryRange: {
      min: 1200000,
      max: 2500000,
      currency: "CLP"
    },
    benefits: [
      "Seguro de salud",
      "Transporte subsidiado",
      "Almuerzo gratis",
      "Vacaciones adicionales",
      "Capacitaciones en sustentabilidad",
      "Bicicleta corporativa",
      "Trabajo híbrido"
    ],
    workEnvironment: {
      workLifeBalance: 4.5,
      careerOpportunities: 4.4,
      compensation: 4.3,
      culture: 4.8,
      management: 4.6
    },
    href: "/company/greentech-global"
  },
  {
    id: "nextgen-dynamics",
    name: "NextGen Dynamics",
    slug: "nextgen-dynamics",
    logo: "https://picsum.photos/seed/ngdicon/200/200",
    industry: "Fintech",
    location: {
      country: "México",
      state: "Ciudad de México",
      city: "Ciudad de México"
    },
    website: "https://nextgendynamics.mx",
    founded: 2019,
    employees: "300-500",
    description: "Fintech mexicana que revoluciona los servicios financieros con tecnología de vanguardia. Ofrecemos soluciones de pagos digitales, préstamos y gestión financiera.",
    rating: 4.5,
    reviewsCount: 110,
    salaryRange: {
      min: 25000,
      max: 55000,
      currency: "MXN"
    },
    benefits: [
      "Seguro de gastos médicos mayores",
      "Vales de despensa",
      "Trabajo remoto",
      "Días de maternidad/paternidad extendidos",
      "Capacitación en fintech",
      "Bono de productividad",
      "Gimnasio"
    ],
    workEnvironment: {
      workLifeBalance: 4.3,
      careerOpportunities: 4.7,
      compensation: 4.6,
      culture: 4.4,
      management: 4.5
    },
    href: "/company/nextgen-dynamics"
  },
  {
    id: "quantumleap-ai",
    name: "QuantumLeap AI",
    slug: "quantumleap-ai",
    logo: "https://picsum.photos/seed/qlaicon/200/200",
    industry: "Inteligencia Artificial",
    location: {
      country: "Colombia",
      state: "Bogotá D.C.",
      city: "Bogotá"
    },
    website: "https://quantumleap.co",
    founded: 2020,
    employees: "50-100",
    description: "Startup especializada en soluciones de inteligencia artificial y machine learning para empresas latinoamericanas. Creamos productos que optimizan procesos y mejoran la toma de decisiones.",
    rating: 4.5,
    reviewsCount: 60,
    salaryRange: {
      min: 4000000,
      max: 8000000,
      currency: "COP"
    },
    benefits: [
      "EPS premium",
      "Auxilio de transporte",
      "Trabajo remoto",
      "Conferencias técnicas",
      "Equipos de alta gama",
      "Horario flexible",
      "Bonificaciones por proyectos"
    ],
    workEnvironment: {
      workLifeBalance: 4.6,
      careerOpportunities: 4.8,
      compensation: 4.2,
      culture: 4.7,
      management: 4.4
    },
    href: "/company/quantumleap-ai"
  },
  {
    id: "alpha-corp",
    name: "Alpha Corp",
    slug: "alpha-corp",
    logo: "https://picsum.photos/seed/acicon/200/200",
    industry: "Software Development",
    location: {
      country: "Uruguay",
      state: "Montevideo",
      city: "Montevideo"
    },
    website: "https://alphacorp.uy",
    founded: 2014,
    employees: "150-300",
    description: "Empresa de desarrollo de software con más de 10 años de experiencia. Nos especializamos en soluciones empresariales y aplicaciones móviles para el mercado regional.",
    rating: 4.2,
    reviewsCount: 87,
    salaryRange: {
      min: 45000,
      max: 85000,
      currency: "UYU"
    },
    benefits: [
      "Seguro de salud",
      "Tickets de alimentación",
      "Capacitaciones técnicas",
      "Home office",
      "Día libre en cumpleaños",
      "Aguinaldo",
      "Licencia por estudio"
    ],
    workEnvironment: {
      workLifeBalance: 4.1,
      careerOpportunities: 4.3,
      compensation: 4.0,
      culture: 4.4,
      management: 4.2
    },
    href: "/company/alpha-corp"
  },
  {
    id: "beta-solutions",
    name: "Beta Solutions",
    slug: "beta-solutions",
    logo: "https://picsum.photos/seed/bsicon/200/200",
    industry: "Fintech",
    location: {
      country: "Perú",
      state: "Lima",
      city: "Lima"
    },
    website: "https://betasolutions.pe",
    founded: 2017,
    employees: "100-200",
    description: "Fintech peruana enfocada en democratizar el acceso a servicios financieros. Desarrollamos productos innovadores para la inclusión financiera en Latinoamérica.",
    rating: 4.4,
    reviewsCount: 93,
    salaryRange: {
      min: 3500,
      max: 7000,
      currency: "PEN"
    },
    benefits: [
      "EsSalud",
      "Bonificación por performance",
      "Trabajo remoto",
      "Capacitaciones en fintech",
      "Seguro oncológico",
      "Movilidad",
      "Refrigerios"
    ],
    workEnvironment: {
      workLifeBalance: 4.3,
      careerOpportunities: 4.5,
      compensation: 4.1,
      culture: 4.6,
      management: 4.3
    },
    href: "/company/beta-solutions"
  },
  {
    id: "gamma-creative",
    name: "Gamma Creative",
    slug: "gamma-creative",
    logo: "https://picsum.photos/seed/gcicon/200/200",
    industry: "Agencia Digital",
    location: {
      country: "Argentina",
      state: "Córdoba",
      city: "Córdoba"
    },
    website: "https://gammacreative.com.ar",
    founded: 2016,
    employees: "50-100",
    description: "Agencia digital creativa especializada en branding, diseño web y marketing digital. Trabajamos con marcas líderes en Argentina y la región.",
    rating: 3.8,
    reviewsCount: 45,
    salaryRange: {
      min: 120000,
      max: 220000,
      currency: "ARS"
    },
    benefits: [
      "Obra social",
      "Capacitaciones en design thinking",
      "Ambiente creativo",
      "Flexibilidad horaria",
      "Coffee premium",
      "Descuentos en cursos",
      "Eventos de networking"
    ],
    workEnvironment: {
      workLifeBalance: 3.6,
      careerOpportunities: 4.0,
      compensation: 3.5,
      culture: 4.2,
      management: 3.7
    },
    href: "/company/gamma-creative"
  }
];

export const mockReviews: Review[] = [
  {
    id: "review-1",
    companyId: "tech-solutions-inc",
    rating: 5,
    role: "Senior Developer",
    department: "Desarrollo",
    employmentType: "full-time",
    timeWorked: "2 años",
    timeAgo: "Hace 3 días",
    pros: "Excelente ambiente laboral, proyectos desafiantes y oportunidades de crecimiento. El equipo es muy colaborativo y siempre dispuesto a ayudar. Las tecnologías que utilizamos están a la vanguardia.",
    cons: "A veces hay picos de trabajo intenso que requieren horas extra. El proceso de revisión de código puede ser muy estricto para algunos desarrolladores junior.",
    advice: "Si buscas un lugar donde crecer profesionalmente y trabajar en proyectos innovadores, esta es una excelente opción. Prepárate para aprender mucho.",
    wouldRecommend: true,
    isAnonymous: true,
    isVerified: true
  },
  {
    id: "review-2",
    companyId: "tech-solutions-inc",
    rating: 4,
    role: "Product Manager",
    department: "Producto",
    employmentType: "full-time",
    timeWorked: "1 año y 6 meses",
    timeAgo: "Hace 1 semana",
    pros: "Cultura muy orientada al producto y al usuario. Libertad para proponer nuevas ideas y experimentar. Buenos beneficios y compensación competitiva.",
    cons: "La comunicación entre equipos podría mejorar. Algunas veces los timelines son muy agresivos y generan estrés.",
    advice: "Ideal para PMs que quieren tener impacto real en el producto. La empresa valora mucho la iniciativa y la proactividad.",
    wouldRecommend: true,
    isAnonymous: true,
    isVerified: true
  },
  {
    id: "review-3",
    companyId: "innovate-hub",
    rating: 5,
    role: "UX Designer",
    department: "Diseño",
    employmentType: "full-time",
    timeWorked: "8 meses",
    timeAgo: "Hace 5 días",
    pros: "Ambiente súper creativo y colaborativo. Muchas oportunidades para participar en conferencias y eventos. El equipo de diseño es increíble.",
    cons: "Por ser una empresa en crecimiento, a veces los procesos no están del todo definidos. Puede generar algo de incertidumbre.",
    advice: "Perfecto para diseñadores que quieren estar en una empresa innovadora y en crecimiento. Prepárate para adaptarte rápido a los cambios.",
    wouldRecommend: true,
    isAnonymous: true,
    isVerified: true
  },
  {
    id: "review-4",
    companyId: "greentech-global",
    rating: 4,
    role: "Ingeniero de Proyectos",
    department: "Ingeniería",
    employmentType: "full-time",
    timeWorked: "3 años",
    timeAgo: "Hace 2 semanas",
    pros: "Trabajar en proyectos que realmente impactan el medio ambiente es muy gratificante. Buen ambiente laboral y compañeros comprometidos con la sustentabilidad.",
    cons: "Los salarios podrían ser más competitivos comparado con otras industrias. Algunos proyectos dependen mucho de regulaciones gubernamentales.",
    advice: "Si te interesa contribuir a un mundo más sostenible y no te importa que el crecimiento salarial sea gradual, es una excelente opción.",
    wouldRecommend: true,
    isAnonymous: true,
    isVerified: true
  },
  {
    id: "review-5",
    companyId: "nextgen-dynamics",
    rating: 4,
    role: "Data Scientist",
    department: "Data",
    employmentType: "full-time",
    timeWorked: "1 año",
    timeAgo: "Hace 4 días",
    pros: "Acceso a grandes volúmenes de datos financieros muy interesantes. Equipo técnico muy fuerte y oportunidades de aprender sobre fintech.",
    cons: "La presión por resultados puede ser alta, especialmente en épocas de cierre. Algunas herramientas de data science podrían ser más modernas.",
    advice: "Ideal para data scientists que quieren aplicar ML en fintech. Asegúrate de estar cómodo con el ritmo acelerado del sector financiero.",
    wouldRecommend: true,
    isAnonymous: true,
    isVerified: true
  },
  {
    id: "review-6",
    companyId: "quantumleap-ai",
    rating: 5,
    role: "Machine Learning Engineer",
    department: "AI/ML",
    employmentType: "full-time",
    timeWorked: "10 meses",
    timeAgo: "Hace 1 semana",
    pros: "Estar en la vanguardia de la IA en Latinoamérica. Proyectos súper desafiantes y equipo muy talentoso. Libertad para experimentar con nuevas tecnologías.",
    cons: "Por ser startup, a veces hay incertidumbre sobre el futuro de algunos proyectos. Los beneficios podrían ser mejores.",
    advice: "Perfecto para ingenieros que quieren especializarse en IA/ML. La curva de aprendizaje es empinada pero muy gratificante.",
    wouldRecommend: true,
    isAnonymous: true,
    isVerified: true
  },
  {
    id: "review-7",
    companyId: "alpha-corp",
    rating: 3,
    role: "QA Tester",
    department: "Calidad",
    employmentType: "full-time",
    timeWorked: "1 año y 3 meses",
    timeAgo: "Hace 6 días",
    pros: "Buen ambiente entre compañeros y horarios respetables. Oportunidades para aprender sobre diferentes tipos de testing.",
    cons: "Las herramientas de testing podrían ser más modernas. Poca comunicación entre el equipo de desarrollo y QA.",
    advice: "Buen lugar para empezar en QA, pero si buscas crecer rápido, podrías necesitar buscar otras oportunidades después de un tiempo.",
    wouldRecommend: false,
    isAnonymous: true,
    isVerified: true
  },
  {
    id: "review-8",
    companyId: "beta-solutions",
    rating: 4,
    role: "Backend Developer",
    department: "Desarrollo",
    employmentType: "full-time",
    timeWorked: "2 años",
    timeAgo: "Hace 3 semanas",
    pros: "Proyectos interesantes en el sector fintech. Buen balance vida-trabajo y equipo técnico sólido. Oportunidades de crecimiento profesional.",
    cons: "La infraestructura tecnológica a veces presenta desafíos. Los procesos de deployment podrían ser más ágiles.",
    advice: "Buena opción para desarrolladores backend que quieren experiencia en fintech. El equipo es muy colaborativo y dispuesto a enseñar.",
    wouldRecommend: true,
    isAnonymous: true,
    isVerified: true
  },
  {
    id: "review-9",
    companyId: "gamma-creative",
    rating: 3,
    role: "Diseñador Gráfico Jr.",
    department: "Diseño",
    employmentType: "full-time",
    timeWorked: "6 meses",
    timeAgo: "Hace 2 semanas",
    pros: "Se aprende mucho y rápido. Los proyectos son variados y para clientes importantes. Ambiente creativo y dinámico.",
    cons: "Mucha presión y horas extra no siempre compensadas. Alta rotación de personal en algunos equipos. Salarios por debajo del mercado.",
    advice: "Puede ser un buen lugar para ganar experiencia inicial, pero asegúrate de negociar bien las condiciones desde el inicio.",
    wouldRecommend: false,
    isAnonymous: true,
    isVerified: true
  },
  {
    id: "review-10",
    companyId: "gamma-creative",
    rating: 4,
    role: "Art Director",
    department: "Diseño",
    employmentType: "full-time",
    timeWorked: "2 años y 6 meses",
    timeAgo: "Hace 1 mes",
    pros: "Oportunidad de liderar proyectos creativos importantes. Clientes de renombre y proyectos que realmente desafían la creatividad.",
    cons: "La gestión del tiempo y los proyectos podría mejorar. A veces se solapan demasiados proyectos urgentes.",
    advice: "Si tienes experiencia y puedes manejar la presión, es un lugar donde realmente puedes desarrollar tu portfolio creativo.",
    wouldRecommend: true,
    isAnonymous: true,
    isVerified: true
  }
];

// Helper functions
export const getCompanyById = (id: string): Company | undefined => {
  return mockCompanies.find(company => company.id === id || company.slug === id);
};

export const getCompanyReviews = (companyId: string): Review[] => {
  return mockReviews.filter(review => review.companyId === companyId);
};

export const getTopCompanies = (limit: number = 5): Company[] => {
  return mockCompanies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getCompaniesByIndustry = (industry: string): Company[] => {
  return mockCompanies.filter(company => 
    company.industry.toLowerCase().includes(industry.toLowerCase())
  );
};
