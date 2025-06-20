# Sistema de Gestión de Beneficios - Frontend

Sistema de gestión de beneficiarios para la comunidad Brisas del Orinoco II, desarrollado con React y Material-UI.

## 🚀 Características

- **Autenticación completa**: Login, registro, recuperación de contraseña y usuario
- **Gestión de beneficiarios**: CRUD completo con validaciones
- **Gestión de dependientes**: Administración de familiares de beneficiarios
- **Sistema de reportes**: Generación de reportes en PDF y Excel
- **Roles de usuario**: Líder de comunidad y Jefe de calle
- **Interfaz responsive**: Adaptada para dispositivos móviles y desktop
- **Tema personalizable**: Modo claro y oscuro
- **Notificaciones**: Sistema de alertas y mensajes

## 🛠️ Tecnologías

- **React 18** - Biblioteca de interfaz de usuario
- **Material-UI (MUI)** - Componentes de interfaz
- **React Router** - Navegación
- **Formik + Yup** - Manejo de formularios y validaciones
- **Axios** - Cliente HTTP
- **React Toastify** - Notificaciones
- **jsPDF + jsPDF-AutoTable** - Generación de PDFs
- **XLSX** - Exportación a Excel
- **Lucide React** - Iconos
- **Vite** - Herramienta de construcción

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Button.jsx
│   ├── InputField.jsx
│   ├── Modal.jsx
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   └── ...
├── pages/              # Páginas principales
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Users.jsx
│   ├── Settings.jsx
│   └── NotFound.jsx
├── layouts/            # Layouts de la aplicación
│   ├── AuthLayout.jsx
│   ├── DashboardLayout.jsx
│   └── DefaultLayout.jsx
├── services/           # Servicios de API
│   ├── api.js
│   ├── authService.js
│   ├── userService.js
│   └── ...
├── context/            # Contextos de React
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── SnackbarContext.jsx
├── hooks/              # Custom hooks
│   ├── useAuth.js
│   ├── useTheme.js
│   └── useFetch.js
├── styles/             # Archivos de estilos
│   ├── global.css
│   ├── theme.css
│   ├── variables.css
│   └── components/
├── utils/              # Utilidades
│   ├── formatDate.js
│   ├── validateForm.js
│   ├── constants.js
│   └── helpers.js
├── App.jsx             # Componente principal
├── main.jsx            # Punto de entrada
└── routes.jsx          # Configuración de rutas
```

## 🚀 Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env` con la configuración apropiada:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:3000
   VITE_APP_NAME=Sistema de Gestión de Beneficios
   VITE_APP_VERSION=1.0.0
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   ```

## 📋 Scripts Disponibles

- `npm run dev` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta el linter

## 🔐 Autenticación

El sistema maneja dos tipos de roles:

- **Líder de Comunidad (ID: 1)**: Acceso completo a todas las funcionalidades
- **Jefe de Calle (ID: 2)**: Acceso limitado a beneficiarios de su calle asignada

## 📊 Funcionalidades Principales

### Gestión de Beneficiarios
- Registro de nuevos beneficiarios
- Edición de información personal
- Visualización de detalles completos
- Activación/desactivación de beneficiarios
- Filtrado por calle (para jefes de calle)

### Gestión de Dependientes
- Registro de dependientes por beneficiario
- Edición y eliminación de dependientes
- Visualización de relaciones familiares

### Sistema de Reportes
- **Carga Familiar**: Reporte de beneficiarios y sus dependientes
- **Habitantes por Calle**: Listado de habitantes por calle
- **Rango de Edad**: Filtrado de personas por edad
- **Reporte de Ventas**: Para CLAP y Gas
- Exportación en PDF y Excel

### Configuración de Usuario
- Edición de perfil personal
- Cambio de contraseña
- Subida de foto de perfil
- Configuración de tema

## 🎨 Personalización de Tema

El sistema incluye un tema personalizable con:

- Colores primarios basados en rojo coral (#FF4040)
- Modo claro y oscuro
- Componentes Material-UI personalizados
- Variables CSS para fácil modificación

## 📱 Responsive Design

La aplicación está optimizada para:

- **Desktop**: Experiencia completa con sidebar
- **Tablet**: Adaptación de componentes
- **Mobile**: Navegación optimizada con menú hamburguesa

## 🔧 Configuración de Desarrollo

### Estructura de Componentes

Los componentes siguen el patrón:
```jsx
import React from 'react';
import { ComponentProps } from './types';

const Component = ({ prop1, prop2, ...props }) => {
  // Lógica del componente
  
  return (
    // JSX del componente
  );
};

export default Component;
```

### Manejo de Estado

- **Context API** para estado global (autenticación, tema)
- **useState/useEffect** para estado local
- **Custom hooks** para lógica reutilizable

### Validación de Formularios

Utilizando Formik + Yup:
```jsx
const validationSchema = Yup.object({
  field: Yup.string().required('Campo requerido'),
});

const formik = useFormik({
  initialValues: { field: '' },
  validationSchema,
  onSubmit: (values) => {
    // Lógica de envío
  },
});
```

## 🚀 Despliegue

### Construcción para Producción

```bash
npm run build
```

### Variables de Entorno de Producción

```env
VITE_API_BASE_URL=https://api.production.com
VITE_APP_NAME=Sistema de Gestión de Beneficios
VITE_APP_VERSION=1.0.0
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para la funcionalidad (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Convenciones de Código

- **Componentes**: PascalCase (ej: `UserCard.jsx`)
- **Hooks**: camelCase con prefijo 'use' (ej: `useAuth.js`)
- **Utilidades**: camelCase (ej: `formatDate.js`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `API_BASE_URL`)

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Error de CORS**: Verificar configuración del backend
2. **Token expirado**: El sistema maneja automáticamente la renovación
3. **Rutas protegidas**: Verificar autenticación en AuthContext

### Logs de Desarrollo

Los logs están habilitados en modo desarrollo. Para producción, configurar:
```env
VITE_ENABLE_LOGS=false
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Principal**: [Tu Nombre]
- **Diseño UI/UX**: [Nombre del Diseñador]
- **Backend**: [Nombre del Backend Developer]

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: soporte@example.com
- Issues: [GitHub Issues](link-to-issues)
- Documentación: [Wiki del Proyecto](link-to-wiki)

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2025