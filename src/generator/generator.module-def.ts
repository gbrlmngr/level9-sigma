import { ConfigurableModuleBuilder } from '@nestjs/common';
import { GeneratorOptions } from './generator.module';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<GeneratorOptions>()
    .setClassMethodName('forRoot')
    .build();
