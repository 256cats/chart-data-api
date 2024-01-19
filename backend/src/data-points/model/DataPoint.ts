import { DataPoint as DataPointModel } from '@prisma/client';
import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Term } from '../../terms/model/Term';

@ObjectType()
export class DataPoint implements DataPointModel {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  x: number;

  @Field((type) => Int)
  y: number;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;

  @Field((type) => Int)
  termId: number;

  @Field((type) => Term)
  term: Term;
}
