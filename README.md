# ZOCO App - 

Esta aplicación es una SPA construida con React y Tailwind CSS que incluye autenticación con roles, manejo de sesión, consumo de APIs simuladas y gestión de datos relacionados al usuario autenticado. La aplicación es completamente responsiva, adaptándose correctamente a dispositivos móviles.

## Deployment
-https://prueba-tecnica-zoco-zeta.vercel.app/

## Características

- Autenticación de usuarios con roles (admin y usuario normal)
- Manejo de sesión con sessionStorage
- Rutas protegidas según el rol del usuario
- Dashboard para visualizar y gestionar datos personales
- Administración de usuarios (solo para administradores)
- Gestión de datos relacionados (estudios y direcciones)
- Diseño responsivo adaptado a dispositivos móviles
- Interfaz moderna y elegante con Tailwind CSS

## Tecnologías utilizadas

- React con Hooks
- React Router DOM para el manejo de rutas
- Context API para el manejo de estado global
- Tailwind CSS para el diseño
- Axios para las peticiones HTTP (simuladas)
- Almacenamiento en sessionStorage

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/Maxycarp89/Prueba-tecnica-zoco.git
cd prueba-tecnica-zoco
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en la dirección que te indica la consola (normalmente http://localhost:5173)

## Credenciales de prueba

- Usuario Administrador:
  - Email: admin@example.com
  - Password: admin123

- Usuario Normal:
  - Email: user@example.com
  - Password: user123

## Estructura del proyecto

- `/src/components`: Componentes reutilizables
- `/src/contexts`: Context API para el manejo de estado global
- `/src/hooks`: Custom hooks
- `/src/layouts`: Layouts para las diferentes partes de la aplicación
- `/src/pages`: Páginas de la aplicación
- `/src/services`: Servicios para el consumo de APIs

## Roles y permisos

- **Administrador**:
  - Puede ver la lista completa de usuarios
  - Puede ver, editar y crear datos relacionados (estudios, direcciones) de cualquier usuario
  - Tiene acceso a todas las funcionalidades

- **Usuario Normal**:
  - Solo puede ver y gestionar su propio perfil
  - Puede ver, crear y editar sus propios datos relacionados (estudios, direcciones)
  - No tiene acceso a la administración de usuarios


