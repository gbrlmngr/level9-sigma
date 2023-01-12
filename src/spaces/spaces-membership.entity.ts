import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { User } from 'src/users/user.entity';
import { Space } from './space.entity';

export const IDENTIFIER_PREFIX = 'spm_';

@Entity({ name: 'spaces_memberships' })
export class SpacesMembership {
  @PrimaryColumn({ unique: true, name: 'id', length: 64, update: false })
  id: string;

  @ManyToOne(() => Space, (space) => space.id)
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'datetime', precision: 6, name: 'created_at' })
  createdAt?: Date;
}
