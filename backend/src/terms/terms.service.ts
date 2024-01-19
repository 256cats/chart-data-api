import { Injectable } from '@nestjs/common';
import { TermsRepository } from './terms.repository';

@Injectable()
export class TermsService {
  constructor(private readonly termsRepository: TermsRepository) {}

  async findOneById(id: number) {
    return this.termsRepository.findOneById(id);
  }

  async findAll() {
    return this.termsRepository.findAll();
  }
}
