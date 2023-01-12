import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';

export enum NotificationPriorities {
  Urgent = 'urgent',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export const IDENTIFIER_PREFIX = 'ntf_';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryColumn({ name: 'id', length: 64, unique: true, update: false })
  id: string;

  @Column({ name: 'title', length: 128 })
  title: string;

  @Column({ type: 'text', name: 'body_markdown' })
  bodyMarkdown: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiver_id', referencedColumnName: 'id' })
  receiver: User;

  @Column({ type: 'enum', enum: NotificationPriorities, name: 'priority' })
  priority: NotificationPriorities;

  @Column({ type: 'simple-array', name: 'tags', nullable: true })
  tags?: string[];

  @CreateDateColumn({ type: 'datetime', precision: 6, name: 'created_at' })
  createdAt?: Date;

  @Column({ type: 'datetime', precision: 6, name: 'read_at', nullable: true })
  readAt?: Date;
}
