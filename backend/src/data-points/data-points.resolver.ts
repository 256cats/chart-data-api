import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DataPointsService } from '../data-points/data-points.service';
import { DataPoint } from '../data-points/model/DataPoint';
import { Term } from '../terms/model/Term';
import { TermsService } from 'src/terms/terms.service';

@Resolver((of) => DataPoint)
export class DataPointsResolver {
  constructor(
    private readonly dataPointsService: DataPointsService,
    private readonly termsService: TermsService,
  ) {}

  @Query((returns) => [DataPoint], { name: 'randomDataPoints' })
  async getRandomDataPoints(
    @Args('termId', { type: () => Int }) termId: number,
    @Args('count', { type: () => Int }) count: number,
  ) {
    return this.dataPointsService.getRandomDataPointsByTermId(termId, count);
  }

  @ResolveField('term', (returns) => Term)
  async getTerm(@Parent() dataPoint: DataPoint) {
    const { termId } = dataPoint;
    return this.termsService.findOneById(termId);
  }
}
