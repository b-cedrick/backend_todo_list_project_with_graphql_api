import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { EncryptionTransformer } from 'typeorm-encrypted';

@ObjectType()
@Entity("users")
export class User extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  nom: string;

  @Field(() => String)
  @Column()
  prenom: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isAdmin: boolean;

  @Field(() => String)
  @Column({transformer: new EncryptionTransformer({
    key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
    algorithm: 'aes-256-cbc',
    ivLength: 16,
    iv: 'ff5ac19190424b1d88f9419ef949ae56'
  })})
  password: string;
}

