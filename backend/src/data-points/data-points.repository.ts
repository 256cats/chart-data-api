import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DataPointsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllByTermId(termId: number) {
    return this.prismaService.dataPoint.findMany({
      where: {
        termId,
      },
    });
  }

  async findOneById(id: number) {
    return this.prismaService.dataPoint.findFirst({
      where: { id },
    });
  }
}
