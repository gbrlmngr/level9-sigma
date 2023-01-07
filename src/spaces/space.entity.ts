import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum SpaceVisibility {
  Open = 'open',
  Restricted = 'restricted',
}

export const IDENTIFIER_PREFIX = 'spc_';

@Entity({ name: 'spaces' })
export class Space {
  @PrimaryColumn({ unique: true, name: 'id', length: 64 })
  id: string;

  @Column({ name: 'display_name', length: 64 })
  displayName: string;

  @Column({ name: 'profile_image_url', length: 512, nullable: true })
  profileImageURL?: string;

  @Index()
  @Column({ name: 'handle', length: 64 })
  handle: string;

  @Column({ name: 'flags', length: 53 })
  flags: string;

  @Column({
    type: 'enum',
    enum: SpaceVisibility,
    default: SpaceVisibility.Open,
  })
  visibility: SpaceVisibility;

  @Index()
  @Column({ name: 'api_key', length: 64 })
  apiKey: string;

  @Index()
  @Column({ name: 'owner_id' })
  ownerId: string; /* @TODO: Replace with the User entity, once created */

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column({ name: 'disabled_by', nullable: true })
  disabledBy?: string; /* @TODO: Replace with the AuditEntry entity, once created */
}