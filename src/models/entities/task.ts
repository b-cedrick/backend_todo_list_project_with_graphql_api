import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Priority } from './priority';

@ObjectType()
@Entity("tasks")
export class Task extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  done: Boolean;

  @Field(() => Date)
  @Column()
  deadline: Date;

  @OneToOne(type => Priority)
  @JoinColumn()
  piority: Priority;

}

