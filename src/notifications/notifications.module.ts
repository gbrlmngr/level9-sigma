import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Notification } from './notification.entity';
import { NotificationsService } from './notifications.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
