import { Injectable, Logger } from '@nestjs/common';
import * as cuid from 'cuid';

export const REPLACEMENT_PLACEHOLDER = '%';

@Injectable()
export class GeneratorService {
  private readonly logger = new Logger(GeneratorService.name);

  generateID(format?: string): string {
    return format ? format.replaceAll(REPLACEMENT_PLACEHOLDER, cuid()) : cuid();
  }
}
