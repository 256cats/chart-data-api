import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Term as TermModel } from '@prisma/client';
import { DataPoint } from '../../data-points/model/DataPoint';

@ObjectType()
export class Term implements TermModel {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field((type) => [DataPoint])
  dataPoints: DataPoint[];
}
