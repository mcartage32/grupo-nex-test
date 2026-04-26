import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookModule } from './book/book.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
    PrismaModule,
    BookModule,
  ],
})
export class AppModule {}
