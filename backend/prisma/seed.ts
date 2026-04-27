import { PrismaService } from '../src/prisma/prisma.service.js';

const prisma = new PrismaService();

async function main() {
  // limpiar tablas
  await prisma.reservation.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      { name: 'Juan Pérez', email: 'juan1@example.com', isBanned: false },
      { name: 'María Gómez', email: 'maria@example.com', isBanned: false },
      { name: 'Carlos López', email: 'carlos@example.com', isBanned: false },
      { name: 'Ana Martínez', email: 'ana@example.com', isBanned: false },
      { name: 'Luis Rodríguez', email: 'luis@example.com', isBanned: false },
      { name: 'Sofía Hernández', email: 'sofia@example.com', isBanned: false },
      { name: 'Pedro Ramírez', email: 'pedro@example.com', isBanned: false },
      { name: 'Laura Torres', email: 'laura@example.com', isBanned: false },
      { name: 'Diego Castro', email: 'diego@example.com', isBanned: false },
      {
        name: 'Valentina Vargas',
        email: 'valentina@example.com',
        isBanned: false,
      },
    ],
  });

  await prisma.book.createMany({
    data: [
      { title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
      { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes' },
      { title: 'La Odisea', author: 'Homero' },
      { title: 'Crimen y castigo', author: 'Fiódor Dostoyevski' },
      { title: 'Orgullo y prejuicio', author: 'Jane Austen' },
      { title: 'El Principito', author: 'Antoine de Saint-Exupéry' },
      { title: '1984', author: 'George Orwell' },
      { title: 'Fahrenheit 451', author: 'Ray Bradbury' },
      { title: 'El Hobbit', author: 'J.R.R. Tolkien' },
      { title: 'Matar a un ruiseñor', author: 'Harper Lee' },
    ],
  });

  console.log('🌱 Seed ejecutada correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
