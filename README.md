# Frontend Gestión de Películas

Aplicación web React para la gestión administrativa de películas y series de la Institución Universitaria Digital de Antioquia.

## Tecnologías Utilizadas

- **React 18** con hooks (useState, useEffect)
- **React Router** para navegación
- **Axios** para llamadas API
- **Formik** y **Yup** para formularios y validaciones
- **Tailwind CSS** para estilos
- **Vite** como bundler

## Características

### Módulos Implementados

1. **Géneros**
   - Listado con filtros por estado (activo/inactivo)
   - Crear, editar y eliminar géneros
   - Validaciones de nombre único

2. **Directores**
   - Listado con filtros por estado
   - Crear y editar directores
   - Un director principal por producción

3. **Productoras**
   - Listado con filtros por estado
   - Crear y editar productoras
   - Información de slogan y descripción

4. **Tipos**
   - Listado de tipos multimedia
   - Crear nuevos tipos
   - Tipos iniciales: Película, Serie

5. **Media (Películas/Series)**
   - Vista en grid con tarjetas
   - Filtros por género, tipo y año
   - Crear y editar con selección de referencias activas
   - Campos: serial único, título, sinopsis, URL, imagen, año, género, director, productora, tipo

### Diseño

- Tema oscuro inspirado en plataformas de streaming
- Diseño responsivo (móvil, tablet, desktop)
- Navegación intuitiva con menú lateral/superior
- Estados de carga y manejo de errores

## Instalación y Uso

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar backend:**
   - Asegurarse de que el backend esté corriendo en `http://localhost:3000`
   - Verificar configuración en `src/configuration/axiosConfig.js`

3. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## Estructura del Proyecto

```
src/
├── components/
│   ├── Layout.jsx          # Layout principal con navegación
│   ├── Home.jsx            # Dashboard de inicio
│   ├── generos/
│   │   ├── Generos.jsx     # Lista de géneros
│   │   └── GeneroForm.jsx  # Formulario CRUD géneros
│   ├── directores/
│   │   └── Directores.jsx  # Gestión de directores
│   ├── productoras/
│   │   └── Productoras.jsx # Gestión de productoras
│   ├── tipos/
│   │   └── Tipos.jsx       # Gestión de tipos
│   └── media/
│       └── Media.jsx       # Gestión de películas/series
├── services/               # Servicios API
│   ├── GeneroService.js
│   ├── DirectorService.js
│   ├── ProductoraService.js
│   ├── TipoService.js
│   └── MediaService.js
├── configuration/
│   └── axiosConfig.js      # Configuración Axios
└── routers/                # (Pendiente) Configuración rutas adicionales
```

## API Backend

La aplicación consume la API REST del backend con los siguientes endpoints:

- `GET/POST/PUT/DELETE /generos`
- `GET/PUT /directores`
- `GET/PUT /productoras`
- `GET/POST /tipos`
- `GET/POST/PUT/DELETE /media`

## Validaciones

- Formularios con validaciones en tiempo real usando Yup
- Nombres únicos para géneros
- URLs válidas para imágenes y videos
- Campos requeridos según especificaciones

## Despliegue

La aplicación está preparada para despliegue en:

- **Vercel**: `npm run build` genera archivos estáticos
- **Netlify**: Compatible con despliegue automático
- **Servidor web**: Archivos en `dist/` después del build

## Próximas Mejores

- [ ] Implementar paginación en listas largas
- [ ] Agregar búsqueda por texto
- [ ] Implementar subida de imágenes
- [ ] Agregar más validaciones de negocio
- [ ] Implementar pruebas unitarias con Jest
- [ ] Optimizar performance con lazy loading

## Contribución

Proyecto desarrollado para la Institución Universitaria Digital de Antioquia como caso de estudio de aplicación web fullstack.
