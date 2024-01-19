import { Module, forwardRef } from '@nestjs/common';
import { TermsService } from './terms.service';
import { TermsRepository } from './terms.repository';
import { PrismaService } from '../prisma/prisma.service';
import { DataPointsService } from 'src/data-points/data-points.service';
import { DataPointsModule } from 'src/data-points/data-points.module';
import { DataPointsRepository } from 'src/data-points/data-points.repository';
import { TermsResolver } from './terms.resolver';

@Module({
  providers: [
    TermsService,
    TermsRepository,
    PrismaService,
    DataPointsService,
    TermsRepository,
    DataPointsRepository,
    TermsResolver,
  ],
  imports: [forwardRef(() => DataPointsModule)],
  exports: [TermsService],
})
export class TermsModule {}
