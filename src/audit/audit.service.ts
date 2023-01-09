import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

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

  async findOneBy(attributes: Partial<AuditEntry>) {
    return await this.auditRepository.findOne({
      where: attributes,
    });
  }

  async findAllBy(
    attributes: Partial<AuditEntry>,
    options?: Exclude<FindManyOptions<AuditEntry>, 'where'>,
  ) {
    const [nodes, count] = await this.auditRepository.findAndCount({
      where: attributes,
      order: { loggedAt: 'desc' },
      ...(options ?? {}),
    });

    return { count, nodes };
  }

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

  async save(...auditEntries: AuditEntry[]) {
    if (!auditEntries.every((entry) => entry instanceof AuditEntry)) {
      throw new Error(
        `All entries should be instances of AuditEntry. Use the "createOne" method first.`,
      );
    }

    return await this.auditRepository.save<AuditEntry>(auditEntries);
  }
}
