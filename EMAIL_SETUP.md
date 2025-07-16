# Configuración de Email para Formulario de Contacto

Para que el formulario de contacto funcione correctamente, necesitas configurar las variables de entorno de email.

## Configuración con Gmail

### 1. Habilitar Autenticación de 2 Factores
1. Ve a tu cuenta de Google
2. Seguridad → Verificación en 2 pasos
3. Actívala si no está habilitada

### 2. Crear Contraseña de Aplicación
1. En la misma sección de Seguridad
2. Busca "Contraseñas de aplicaciones"
3. Genera una nueva contraseña para "Correo"
4. Guarda esta contraseña (solo se muestra una vez)

### 3. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# Email Configuration
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_de_aplicacion_generada

# Firebase (si no las tienes ya)
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
# ... otras variables de Firebase
```

### 4. Verificar Configuración
- El email se enviará desde `EMAIL_USER` 
- Los mensajes llegaran a `wworkwisse@gmail.com`
- Los usuarios recibirán confirmación en pantalla

## Configuración Alternativa (otros proveedores)

Si no usas Gmail, puedes configurar otros proveedores SMTP editando `/pages/api/contact.ts`:

```typescript
const transporter = nodemailer.createTransporter({
  host: 'smtp.tu-proveedor.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Seguridad

- Nunca commitees el archivo `.env.local`
- Usa solo contraseñas de aplicación, no tu contraseña principal
- Mantén las credenciales seguras

## Testing

Para probar el formulario:
1. Asegúrate de que las variables estén configuradas
2. Inicia el servidor: `npm run dev`
3. Ve a `/contact` y envía un mensaje de prueba
4. Verifica que llegue el email a `wworkwisse@gmail.com`
