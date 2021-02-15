import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  done: string;

  @Field()
  deadline: Date;

  @Field()
  priority: string;
}

@InputType()
export class UpdateTaskInput {
  // Every field with a "?" are optional. Here all field are optional
  @Field({ nullable: true })
  title?: string; 

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  done?: string;

  @Field({ nullable: true })
  deadline?:Date;

  @Field()
  priority?: string;
}