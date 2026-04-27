import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service.js';
import { ReservationResolver } from './reservation.resolver.js';

@Module({
  providers: [ReservationService, ReservationResolver],
})
export class ReservationModule {}
