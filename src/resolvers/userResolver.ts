import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CreateUserInput } from "../inputs/createUserInputType";
import { UpdateUserInput } from "../inputs/updateUserInputType";
import { User } from "../models/entities/user";

@Resolver()
export class UserResolver {

  @Query(() => String)
  test() {
    return "Server is running well ...";
  }

  @Query(() => [User])
  async users() {
    const users = await User.find();
    // console.log("Users : ",users)
    return users
  }

  @Query(() => User)
  user(@Arg("id") id: string) {
    return User.findOne({ where: { id }});
  }

  @Mutation(() => User)
  async addUser(@Arg("data") data: CreateUserInput) {
    const user = User.create(data);
    console.log("Data : ",data)
    await user.save();
    return user;
  }
  
  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("data") data: UpdateUserInput) {
    const user = await User.findOne({ where: { id }});

    if (!user) {
      throw new Error(`The user with id: ${id} does not exist!`);
    }

    Object.assign(user, data);
    await user.save();

    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    const user = await User.findOne({ where: { id }});

    if (!user) {
      throw new Error(`The user with id: ${id} does not exist!`);
    }

    await user.remove();
    return true;
  }

}
