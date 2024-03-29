import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export const IDENTIFIER_PREFIX = 'usr_';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ name: 'id', length: 64, unique: true, update: false })
  id: string;

  @Index()
  @Column({ name: 'email_address', length: 96 })
  emailAddress: string;

  @Index()
  @Column({ name: 'display_name', length: 64 })
  displayName: string;

  @Column({ name: 'profile_image_url', length: 512, nullable: true })
  profileImageURL?: string;

  @Index()
  @Column({ name: 'handle', length: 64, unique: true })
  handle: string;

  @Column({ name: 'password_hash', length: 256 })
  passwordHash: string;

  @Column({ name: 'otp_secret', length: 48 })
  otpSecret: string;

  @Column({ name: 'flag_bits', length: 53 })
  flagBits: string;

  @Column({ name: 'permission_bits', length: 53 })
  permissionBits: string;

  @Column({ type: 'text', name: 'functional_variants_json' })
  functionalVariantsJSON?: string;

  @Column({ type: 'bool', name: 'has_enabled_otp', default: false })
  hasEnabledOTP?: boolean;

  @Column({ type: 'bool', name: 'has_verified_email', default: false })
  hasVerifiedEmail?: boolean;

  @Column({ type: 'datetime', precision: 6, name: 'last_login_at' })
  lastLoginAt?: Date;

  @CreateDateColumn({ type: 'datetime', precision: 6, name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6, name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'datetime', precision: 6, name: 'locked_at' })
  lockedAt?: Date;
}
