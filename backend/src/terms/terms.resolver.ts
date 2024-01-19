import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TermsService } from './terms.service';
import { Term } from './model/Term';
import { DataPointsService } from '../data-points/data-points.service';
import { DataPoint } from '../data-points/model/DataPoint';

@Resolver((of) => Term)
export class TermsResolver {
  constructor(
    private termsService: TermsService,
    private dataPointsService: DataPointsService,
  ) {}

  @Query((returns) => [Term], { name: 'terms' })
  async getTerms() {
    return this.termsService.findAll();
  }

  @Query((returns) => Term, { name: 'term' })
  async getTerm(@Args('id', { type: () => Int }) id: number) {
    return this.termsService.findOneById(id);
  }

  @ResolveField('dataPoints', (returns) => [DataPoint])
  async getDataPoints(
    @Parent() term: Term,
    @Args('useRandomData', {
      type: () => Boolean,
      nullable: true,
      defaultValue: false,
    })
    useRandomData: boolean,
  ) {
    const { id } = term;
    return useRandomData
      ? this.dataPointsService.getRandomDataPointsByTermId(id)
      : this.dataPointsService.findAllByTermId(id);
  }
}
