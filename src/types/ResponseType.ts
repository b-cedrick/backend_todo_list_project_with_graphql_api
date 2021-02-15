import { ObjectType ,Field } from 'type-graphql';
import { Task } from '../models/entities/task';
import { User } from '../models/entities/user';

@ObjectType()
export class CommonResponse {
  @Field({ nullable: true })
  success?: boolean;

  @Field({ nullable: true })
  message?: string;
}

@ObjectType()
export class UserResponse extends CommonResponse {
  @Field({ nullable: true })
  data: User
}

@ObjectType()
export class LoginResponse extends CommonResponse {
  @Field({ nullable: true })
  token: string;
}

@ObjectType()
export class SignInResponse extends CommonResponse {
  @Field({ nullable: true })
  token: string;
}

@ObjectType()
export class TaskResponse extends CommonResponse {
  @Field({ nullable: true })
  data: Task
}