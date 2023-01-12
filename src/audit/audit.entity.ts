import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

export enum AuditActions {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
  SoftDelete = 'soft_delete',
  Recover = 'recover',
}

export const IDENTIFIER_PREFIX = 'aud_';

@Entity({ name: 'audit' })
export class AuditEntry {
  @PrimaryColumn({ name: 'id', length: 64, unique: true, update: false })
  id: string;

  @Index()
  @Column({ name: 'principal_id', length: 64 })
  principalId: string;

  @Index()
  @Column({ type: 'enum', enum: AuditActions, name: 'action' })
  action: string;

  @Index()
  @Column({ name: 'resource_id', length: 64 })
  resourceId: string;

  @Column({ type: 'text', name: 'before_state_json' })
  beforeStateJSON: string;

  @Column({ type: 'text', name: 'after_state_json' })
  afterStateJSON: string;

  @CreateDateColumn({ name: 'logged_at' })
  loggedAt: Date;
}
