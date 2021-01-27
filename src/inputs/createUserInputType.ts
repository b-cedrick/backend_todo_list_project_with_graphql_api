import { InputType, Field } from 'type-graphql';


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