import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { User } from 'src/users/user.entity';
import { Space } from './space.entity';

export const IDENTIFIER_PREFIX = 'spm_';

@Index('space_user_unique', ['space.id', 'user.id'], { unique: true })
@Entity({ name: 'spaces_memberships' })
export class SpacesMembership {
  @PrimaryColumn({ unique: true, name: 'id', length: 64, update: false })
  id: string;

  @ManyToOne(() => Space)
  @JoinColumn({ name: 'space_id', referencedColumnName: 'id' })
  space: Space;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ type: 'datetime', precision: 6, name: 'created_at' })
  createdAt?: Date;
}
