import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  GeneratorService,
  REPLACEMENT_PLACEHOLDER,
} from 'src/generator/generator.service';
import { IDENTIFIER_PREFIX, AuditEntry } from './audit.entity';
import { auditEntrySchema } from './audit.validators';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    @InjectRepository(AuditEntry)
    private readonly auditRepository: Repository<AuditEntry>,
    private readonly generatorService: GeneratorService,
  ) {}

  async createOne(
    auditEntryDTO: Partial<Record<Exclude<keyof AuditEntry, 'id'>, any>>,
  ) {
    const id = this.generatorService.generateID(
      `${IDENTIFIER_PREFIX}${REPLACEMENT_PLACEHOLDER}`,
    );
    const validated = await auditEntrySchema.validateAsync({
      id,
      ...auditEntryDTO,
    });
    return this.auditRepository.create(validated);
  }
}
