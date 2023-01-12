import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/user.entity';

export enum SpaceAccessibility {
  Open = 'open',
  Restricted = 'restricted',
  Closed = 'closed',
}

export const IDENTIFIER_PREFIX = 'spc_';

@Entity({ name: 'spaces' })
export class Space {
  @PrimaryColumn({ name: 'id', length: 64, unique: true, update: false })
  id: string;

  @Index()
  @Column({ name: 'display_name', length: 64 })
  displayName: string;

  @Column({ name: 'profile_image_url', length: 512, nullable: true })
  profileImageURL?: string;

  @Index()
  @Column({ name: 'handle', length: 64, unique: true })
  handle: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ name: 'flag_bits', length: 53 })
  flagBits: string;

  @Index()
  @Column({
    type: 'enum',
    enum: SpaceAccessibility,
    default: SpaceAccessibility.Open,
    name: 'accessibility',
  })
  accessibility: SpaceAccessibility;

  @Column({ type: 'text', name: 'functional_variants_json' })
  functionalVariantsJSON?: string;

  @CreateDateColumn({ type: 'datetime', precision: 6, name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6, name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'datetime', precision: 6, name: 'locked_at' })
  lockedAt?: Date;
}
