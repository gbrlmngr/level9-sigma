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

import { PRINCIPAL_TOKEN } from 'src/audit/audit.constants';
import { AuditActions } from 'src/audit/audit.entity';
import { AuditService } from 'src/audit/audit.service';
import { Space } from './space.entity';

@EventSubscriber()
export class SpacesSubscriber implements EntitySubscriberInterface<Space> {
  private readonly logger = new Logger(SpacesSubscriber.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly clsService: ClsService,
    private readonly auditService: AuditService,
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Space;
  }

  async afterInsert(event: InsertEvent<Space>) {
    const { entity } = event;
    const principal = this.clsService.get(PRINCIPAL_TOKEN);

    try {
      if (!principal) {
        throw new Error(
          `"${PRINCIPAL_TOKEN}" not set. Cannot save audit information for Space ID "${entity.id}".`,
        );
      }

      const auditEntry = await this.auditService.createOne({
        principal,
        action: AuditActions.Create,
        resourceId: entity.id,
        beforeStateJSON: '',
        afterStateJSON: JSON.stringify(entity),
        loggedAt: new Date(),
      });

      if (auditEntry) {
        await this.auditService.save([auditEntry]);
      }
    } catch (exception) {
      this.logger.warn(`AfterInsert Exception: ${exception.message}`);
    }
  }

  /* eslint-disable */
  async beforeUpdate(event: UpdateEvent<Space>) {}

  async afterRemove(event: RemoveEvent<Space>) {}

  async afterSoftRemove(event: SoftRemoveEvent<Space>) {}

  async afterRecover(event: RecoverEvent<Space>) {}
  /* eslint-enable */
}
