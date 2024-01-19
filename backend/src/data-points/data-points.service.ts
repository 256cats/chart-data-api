import { Injectable } from '@nestjs/common';
import { DataPointsRepository } from './data-points.repository';

const DEFAULT_MAX_RANDOM_VALUES = 10;

@Injectable()
export class DataPointsService {
  constructor(private readonly dataPointsRepository: DataPointsRepository) {}

  async findAllByTermId(termId: number) {
    return this.dataPointsRepository.findAllByTermId(termId);
  }

  async getRandomDataPointsByTermId(
    termId: number,
    count: number = DEFAULT_MAX_RANDOM_VALUES,
  ) {
    const result = Array.from({ length: count }, () => ({
      id: `${Math.floor(Math.random() * 1000)}`,
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 1000),
      termId,
    }));
    result.sort((a, b) => a.x - b.x);
    return result;
  }
}
