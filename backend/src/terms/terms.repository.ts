import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TermsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.term.findMany();
  }

  async findOneById(id: number) {
    return this.prismaService.term.findFirst({
      where: { id },
    });
  }
}
