import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { BadRequestException } from '@nestjs/common';

describe('ReservationService', () => {
  let service: ReservationService;

  const prismaMock = {
    reservation: {
      findFirst: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);

    jest.clearAllMocks();
  });

  it('should throw error if book is already reserved', async () => {
    prismaMock.reservation.findFirst.mockResolvedValue({ id: '1' });

    await expect(
      service.create({
        userId: 'u1',
        bookId: 'b1',
        reservationDate: new Date(),
        returnDate: new Date(),
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw error if user has 3 active reservations', async () => {
    prismaMock.reservation.findFirst.mockResolvedValue(null);
    prismaMock.reservation.count.mockResolvedValue(3);

    await expect(
      service.create({
        userId: 'u1',
        bookId: 'b1',
        reservationDate: new Date(),
        returnDate: new Date(),
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should ban user if returned late', async () => {
    prismaMock.reservation.findUnique.mockResolvedValue({
      id: 'res-1',
      userId: 'user-1',
      returnDate: new Date('2026-04-20'),
      returned: false,
      user: { id: 'user-1' },
    });

    prismaMock.reservation.update.mockResolvedValue({
      id: 'res-1',
      returned: true,
    });

    prismaMock.user.update.mockResolvedValue({
      id: 'user-1',
      isBanned: true,
    });

    await service.returnBook('res-1');

    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { isBanned: true },
    });
  });
});
