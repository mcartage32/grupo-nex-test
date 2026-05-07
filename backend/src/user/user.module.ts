import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserResolver } from './user.resolver.js';

@Module({
  exports: [UserService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
