import { ConfigurableModuleBuilder } from '@nestjs/common';
import { GeneratorModuleOptions } from './generator.module';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<GeneratorModuleOptions>()
    .setClassMethodName('forRoot')
    .build();
