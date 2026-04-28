# OLECRAM - Sistema de Gestión de Reservas de Libros

## 1. Descripción del Proyecto

OLECRAM es una aplicación web fullstack diseñada para la gestión de reservas de libros. Permite registrar, consultar y administrar reservas de manera eficiente mediante una arquitectura desacoplada entre frontend y backend.

El sistema está construido con tecnologías modernas como **React**, **NestJS**, **GraphQL** y **PostgreSQL**, priorizando escalabilidad, mantenibilidad y buena experiencia de desarrollo.

---

## 2. Estructura del Proyecto

```text
OLECRAM/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
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

### 6.1 Backend

1. Ir al directorio:

```bash
cd backend
```

2. Instalar dependencias:

```bash
npm install
```

o

```bash
bun install
```

3. Generar cliente de Prisma:

```bash
bunx prisma generate
```

4. Ejecutar migraciones:

```bash
bunx prisma migrate dev
```

5. (Opcional) Ejecutar seed:

```bash
bunx prisma db seed
```

6. Iniciar servidor:

```bash
npm run start:dev
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
npm run start:dev     # Desarrollo
npm run build         # Build producción
npm run start:prod    # Ejecutar build
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
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
