import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { CreateUserInput, UpdateUserInput, LoginUserInput, SignupUserInput } from "../types/userInputType";
import { User } from "../models/entities/user";
import { UserResponse, LoginResponse, CommonResponse, SignInResponse } from "../types/ResponseType";
const jwt = require('jsonwebtoken');
const { env } = require('../config/config');  
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

  @Mutation(() => UserResponse)
  async addUser(
    @Arg("data") data: CreateUserInput,    
    @Ctx() context: any
    ) {
      if(context.isAuth && context.user.isAdmin) {
        const user = await User.create(data);
        console.log("Data : ",data)
        await user.save();
        if (!user) return {success: false, message:"Echec d'ajout d'utilidsateur, veuillez réessayer"}
        return {data: user,success: true};
      }      
      return {success: false, message:"Utilisateur non autorisé"}
  }
  
  @Mutation(() => UserResponse, {nullable:true})
  async updateUser(
    @Arg("id") id: string, @Arg("data") data: UpdateUserInput,
    @Ctx() context: any
    )  {

      if(context.isAuth) {
        const user = await User.findOne({ where: { id }});
        // if (!user) {throw new Error(`The user with id: ${id} does not exist!`);}
        if (!user) return {success: false, message:`L'utilisateur portant l'id: ${id} n'existe pas!`}
    
        Object.assign(user, data);
        const newUser = await user.save();    
        if (!newUser) return {success: false, message:"Echec de mise à jourd'utilisateur, veuillez réessayer"}
        console.log(newUser)
        return {data: newUser, success: true};
      }      
      return {success: false, message:"Utilisateur non autorisé"}
  }

  @Mutation(() => CommonResponse)
  async deleteUser(
    @Arg("id") id: string,    
    @Ctx() context: any
    ) {

      if(context.isAuth && context.user.isAdmin) {
      const user = await User.findOne({ where: { id }});

      // if (!user) { throw new Error(`The user with id: ${id} does not exist!`);}
      if (!user) return {success: false, message:`L'utilisateur portant l'id: ${id} n'existe pas!`}

      await user.remove();
      return {success: true};
    }
    return {success: false, message:"Utilisateur non autorisé"}
  }

  @Mutation(() => SignInResponse)
  async signupUser (@Arg("data") data: SignupUserInput){
    Object.assign(data, {isAdmin: false});
    const user = await User.create(data);
    await user.save();
    if (!user) return {success: false, message:"Echec d'inscription, veuillez réessayer"}
    const token = jwt.sign({user}, env.JWT_SECRET)
    return {token, success: true};
  }

  @Mutation(() => LoginResponse, {nullable:true})
  async loginUser (@Arg("data") data: LoginUserInput)
  {
    const { email, password } = data;

    const user = await User.findOne({ where: { email }});
    // if (!user) throw new Error('Unable to Login');
    if (!user) return {success: false, message:"Utilisateur non enregistré"}
    
    const isMatch = (password == user.password)
    // if (!isMatch) throw new Error('Unable to Login');
    if (!isMatch) return {success: false, message:"Mot de passe incorrect"}
    console.log("test")
    const token = jwt.sign({user}, env.JWT_SECRET)
    return {token, success: true};
  }
  
}
