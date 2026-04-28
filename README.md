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
│   │   └── seed.ts
│   ├── src/
│   │   ├── book/
│   │   ├── generated/
│   │   ├── prisma/
│   │   ├── reservation/
│   │   ├── user/
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
│   │   │   ├── layout/
│   │   │   └── pages/
│   │   ├── graphql/
│   │   │   ├── queries/
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

### 6.1 Docker

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

6. Iniciar servidor:

```bash
bun run start:dev
```

El backend correrá en:

```
http://localhost:3000/graphql
```

---

### 6.2 Frontend

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

3. Ejecutar proyecto:

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

## 8. Notas Finales

- PostgreSQL está corriendo localmente en el puerto 5432.
- No se implementa autenticación.
- El sistema está pensado para entorno de desarrollo/prueba.
- Asegúrate de tener configurado correctamente el `.env` antes de ejecutar.
- Si hay errores con Prisma, ejecuta nuevamente:

```bash
bunx prisma generate
```

---
