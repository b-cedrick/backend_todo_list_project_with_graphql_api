import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { CreateUserInput, UpdateUserInput, LoginUserInput, SignupUserInput } from "../types/userInputType";
import { User } from "../models/entities/user";
import { TaskResponse, LoginResponse, CommonResponse, SignInResponse } from "../types/ResponseType";
import { Task } from "../models/entities/task";
import { Priority } from "../models/entities/priority";
import { CreateTaskInput } from "../types/taskType";
const jwt = require('jsonwebtoken');
const { env } = require('../config/config');  
@Resolver()
export class TaskResolver {

  @Query(() => String)
  test() {
    return "Server is running well ...";
  }

  @Query(() => [TaskResponse])
  async tasks(    
    @Ctx() context: any
  ) {
    if(context.isAuth) {
        const tasks = await Task.find({
            order: {
                deadline: "ASC"
            }
        });
        // console.log("Task : ",tasks)
        return tasks 
    }  
    return {success: false, message:"Utilisateur non autorisé"}
  }

  @Query(() => [TaskResponse])
  async tasksByPriority(
    @Arg("priorityId") priorityId: string,      
    @Ctx() context: any
  ) {
    if(context.isAuth) {
        const priority = await Priority.findOne({where: { id: priorityId }})
        const tasks = await Task.find({
            where: { priority: priority },
            order: {
                deadline: "ASC"
            }
        });
        // console.log("Task : ",tasks)
        return tasks 
    }  
    return {success: false, message:"Utilisateur non autorisé"}
  }

  @Query(() => TaskResponse)
  task(
      @Arg("id") id: string,      
      @Ctx() context: any
    ) {
    if(context.isAuth) {
        return User.findOne({ where: { id }})  
    }  
    return {success: false, message:"Utilisateur non autorisé"}
  }

  @Mutation(() => TaskResponse)
  async addTask(
    @Arg("data") data: CreateTaskInput,    
    @Ctx() context: any
    ) {
      if(context.isAuth) {
        const priority = await Priority.findOne({where: { id: data.priority }})
        Object.assign(data, priority);
        const task = await Task.create(data);
        console.log("Data : ",data)
        await task.save();
        if (!task) return {success: false, message:"Echec d'ajout de tâche, veuillez réessayer"}
        return {data: task,success: true};
      }      
      return {success: false, message:"Utilisateur non autorisé"}
  }
  
  @Mutation(() => TaskResponse, {nullable:true})
  async updateTask(
    @Arg("id") id: string, @Arg("data") data: UpdateUserInput,
    @Ctx() context: any
    )  {
      if(context.isAuth) {
        const task = await Task.findOne({ where: { id }});
        // if (!task) {throw new Error(`The task with id: ${id} does not exist!`);}
        if (!task) return {success: false, message:`La tâche portant l'id: ${id} n'existe pas!`}
    
        Object.assign(task, data);
        const newTask = await task.save();    
        if (!newTask) return {success: false, message:"Echec de modificatioon de la tache, veuillez réessayer"}
        console.log(newTask)
        return {data: newTask, success: true};
      }      
      return {success: false, message:"Utilisateur non autorisé"}
  }

  @Mutation(() => CommonResponse)
  async deleteTask(
    @Arg("id") id: string,    
    @Ctx() context: any
    ) {

      if(context.isAuth) {
      const task = await Task.findOne({ where: { id }});

      // if (!task) { throw new Error(`The task with id: ${id} does not exist!`);}
      if (!task) return {success: false, message:`La tâche portant l'id: ${id} n'existe pas!`}

      await task.remove();
      return {success: true};
    }
    return {success: false, message:"Utilisateur non autorisé"}
  }

}
