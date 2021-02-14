import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Task } from './task';

@ObjectType()
@Entity("priority")
export class Priority extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  label: string;

  @OneToOne(type => Task)
  task: Task;

}

