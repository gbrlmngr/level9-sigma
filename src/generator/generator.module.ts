import { Module, Global } from '@nestjs/common';
import { ConfigurableModuleClass } from './generator.module-def';
import { GeneratorService } from './generator.service';

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface GeneratorModuleOptions {}

@Global()
@Module({
  providers: [GeneratorService],
  exports: [GeneratorService],
})
export class GeneratorModule extends ConfigurableModuleClass {}
