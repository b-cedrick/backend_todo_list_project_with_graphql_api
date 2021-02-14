import { InputType, Field } from 'type-graphql';

@InputType()
export class SignupUserInput {
  @Field()
  nom: string;

  @Field()
  prenom: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}


@InputType()
export class CreateUserInput {
  @Field()
  nom: string;

  @Field()
  prenom: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  // Every field with a "?" are optional. Here all field are optional
  @Field({ nullable: true })
  nom?: string; 

  @Field({ nullable: true })
  prenom?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}