import { Module, forwardRef } from '@nestjs/common';
import { DataPointsService } from './data-points.service';
import { DataPointsRepository } from './data-points.repository';
import { PrismaService } from '../prisma/prisma.service';
import { DataPointsResolver } from './data-points.resolver';
import { TermsModule } from 'src/terms/terms.module';
import { TermsService } from 'src/terms/terms.service';
import { TermsRepository } from 'src/terms/terms.repository';

@Module({
  providers: [
    DataPointsService,
    DataPointsRepository,
    PrismaService,
    DataPointsResolver,
    TermsService,
    TermsRepository,
  ],
  exports: [DataPointsService, DataPointsRepository],
  imports: [forwardRef(() => TermsModule)],
})
export class DataPointsModule {}
