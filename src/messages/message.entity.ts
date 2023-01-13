import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';

export enum MessageTypes {
  System = 'system',
  User = 'user',
}

export enum MessagePriorities {
  Urgent = 'urgent',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export const IDENTIFIER_PREFIX = 'msg_';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryColumn({ name: 'id', length: 64, unique: true, update: false })
  id: string;

  @Column({ name: 'title', length: 128 })
  title: string;

  @Column({ type: 'text', name: 'body_markdown' })
  bodyMarkdown: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiver_id', referencedColumnName: 'id' })
  receiver: User;

  @Column({ type: 'enum', enum: MessageTypes, name: 'type' })
  type: MessageTypes;

  @Column({ type: 'enum', enum: MessagePriorities, name: 'priority' })
  priority: MessagePriorities;

  @Column({ type: 'simple-array', name: 'tags', nullable: true })
  tags?: string[];

  @CreateDateColumn({ type: 'datetime', precision: 6, name: 'created_at' })
  createdAt?: Date;

  @Column({ type: 'datetime', precision: 6, name: 'read_at', nullable: true })
  readAt?: Date;
}
