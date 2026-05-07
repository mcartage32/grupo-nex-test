import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service.js';
import { ReservationResolver } from './reservation.resolver.js';
import { UserModule } from '../user/user.module.js';
import { BookModule } from '../book/book.module.js';

@Module({
  imports: [BookModule, UserModule],
  providers: [ReservationService, ReservationResolver],
})
export class ReservationModule {}
