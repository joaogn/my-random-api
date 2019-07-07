/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { TypeUser, InputTypeUser } from './type';
import User from '../../modules/user/service';

@Resolver(TypeUser)
export class UserResolvers {
@Query(returns => [TypeUser])
  async getUsers (): Promise<TypeUser[]> {
    return User.getAll();
  }

  @Query(returns => TypeUser)
async getUser (
    @Arg('id') id: number
): Promise<TypeUser> {
  return User.getById(id);
}
    @Query(returns => TypeUser)
  async getUserByEmail (
    @Arg('email') email: string
  ): Promise<TypeUser> {
    return User.getbyEmail(email);
  }

  @Mutation(returns => TypeUser)
    async createUser (
    @Arg('newUser') newUser: InputTypeUser
    ): Promise<TypeUser> {
      return User.create(newUser);
    }

    @Mutation(returns => [TypeUser])
  async updateUser (
    @Arg('id') id: number,
    @Arg('newUser') newUser: InputTypeUser
  ): Promise<TypeUser[]> {
    const response = await User.update(id, newUser);
    return response[1];
  }

  @Mutation(returns => Int)
    async deleteUser (
    @Arg('id') id: number
    ): Promise<number> {
      return User.delete(id);
    }
}
