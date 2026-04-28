# OLECRAM - Sistema de Gestión de Reservas de Libros

## 1. Descripción del Proyecto

OLECRAM es una aplicación web fullstack diseñada para la gestión de reservas de libros. Permite registrar, consultar y administrar reservas de manera eficiente mediante una arquitectura desacoplada entre frontend y backend.

El sistema está construido con tecnologías modernas como **React**, **NestJS**, **GraphQL** y **PostgreSQL**, priorizando escalabilidad, mantenibilidad y buena experiencia de desarrollo.

---

## 2. Estructura del Proyecto

```text
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts       # Semillas de usuarios y libros
│   ├── src/
│   │   ├── book/
│   │   ├── generated/   # Cliente generado por Prisma (no modificar manualmente)
│   │   ├── prisma/
│   │   ├── reservation/
│   │   ├── user/         # La estructura descrita en user es la misma para los demas modulos
│   │   │   ├── dto/
│   │   │   ├── user.model.ts
│   │   │   ├── user.module.ts
│   │   │   ├── user.resolver.ts
│   │   │   └── user.service.ts
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── schema.gql
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── containers/
│   │   │   ├── layout/   # Componentes para la estructura de la aplicación
│   │   │   └── pages/    # Componente de la lógica de negocio (crear libro, crear usuario, etc)
│   │   ├── graphql/
│   │   │   ├── queries/  # Queries y mutaciones del API con Graphql
│   │   │   └── apolloClient.ts
│   │   ├── hooks/
│   │   ├── interfaces/
│   │   ├── router/
│   │   ├── main.css
│   │   └── main.tsx
└── README.md
```

---

## 3. Tecnologías Utilizadas

### Backend

- NestJS
- GraphQL (Apollo Server)
- Prisma ORM
- PostgreSQL
- class-validator / class-transformer

### Frontend

- React + Vite
- Apollo Client
- Ant Design
- TailwindCSS
- Zustand
- React Router

---

## 4. Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js 20+
- PostgreSQL
- Bun o npm

---

## 5. Variables de Entorno

### Backend (`/backend/.env`)

```env
DATABASE_URL="postgresql://root:root@localhost:5432/postgres"
PORT=3000
```

### Frontend (`/frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/graphql
```

---

## 6. Instalación y Ejecución

### 6.1 Instalación y ejecución con Docker

> **Nota:** Luego de clonar el repositorio, se debe crear los respectivos archivos .env en las carpetas backend y frontend, con los respectivos valores.


Desde la raíz del proyecto, ejecuta el siguiente comando para levantar la base de datos, el backend y el frontend automáticamente:

```bash
docker compose up --build
```

### 6.2 Backend

1. Ir al directorio:

```bash
cd backend
```

2. Instalar dependencias:

```bash
bun install
```

o

```bash
npm install
```

3. Crea el archivo .env

```env
DATABASE_URL="postgresql://root:root@localhost:5432/postgres"
PORT=3000
```

4. Generar cliente de Prisma:

```bash
bunx prisma generate
```

5. Ejecutar migraciones:

```bash
bunx prisma migrate dev
```

6. (Recomendación) Ejecutar seed:

```bash
bunx prisma db seed
```

7. Iniciar servidor:

```bash
bun run start:dev
```

El backend correrá en:

```
http://localhost:3000/graphql
```

---

### 6.3 Frontend

1. Ir al directorio:

```bash
cd frontend
```

2. Instalar dependencias:

```bash
bun install
```

o

```bash
npm install
```

3. Crear archivo .env

```env
VITE_API_URL=http://localhost:3000/graphql
```

4. Ejecutar proyecto:

```bash
bun dev
```

El frontend correrá en:

```
http://localhost:5173
```

---

## 7. Scripts Importantes

### Backend

```bash
bun run start:dev     # Desarrollo
bun run build         # Build producción
bun run start:prod    # Ejecutar build
bun run prisma:generate # Generar el cliente de prisma
bun run prisma:migrate  # Realizar las migraciones de prisma a la base de datos
bun run prisma:seed:bun # Ejecutar las semillas
```

### Frontend

```bash
bun dev               # Desarrollo
bun build             # Build
bun preview           # Preview producción
```
---
## 8. Pruebas Unitarias

El proyecto incluye pruebas unitarias en el backend enfocadas en la lógica de negocio del módulo de reservas.  
Se utiliza Jest junto con el entorno de testing de NestJS, mockeando el PrismaService para aislar la lógica.

### Ejecutar tests

Desde la carpeta del backend:

```bash
bun test
```

### Cobertura de pruebas

Las pruebas actuales validan:

- Restricción de libros ya reservados
- Límite máximo de reservas activas por usuario
- Penalización de usuarios por devoluciones tardías

Estas pruebas aseguran la integridad de las reglas de negocio principales del sistema y 
validan comportamientos críticos del dominio.

### Estrategia de testing

- Se mockea PrismaService para evitar dependencia de base de datos
- Se prueban únicamente reglas de negocio (no infraestructura)
- Se utilizan excepciones de NestJS para validar errores esperados

---
## 9. Notas Finales

- PostgreSQL está corriendo localmente en el puerto 5432.
- No se implementa autenticación.
- El sistema está pensado para entorno de desarrollo/prueba.
- Asegúrate de tener configurado correctamente el `.env` antes de ejecutar.
- Prisma Client se genera automáticamente en Docker durante el build.
- Si trabajas en local o si hay errores con Prisma, debes ejecutar manualmente:

```bash
bunx prisma generate
```
---

## 10. Acceso rápido

- Frontend: http://localhost:5173  
- Backend (GraphQL): http://localhost:3000/graphql  
- Playground GraphQL disponible en la misma URL del backend

---
## 11. Posibles Mejoras

- Implementación de autenticación (JWT)
- Control de acceso basado en roles y permisos
- Tests e2e para flujos completos
- Docker multi-stage para optimización de imagen
- Manejo centralizado de errores
- Filtros avanzados en GraphQL
- UI más refinada
  
---
