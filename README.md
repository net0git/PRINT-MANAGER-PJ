# Print Manager

Sistema de gestión de impresión para control de impresoras, consumibles, tickets y reportes.

## Descripción

Print Manager es una aplicación completa para la gestión de impresoras y consumibles en entornos empresariales. El sistema incluye:

- **Módulos principales**: Usuarios, Áreas, Marcas, Modelos, Consumibles, Equipos, Sedes, Tipos de consumibles y equipos, Ticket estados
- **Reportes detallados**: Dashboard con estadísticas, reportes de consumibles, impresoras, tickets y roles
- **Autenticación y autorización**: Sistema completo con JWT, bcrypt y roles de usuario
- **API REST**: Arquitectura modular con separación de capas (domain, application, infrastructure)

## Estructura del Proyecto

```
print-manager/
├── client/              # Aplicación frontend Angular
├── server/              # Backend Node.js/TypeScript
├── documentacion/       # Documentación del proyecto
├── PRINT_MANAGER_BD_BASE.sql  # Base de datos inicial
└── README.md            # Documentación del proyecto
```

## Tecnologías Utilizadas

### Backend (Server)
- Node.js con TypeScript
- PostgreSQL como base de datos
- JWT para autenticación
- Bcrypt para hash de contraseñas
- Arquitectura modular con patrones de diseño

### Frontend (Client)
- Angular 17+
- TypeScript
- HTTP Interceptors para autenticación
- Componentes reutilizables
- Servicios para comunicación con API

## Instalación

### Backend

```bash
cd server
npm install
# Configurar variables de entorno en .env
npm run start:dev
```

### Frontend

```bash
cd client
npm install
# Ejecutar en modo desarrollo
npm run start
```

## Base de Datos

La base de datos se inicializa con el archivo:
- `PRINT_MANAGER_BD_BASE.sql`

## Scripts Disponibles

### Backend
- `npm run start` - Modo producción
- `npm run start:dev` - Modo desarrollo con hot reload
- `npm run build` - Compilar TypeScript

### Frontend
- `npm run start` - Servidor de desarrollo Angular
- `npm run build` - Compilar aplicación Angular
- `npm run lint` - Linting de código

## Características

- Gestión completa de usuarios con roles y permisos
- Control de impresoras y equipamiento
- Gestión de consumibles y inventario
- Sistema de tickets y reportes
- Dashboard con estadísticas en tiempo real
- Reportes por área, consumible, impresora y ticket
- Autenticación segura con JWT y refresh tokens
- Auditoría de todas las operaciones