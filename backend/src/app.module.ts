import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookModule } from './book/book.module.js';
import { UserModule } from './user/user.module.js';
import { ReservationModule } from './reservation/reservation.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Habilita GraphiQL para desarrollo
      graphiql: true,
      // Genera el esquema automáticamente a partir de los decoradores de GraphQL
      autoSchemaFile: 'src/schema.gql',
      // Ordena el esquema para facilitar la lectura
      sortSchema: true,
    }),
    PrismaModule,
    BookModule,
    UserModule,
    ReservationModule,
  ],
})
export class AppModule {}
