import { Logger } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RecoverEvent,
  RemoveEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Space } from './space.entity';

@EventSubscriber()
export class SpacesSubscriber implements EntitySubscriberInterface<Space> {
  private readonly logger = new Logger(SpacesSubscriber.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly clsService: ClsService,
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Space;
  }

  /* eslint-disable */
  async afterInsert(event: InsertEvent<Space>) {}

  async beforeUpdate(event: UpdateEvent<Space>) {}

  async afterRemove(event: RemoveEvent<Space>) {}

  async afterSoftRemove(event: SoftRemoveEvent<Space>) {}

  async afterRecover(event: RecoverEvent<Space>) {}
  /* eslint-enable */
}
